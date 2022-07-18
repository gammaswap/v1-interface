import * as React from 'react'
import {useState, useEffect, useContext} from 'react'
import RepayLoanView from './RepayLoanView'
import PosManager from '../../abis/PositionManager.json'
import {WalletContext} from '../../context/WalletContext'
import toast from 'react-hot-toast'
import {BigNumber, constants, Contract, ethers} from 'ethers'
import IUniswapV2Pair from '../../abis/IUniswapV2Pair.json'

const RepayLoanController = () => {
  const [repayAmt, setrepayAmt] = useState<number[]>([0])
  const [enableRepay, setenableRepay] = useState<Boolean>(false)
  const [posManager, setPosManager] = useState<Contract | null>(null)
  const [pos, setpos] = useState('')
  const [posId, setposId] = useState({})
  const [uniPrice, setuniPrice] = useState<string>('0')
  const [balInTokB, setbalInTokB] = useState<string>('0')
  const {provider, accountInfo} = useContext(WalletContext)
  let percentages = [25, 50, 75, 100]

  function changeSliderPercentage(value: number) {
    setrepayAmt([value])
  }

  function repayAmtChange(values: number[]) {
    setrepayAmt(values)
  }

  function approveTransaction() {
    setenableRepay(true)
  }

  function repayTransaction() {}

  useEffect(() => {
    async function fetchContract() {
      if (!provider) {
        toast.error('Please connect wallet.')
        return
      }

      if (provider) {
        let address = '0xC6CB7f8c046756Bd33ad6b322a3b88B0CA9ceC1b'
        if (accountInfo && accountInfo?.address) {
          let posManagerContract = new ethers.Contract(address, PosManager.abi, provider.getSigner(accountInfo?.address))
          setPosManager(posManagerContract)
        } else {
          let posManagerContract = new ethers.Contract(address, PosManager.abi, provider)
          setPosManager(posManagerContract)
        }
      } else {
        toast.error('Please connect wallet.')
      }
    }
    fetchContract()
  }, [provider])

  useEffect(() => {
    async function fetchData() {
      if (posManager) {
        const positionCount = await posManager.positionCountByOwner(accountInfo?.address)
        const positions = await posManager.getPositionsByOwner(accountInfo?.address)
        if (positionCount > 0) {
          const position = await posManager.positions(positionCount)
          console.log("-------------------")
          console.log((position.tokensHeld0).toString())
          console.log((position.tokensHeld1).toString())
          console.log("-------------------")
          setpos(position)
          setposId(positionCount.toString())
          const uniPair = position.uniPair

          // const token0Balance = await posManager.tokenBalances('0x2C1c71651304Db63f53dc635D55E491B45647f6f')
          // console.log('token0Balance: ' + token0Balance.toString())
          // const token1Balance = await posManager.tokenBalances('0xbed4729d8E0869f724Baab6bA045EB67d72eCb7c')
          // console.log('token1Balance: ' + token1Balance.toString())

          if (!provider) {
            return
          }
          const uniPairContract = new ethers.Contract(uniPair, IUniswapV2Pair.abi, provider)
          const reserves = await uniPairContract.getReserves()
          const price = BigNumber.from(reserves.reserve1).mul(BigNumber.from(10).pow(18)).div(reserves.reserve0)
          setuniPrice(price.toString())
          const _uniPrice = BigNumber.from(price.toString())
          if (_uniPrice.gt(constants.Zero)) {
            const ONE = BigNumber.from(10).pow(18)
            const squarePrice = sqrt(_uniPrice.mul(ONE))
            const squarePrice2 = BigNumber.from(squarePrice.toString())
            const posLiquidity = BigNumber.from(position.liquidity.toString())
            const bal = squarePrice2.mul(posLiquidity).div(ONE).mul(2)
            setbalInTokB(ethers.utils.formatEther(bal))
            console.log(price.toString() + ' price.toString()')
            console.log(_uniPrice.toString() + ' _uniPrice.toString()')
            console.log(ONE.toString() + ' ONE.toString()')
            console.log(squarePrice.toString() + ' squarePrice.toString()')
            console.log(squarePrice2.toString() + ' squarePrice2.toString()')
            console.log(posLiquidity.toString() + ' posLiquidity.toString()')
            console.log(bal.toString() + ' bal.toString()')
            console.log(ethers.utils.formatEther(bal) + ' ethers.utils.formatEther(bal)')
            console.log(position.liquidity.toString() + ' position.liquidity.toString()')
          }
        }
      }
    }
    function sqrt(y: any) {
      let z
      if (y.gt(3)) {
        z = y
        let x = y.div(2).add(1)
        while (x.lt(z)) {
          z = x
          x = y.div(x).add(x).div(2)
        }
      } else if (!y.isZero()) {
        z = BigNumber.from(1)
      }
      return z
    }

    fetchData()
  }, [posManager])

  return (
    <RepayLoanView
      repayAmt={repayAmt}
      repayAmtChange={repayAmtChange}
      changeSliderPercentage={changeSliderPercentage}
      percentages={percentages}
      approveTransaction={approveTransaction}
      repayTransaction={repayTransaction}
      enableRepay={enableRepay}
    />
  )
}

export default RepayLoanController
