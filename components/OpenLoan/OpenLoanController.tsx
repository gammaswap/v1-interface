import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import Tokens, { Token } from '../Tokens'
import { WalletContext } from '../../context/WalletContext'
// import Factory from '../../abis/Factory.json'
import PositionMgr from '../../abis/PositionManager.json'
import IUniswapV2Pair from '../../abis/IUniswapV2Pair.json'
import IERC20 from '../../abis/ERC20.json'
import { ethers, Contract, BigNumber, constants } from 'ethers'
import { FieldValues } from 'react-hook-form'
import OpenLoan from './OpenLoanView'
import { CollateralType } from './CollateralType'
import toast from 'react-hot-toast';

const OpenLoanController = () => {
  const { provider, accountInfo } = useContext(WalletContext)
  const [token0, setToken0] = useState<Token>(Tokens[0])
  const [token1, setToken1] = useState<Token>({
    imgPath: "",
    symbol: "",
    address: "",
    decimals: 0
  })
  const [posManager, setPosManager] = useState<Contract | null>(null)
  const [posId, setPosId] = useState("")
  const [pos, setPos] = useState({})
  const [uniPrice, setUniPrice] = useState<string>("0")
  const [balInTokB, setBalInTokB] = useState<string>("0")

  useEffect(() => {
    if (!provider) {
      console.log("Please connect wallet.")
      return
    }
    
    var signer = provider.getSigner()
    console.log("provider set and seen in openloan:", provider, accountInfo?.address)
    console.log("signer set and seen in openloan:", signer, accountInfo?.address)
  }, [provider])
    
    useEffect(() => {
        async function fetchData() {
            console.log("Borrow.fetchData() >>")
            console.log(posManager)
            if (!posManager) {
                return
            }

            const positionCount = await posManager.positionCountByOwner(accountInfo?.address)
            console.log("positionCount >>")
            console.log(positionCount)
            console.log(posManager)
            const positions = await posManager.getPositionsByOwner(accountInfo?.address)
            console.log("positions >>")
            console.log(positions)
            if(positionCount <= 0) {
                return
            }
            
            const position = await posManager.positions(positionCount)
            console.log("position() >>")
            console.log(position)
            setPos(position)
            setPosId(positionCount.toString())
            const uniPair = position.uniPair
            console.log("uniPair >> ")
            console.log(uniPair)
            if (!provider) {
                return
            }

            const uniPairContract = new ethers.Contract(uniPair, IUniswapV2Pair.abi, provider)
            const reserves = await uniPairContract.getReserves()
            console.log("reserves >>")
            console.log(reserves.reserve0)
            console.log(reserves.reserve1)
            const price = BigNumber.from(reserves.reserve1).mul(BigNumber.from(10).pow(18)).div(reserves.reserve0)
            console.log("Borrow.price >>")
            console.log(price.toString())
            setUniPrice(price.toString())
            const _uniPrice = BigNumber.from(price.toString())

            if(_uniPrice.lte(constants.Zero)){
                return
            }
            console.log('set balance in tokB')
            const ONE = BigNumber.from(10).pow(18)
            console.log("herer xxx0")
            const squarePrice = sqrt(_uniPrice.mul(ONE))
            console.log("herer xxx1")
            const squarePrice2 = BigNumber.from(squarePrice.toString())
            console.log("herer xxx2")
            const posLiquidity = BigNumber.from(position.liquidity.toString())
            const bal = (squarePrice2.mul(posLiquidity).div(ONE)).mul(2)
            console.log("herer xxx3")
            console.log("bal >> " + bal.toString())
            setBalInTokB(ethers.utils.formatEther(bal))
            console.log("herer xxx4")
        }

        function sqrt(y: any){
          let z
          if (y.gt(3)) {
              z = y
              let x = (y.div(2)).add(1)
              while (x.lt(z)) {
                  z = x
                  x = ((y.div(x)).add(x)).div(2)
              }
          } else if (!y.isZero()) {
              z = BigNumber.from(1)
          }
          return z
        }
        // fetchData()
    }, [posManager])

    async function openLoanHandler(data: FieldValues) {
      console.log(data)
      if (!accountInfo || !accountInfo.address) {
        toast.error("Wallet not connected.")
        return
      }

      getPosMgr()
      if (!posManager) {
        toast.error("Position manager not found.")
        return
      }

      if (!provider ) {
        toast.error("Provider not set.")
        return
      }

      // unpack
      console.log("data:", data)
      var amt0BN = data.collateralAmt0 ? 
        ethers.utils.parseUnits(data.collateralAmt0, token0.decimals) : 
        BigNumber.from(0)
      var amt1BN = data.collateralAmt1 ? 
        ethers.utils.parseUnits(data.collateralAmt1, token1.decimals) : 
        BigNumber.from(0)
      var loanAmtBN = ethers.utils.parseUnits(data.loanAmt, 18) // 18 is from DepositPool.decimals
      var collateralType = data.collateralType
      var accountAddress = accountInfo.address ? accountInfo.address : ""

      try {
        switch(collateralType) {
          case CollateralType.LPToken:
            // TODO: currently no way to know get uniPair without factory
            // can't get it from position because there's no position yet
            break
          case CollateralType.Token0:
            var erc20 = new ethers.Contract(token0.address, IERC20.abi, provider)
            await ensureAllowance(accountAddress, erc20, amt0BN, token0.decimals, token0.symbol)
            break
          case CollateralType.Token1:
            // switch the amounts because amount comes from first input
            amt1BN = amt0BN
            amt0BN = BigNumber.from(0)
            var erc20 = new ethers.Contract(token1.address, IERC20.abi, provider)
            await ensureAllowance(accountAddress, erc20, amt1BN, token1.decimals, token1.symbol)
            break
          case CollateralType.Both:
            var erc20Token0 = new ethers.Contract(token0.address, IERC20.abi, provider)
            var erc20Token1 = new ethers.Contract(token1.address, IERC20.abi, provider)
            await ensureAllowance(accountAddress, erc20Token0, amt0BN, token0.decimals, token0.symbol)
            .then(() => ensureAllowance(accountAddress, erc20Token1, amt1BN, token1.decimals, token1.symbol))
            break
          default:
            toast.error("Invalid collateral type.")
            return
        }
        // TODO: wait for contract to handle collateral
        var tx = await posManager.openPosition(
          token0.address,
          token1.address,
          amt0BN,
          amt1BN,
          loanAmtBN,
          accountAddress
        )
        var loading = toast.loading("Waiting for block confirmation")
        var receipt = await tx.wait()
        if(receipt.status == 1) {
          toast.dismiss(loading)
          toast.success("Position opened successfully.")
          return
        }
        toast.error("Open position was unsuccessful.")
      } catch (e) {
        if (typeof e === "string") {
          toast.error(e)
        } else if (e instanceof Error) {
          toast.error(e.message)
        }
      }
    }

    async function ensureAllowance(account: string, erc20: Contract, amountBN: BigNumber, decimals: number, symbol: string) {
      try {
        var amountStr = ethers.utils.formatUnits(amountBN, decimals)
        console.log("checking allowance...", symbol, "spender", posManager?.address)
        console.log('owner', account, 'amount', amountStr)

        // check enough balance
        let balanceBN = await erc20.balanceOf(account)
        if (balanceBN < amountBN) {
          toast.error("Not enough funds. Requested: " + amountStr
          + " Balance " + ethers.utils.formatUnits(balanceBN, decimals))
        }
        // check enough allowance
        let allowance = await erc20.allowance(account, posManager?.address)
        if (allowance < amountBN) {
          return approve(erc20, posManager?._address)
        }
      } catch (e) {
        if (typeof e === "string") {
          toast.error("checkAllowance: " + e)
        } else if (e instanceof Error) {
          toast.error("checkAllowance: " + e.message)
        }
      }
    }

    async function approve(fromTokenContract: Contract, spender: string) {
      var tx = await fromTokenContract.approve(spender, constants.MaxUint256)
      var loading = toast.loading("Waiting for approval")
      var receipt = await tx.wait()
      toast.dismiss(loading)
      if(receipt.status == 1) {
        toast.success("Approval completed")
        return
      }
      toast.success("Approval failed")
    }

    function getPosMgr() {
      console.log("Looking up pair address", token0.symbol, token1.symbol)
      if (token0 == token1) {
        console.log("Token values must be different")
        return
      }
      var pairsAddress = "0xC6CB7f8c046756Bd33ad6b322a3b88B0CA9ceC1b"

      //TODO: when the factory is available need to call it to get the pair's pool address to set

      if (provider) {
        if (accountInfo  && accountInfo?.address) {
          setPosManager(new ethers.Contract(pairsAddress, PositionMgr.abi, provider.getSigner(accountInfo?.address)))
        } else {
          setPosManager(new ethers.Contract(pairsAddress, PositionMgr.abi, provider))
        }
      } else {
      console.log("Please connect wallet")
      }
    }

    return (
      <OpenLoan 
        openLoanHandler={openLoanHandler}
        token0={token0}
        token1={token1}
        setToken0={setToken0}
        setToken1={setToken1}
      />
    )
}

export default OpenLoanController