import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import WithdrawLiquidityView from './WithdrawLiquidityView'
import { WalletContext } from '../../context/WalletContext'
import { ethers, Contract, BigNumber, constants } from 'ethers'
import DepPool from '../../abis/DepositPool.json'
import IUniswapV2Pair from '../../abis/IUniswapV2Pair.json'
import IERC20 from '../../abis/ERC20.json'
import Tokens, { Token } from '../Tokens'

const ZEROMIN = 0;

const WithdrawLiquidity = () => {
  const [depPool, setdepPool] = useState<Contract | null>(null)
  const [sliderPercentage, setsliderPercentage] = useState([0])
  const { provider, accountInfo } = useContext(WalletContext)
  const [uniPrice, setUniPrice] = useState<string>("0")
  const [liquidityAmt, setLiquidityAmt] = useState("0");
  const [liqInTokB, setLiqInTokB] = useState("0");

  async function changeSliderPercentage(percentage: number) {
    let data: number = parseInt(percentage.toFixed(0))
    setsliderPercentage([data])
  }

  function sliderPercentChange(values: number[]) {
    setsliderPercentage(values)
  }

  async function withdrawLiquidity(balance: number) {
    if (provider) {
      let address = "0x3eFadc5E507bbdA54dDb4C290cc3058DA8163152"
      if (accountInfo  && accountInfo?.address) {
        console.log(balance + " My")
          setdepPool(new ethers.Contract(address, DepPool.abi, provider.getSigner(accountInfo?.address)))
      } else {
        console.log(balance)
          setdepPool(new ethers.Contract(address, DepPool.abi, provider))
      }
  } else {
      console.log("Please connect wallet")
  }

    if (!accountInfo || !accountInfo.address) {
      console.log("Wallet not connected.")
      return
  }

    if (depPool === null) {
      return
    }
    await approveWithdraw(depPool, depPool._address)

    await depPool
    .removeLiquidity(
      ethers.utils.parseEther(balance.toString()),
      ZEROMIN,
      ZEROMIN,
      accountInfo.address
    )
    .send({ from: accountInfo.address })
    .then((res: any) => {
        return res
    })
    .catch((err: any) => {
        console.error(err)
    })
  }

  async function approveWithdraw(depPool: Contract | null, depPoolAddr: string) {
    if (!accountInfo || !accountInfo.address) {
      console.log("Wallet not connected.")
      return
  }
    if (depPool === null) {
      return null;
    } else {
      if (provider !== null) {
        let tokA = "0xbed4729d8E0869f724Baab6bA045EB67d72eCb7c"
        approve(tokA, depPoolAddr);
  } else {
    console.log("Please connect wallet")
  }
    }
  }

  async function approve(fromToken: string, toAddr: string) {
    if (!provider) {
        console.log("provider or accountInfo not set")
        return
    }
    if (!accountInfo || !accountInfo.address) {
      console.log("Wallet not connected.")
      return
  }
    console.log(fromToken)
    var erc20 = new ethers.Contract(fromToken, IERC20.abi, provider.getSigner(accountInfo?.address))
    const res = await erc20.approve(toAddr, constants.MaxUint256).send({ from: accountInfo.address })
    console.log("approved", res)
}

  useEffect(() => {
    if (!provider) {
        console.log("Please connect wallet.")
        return
    }
    
    if (provider) {
      let address = "0x3eFadc5E507bbdA54dDb4C290cc3058DA8163152"
      if (accountInfo  && accountInfo?.address) {
          setdepPool(new ethers.Contract(address, DepPool.abi, provider.getSigner(accountInfo?.address)))
      } else {
          setdepPool(new ethers.Contract(address, DepPool.abi, provider))
      }
  } else {
      console.log("Please connect wallet")
  }
}, [provider])

function pretty(num: number) {
  return parseFloat(ethers.utils.parseEther(num.toString()).toString()).toFixed(2);
}

useEffect(() => {
  async function fetchData() {
    if(depPool) {
      const liqBal = await depPool.balanceOf(accountInfo?.address);
      setLiquidityAmt(pretty(liqBal.toString()));

      const uniPair = await depPool.getUniPair();
      console.log("uniPair >> ")
      console.log(uniPair)
      if (!provider) {
          return
      }

      const uniPairContract = new ethers.Contract(uniPair, IUniswapV2Pair.abi, provider)
      const reserves = await uniPairContract.getReserves();
      console.log("reserves >>")
      console.log(reserves.reserve0)
      console.log(reserves.reserve1)
      const _uniPrice = BigNumber.from(reserves.reserve1).mul(BigNumber.from(10).pow(18)).div(reserves.reserve0);
      setUniPrice(_uniPrice.toString());
      const liqBalNum = BigNumber.from(liqBal.toString());

      console.log("liqBalNum " + liqBalNum.toString())
      console.log("_uniPrice " + _uniPrice.toString())
      if(liqBalNum.gt(constants.Zero) && _uniPrice.gt(constants.Zero)) {
        console.log("Here")
        setLiqInTokB(pretty((sqrt(_uniPrice.mul(BigNumber.from(10).pow(18))).mul(liqBalNum)
            .div(BigNumber.from(10).pow(18))).mul(2).toString()));
      } else {
          setLiqInTokB("0");
      }
    }
  }
  fetchData()
}, [depPool])

function sqrt(y: any){
  let z;
  if (y.gt(3)) {
      z = y;
      let x = (y.div(2)).add(1);
      while (x.lt(z)) {
          z = x;
          x = ((y.div(x)).add(x)).div(2);
      }
  } else if (!y.isZero()) {
      z = BigNumber.from(1);
  }
  return z;
}

    return (
        <WithdrawLiquidityView
            sliderPercentage={sliderPercentage}
            changeSliderPercentage={changeSliderPercentage}
            sliderPercentChange={sliderPercentChange}
            withdrawLiquidity={withdrawLiquidity}
        />
    )
}

export default WithdrawLiquidity;