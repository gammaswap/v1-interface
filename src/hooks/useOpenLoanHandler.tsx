import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import Tokens, { Token } from '../components/Tokens'
import { WalletContext } from '../context/WalletContext'
// TODO: import Factory from '../../abis/Factory.json'
import IERC20 from '@openzeppelin/contracts/build/contracts/IERC20.json'
import { ethers, Contract, BigNumber, constants } from 'ethers'
import { InformationCircleIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'
import PositionManager from '@gammaswap/v1-periphery/artifacts/contracts/PositionManager.sol/PositionManager.json'
import GammaPoolFactory from '@gammaswap/v1-core/artifacts/contracts/GammaPoolFactory.sol/GammaPoolFactory.json'
import { notifyDismiss, notifyError, notifyLoading, notifySuccess, notifyInfo } from './useNotification'
import { calcPoolKey, getTokenBalance, getCfmmPoolAddr } from '../utils/getSmartContract'
import { validateAllowance } from '../utils/validation'
import Protocols, { Protocol } from '../components/Protocols'
import GammaPool from '@gammaswap/v1-core/artifacts/contracts/GammaPool.sol/GammaPool.json'
import { CollateralUserInput } from '../components/OpenLoan/CollateralUserInput'

// TODO: need to figure whether to use this or enums
const collateralTypes = [
  { id: 1, type: 'Liquidity Pool Tokens', unavailable: false },
  { id: 2, type: 'Token A', unavailable: false },
  { id: 3, type: 'Token B', unavailable: false },
  { id: 5, type: 'Both Tokens', unavailable: false },
]

export const useOpenLoanHandler = () => {
  const POSITION_MANAGER_ADDRESS = process.env.NEXT_PUBLIC_POSITION_MANAGER_ADDRESS || ''
  const GAMMAFACTORY_ADDR = process.env.NEXT_PUBLIC_GAMMAFACTORY_ADDR || ''
  const [collateralType, setCollateralType] = useState(collateralTypes[0])
  const { provider, accountInfo } = useContext(WalletContext)
  const [token0, setToken0] = useState<Token>(Tokens[0])
  const [token1, setToken1] = useState<Token>({
    imgPath: '',
    symbol: '',
    address: '',
    decimals: 0,
  })
  const [positionManager, setPositionManager ] = useState<Contract | null>(null)
  const [protocol, setProtocol] = useState<Protocol>(Protocols[0])
  const [gammaPoolFactory, setGammaPoolFactory] = useState<Contract | null>(null)
  const [lpTokenBalance, setLpTokenBalance] = useState<string>('0')

  // const [collateralType, setCollateralType] = useState<CollateralType>(CollateralType.None)
  const [loanAmtStr, setLoanAmtStr] = useState<string>('')
  const [collateralAmt0Str, setCollateralAmt0Str] = useState<string>('')
  const [collateralAmt1Str, setCollateralAmt1Str] = useState<string>('')
  const { setValue } = useForm()
  const [token0Balance, setToken0Balance] = useState<string>('0')
  const [token1Balance, setToken1Balance] = useState<string>('0')
  const [isApproved, setIsApproved] = useState<boolean>(false)
  const [buttonMessage, setButtonMessage] = useState<string>("")
  const [cfmmPoolAddr, setCfmmPoolAddr] = useState<string>("")
  const [collateralElems, setCollateralElems] = useState<JSX.Element>(
    <CollateralUserInput
      token0Balance={token0Balance}
      token1Balance={token1Balance}
      collateralType={collateralType.type}
      token0={token0}
      token1={token1}
      inputValue={collateralAmt0Str}
      setTokenValue={setCollateralAmt0Str}
    />
  )

  useEffect(() => {
    if (!provider) {
      notifyInfo('Please connect wallet.')
      return
    }

    if (accountInfo && accountInfo?.address) {
      setPositionManager (
        new ethers.Contract(POSITION_MANAGER_ADDRESS, PositionManager.abi, provider.getSigner(accountInfo?.address))
      )
      setGammaPoolFactory(
        new ethers.Contract(GAMMAFACTORY_ADDR, GammaPoolFactory.abi, provider.getSigner(accountInfo?.address))
      )
    } else {
      setPositionManager (new ethers.Contract(POSITION_MANAGER_ADDRESS, PositionManager.abi, provider))
      setGammaPoolFactory(new ethers.Contract(GAMMAFACTORY_ADDR, GammaPoolFactory.abi, provider))
    }
  }, [provider])

  useEffect(() => {
    let accountAddress = accountInfo?.address || ''
    if (provider && token0.address) {
      getTokenBalance(accountAddress, token0.address, token0.symbol, provider, setToken0Balance)
    }
  }, [provider, token0])

  useEffect(() => {
    let accountAddress = accountInfo?.address || ''
    if (provider && token1.address) {
      getTokenBalance(accountAddress, token1.address, token1.symbol, provider, setToken1Balance)
    }
  }, [provider, token1])

  useEffect(() => {
    const getPoolData = async (cfmm: string, protocolId: number) => {
      if (gammaPoolFactory && provider) {
        let pool = await gammaPoolFactory.getPool(calcPoolKey(cfmm, protocolId))
        console.log(pool)
        if (pool && pool !== ethers.constants.AddressZero) {
          let _gammaPool = null
          if (accountInfo && accountInfo?.address) {
            _gammaPool = new ethers.Contract(pool, GammaPool.abi, provider.getSigner(accountInfo.address))
          } else {
            _gammaPool = new ethers.Contract(pool, GammaPool.abi, provider)
          }

          if (_gammaPool) {
            let res = await _gammaPool.balanceOf(accountInfo?.address)
            setLpTokenBalance(ethers.utils.formatEther(res))
          }
        }
      }
    }
    if (token0.address && token1.address) {
      getPoolData(cfmmPoolAddr, protocol.id)
    }
  }, [cfmmPoolAddr])

  useEffect(() => {
    if (provider && token0.address && token1.address) {
      getCfmmPoolAddr(
        token0.address,
        token1.address,
        provider,
        setCfmmPoolAddr
      )
    }
  }, [token0, token1])

  async function openLoanHandler() {
    if (!loanAmtStr) {
      notifyError('Please enter a valid loan amount and the amount must be positive')
      return
    }

    if (!validateInput()) {
      return
    }

    if (!accountInfo || !accountInfo.address) {
      notifyError('Wallet not connected.')
      return
    }

    if (!gammaPoolFactory) {
      await getGammaPoolFactory()
    }

    if (!ethers.utils.isAddress(cfmmPoolAddr)) {
      notifyError('Selected pair is not a valid cfmm pool pair.')
      return
    }

    if (gammaPoolFactory) {
      let pool = await gammaPoolFactory.getPool(calcPoolKey(cfmmPoolAddr, protocol.id))
      if (pool === ethers.constants.AddressZero) {
        notifyError('Please create a pool before continuing')
        return
      }
    }

    if (!positionManager) {
      await getPositionManager()
    }
    if (positionManager) {
      let loan = await createLoan()
      if (!loan) {
        return
      }

      const { args } = loan.events[1]
      let tokenId = args.tokenId
      console.log(tokenId)
      if (!tokenId) {
        return
      }

      let collateral = await increaseCollateral(tokenId)
      console.log(collateral)
      if (!collateral) {
        return
      }

      let borrow = await borrowLiquidity(tokenId)
      console.log(borrow)
      if (borrow) {
        notifySuccess('Successful')
      }
    }
  }

  async function createLoan() {
    if (!ethers.utils.isAddress(cfmmPoolAddr)) {
      notifyError('Selected pair is not a valid cfmm pool pair.')
      return
    }

    let loading = notifyLoading('Waiting for create loan')
    try {
      if (positionManager && accountInfo) {
        let tx = await positionManager.createLoan(
          cfmmPoolAddr,
          1,
          accountInfo?.address,
          ethers.constants.MaxUint256,
          { gasLimit: process.env.NEXT_PUBLIC_GAS_LIMIT }
        )
        notifyDismiss(loading)
        return await tx.wait()
      } else {
        notifyDismiss(loading)
        notifyError(
          'An error occurred while fetching contract and user information. Please check you wallet is connected and try again'
        )
        return false
      }
    } catch (err) {
      notifyDismiss(loading)
      notifyError('An error occurred while trying to create loan. Please try again.')
      return false
    }
  }

  const increaseCollateral = async (tokenId: string) => {
    if (!ethers.utils.isAddress(cfmmPoolAddr)) {
      notifyError('Selected pair is not a valid cfmm pool pair.')
      return
    }

    let loading = notifyLoading('Waiting for increase collateral')
    try {
      let amounts = ['0']
      switch (collateralType.type) {
        case 'Liquidity Pool Tokens':
          amounts = [collateralAmt0Str]
          break
        case 'Token A':
          amounts = [collateralAmt0Str]
          break
        case 'Token B':
          amounts = [collateralAmt1Str]
          break
        case 'Both Tokens':
          amounts = [collateralAmt0Str, collateralAmt1Str]
          break
      }
      if (positionManager && accountInfo) {
        const AddRemoveCollateralParams = {
          cfmm: cfmmPoolAddr,
          protocol: protocol.id,
          tokenId: tokenId,
          amounts: amounts,
          to: accountInfo?.address,
          deadline: ethers.constants.MaxUint256,
        }

        let tx = await positionManager.increaseCollateral(AddRemoveCollateralParams, {
          gasLimit: process.env.NEXT_PUBLIC_GAS_LIMIT,
        })
        notifyDismiss(loading)
        return await tx.wait()
      } else {
        notifyDismiss(loading)
        notifyError(
          'An error occurred while fetching contract and user information. Please check you wallet is connected and try again'
        )
        return false
      }
    } catch (err) {
      notifyDismiss(loading)
      notifyError('An error occurred while trying to increase collateral. Please try again.')
      return false
    }
  }

  async function borrowLiquidity(tokenId: string) {
    if (!ethers.utils.isAddress(cfmmPoolAddr)) {
      notifyError('Selected pair is not a valid cfmm pool pair.')
      return
    }

    let loading = notifyLoading('Waiting for borrow liquidity')
    try {
      if (positionManager && accountInfo) {
        const BorrowLiquidityParams = {
          cfmm: cfmmPoolAddr,
          protocol: protocol.id,
          tokenId: tokenId,
          lpTokens: loanAmtStr,
          to: accountInfo?.address,
          deadline: ethers.constants.MaxUint256,
        }
        let tx = await positionManager.borrowLiquidity(BorrowLiquidityParams)
        notifyDismiss(loading)
        return await tx.wait()
      } else {
        notifyDismiss(loading)
        notifyError(
          'An error occurred while fetching contract and user information. Please check you wallet is connected and try again'
        )
        return false
      }
    } catch (err) {
      notifyDismiss(loading)
      notifyError('An error occurred while trying to borrow liquidity. Please try again.')
      return false
    }
  }

  const getPositionManager = async () => {
    if (token0 == token1) {
      notifyInfo('Token values must be different')
      return
    }

    //TODO: when the factory is available need to call it to get the pair's pool address to set

    if (provider && !positionManager) {
      if (accountInfo && accountInfo?.address) {
        await setPositionManager (
          new ethers.Contract(POSITION_MANAGER_ADDRESS, PositionManager.abi, provider.getSigner(accountInfo?.address))
        )
      } else {
        await setPositionManager (new ethers.Contract(POSITION_MANAGER_ADDRESS, PositionManager.abi, provider))
      }
    } else {
      notifyInfo('Please connect wallet')
    }
  }

  const getGammaPoolFactory = async () => {
    if (provider && !gammaPoolFactory) {
      if (accountInfo && accountInfo?.address) {
        await setGammaPoolFactory(
          new ethers.Contract(GAMMAFACTORY_ADDR, GammaPoolFactory.abi, provider.getSigner(accountInfo?.address))
        )
      } else {
        await setGammaPoolFactory(new ethers.Contract(GAMMAFACTORY_ADDR, GammaPoolFactory.abi, provider))
      }
    } else {
      notifyInfo('Please connect wallet')
    }
  }

  useEffect(() => {
    setLoanAmtStr('')
    setCollateralAmt0Str('')
    setCollateralAmt1Str('')
    setIsApproved(false)
  }, [token0, token1])

  useEffect(() => {
    setCollateralAmt0Str('')
    setCollateralAmt1Str('')
    setIsApproved(false)
  }, [collateralType])

  setValue('collateralType', collateralType)

  const validateInput = () => {
    if (collateralType.type === 'Token A' && !collateralAmt0Str) {
      notifyError('Please enter a valid amount for Token A')
      return false
    }

    if (collateralType.type === 'Token B' && !collateralAmt1Str) {
      notifyError('Please enter a valid amount for Token B')
      return false
    }

    if (collateralType.type === 'Both Tokens' && (!collateralAmt0Str || !collateralAmt1Str)) {
      notifyError('Please enter a valid amount for both tokens')
      return false
    }

    if (collateralType.type === 'Liquidity Pool Tokens' && !collateralAmt0Str) {
      notifyError('Please enter a valid amount for Liquidity Pool Tokens')
      return false
    }

    return true
  }

  const approveTransaction = async () => {
    if (!validateInput()) {
      return
    }

    if (!ethers.utils.isAddress(cfmmPoolAddr)) {
      notifyError('Selected pair is not a valid cfmm pool pair.')
      return
    }

    if (accountInfo?.address && provider) {
      let approvalA, approvalB, approvalCFMM
      let token0Contract = new ethers.Contract(
        token0.address,
        IERC20.abi,
        accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
      )

      approvalA = await validateAllowance(
        accountInfo.address,
        token0Contract,
        Number(collateralAmt0Str),
        POSITION_MANAGER_ADDRESS || ''
      )

      if (!approvalA) {
        return
      }

      let token1Contract = new ethers.Contract(
        token1.address,
        IERC20.abi,
        accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
      )

      approvalB = await validateAllowance(
        accountInfo.address,
        token1Contract,
        Number(collateralAmt1Str),
        POSITION_MANAGER_ADDRESS || ''
      )

      if (!approvalB) {
        return
      }

      let cfmmContract = new ethers.Contract(
        cfmmPoolAddr,
        IERC20.abi,
        accountInfo && accountInfo?.address ? provider.getSigner(accountInfo?.address) : provider
      )

      approvalCFMM = await validateAllowance(
        accountInfo.address,
        cfmmContract,
        Number(collateralAmt0Str),
        POSITION_MANAGER_ADDRESS || ''
      )

      if (!approvalCFMM) {
        return
      }
      setIsApproved(true)
    }
  }

  return {
    token0,
    token1,
    setToken0,
    setToken1,
    loanAmtStr,
    setLoanAmtStr,
    collateralType,
    setCollateralType,
    approveTransaction,
    isApproved,
    collateralTypes,
    openLoanHandler,
    lpTokenBalance,
    token0Balance,
    token1Balance,
    collateralAmt0Str,
    setCollateralAmt0Str,
    collateralAmt1Str,
    setCollateralAmt1Str,
  }
}
