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

  async function approveTransaction() {
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

    if (!accountInfo || !accountInfo.address) {
      console.log("Wallet not connected.")
      return
  }

    if (depPool === null) {
      return
    }
    await approveWithdraw(depPool, depPool.address)
  }

  async function withdrawLiquidity(balance: number) {
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

    if (!accountInfo || !accountInfo.address) {
      console.log("Wallet not connected.")
      return
  }

    if (depPool === null) {
      return
    }

    await depPool.removeLiquidity(
      ethers.utils.parseEther(balance.toString()),
      ZEROMIN,
      ZEROMIN,
      accountInfo.address, {
        gasLimit: 100000
      }
    )
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
        let tokA = "0x2C1c71651304Db63f53dc635D55E491B45647f6f"
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
  if (depPool === null) {
    return
  }
    var erc20 = new ethers.Contract(fromToken, IERC20.abi, provider.getSigner(accountInfo?.address))
    let allowance = await erc20.allowance(accountInfo.address, toAddr)
            .then((res: string) => {
                console.log("check allowance ", res.toString())
                return res
            })
            .catch((err: Error) => {
                console.error("checkAllowance", err)
            })
    if (parseFloat(allowance.toString()) <= 0) {
      await erc20.approve(toAddr, constants.MaxUint256)
    }
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
      if (!provider) {
          return
      }

      const uniPairContract = new ethers.Contract(uniPair, IUniswapV2Pair.abi, provider)
      const reserves = await uniPairContract.getReserves();
      const _uniPrice = BigNumber.from(reserves.reserve1).mul(BigNumber.from(10).pow(18)).div(reserves.reserve0);
      setUniPrice(_uniPrice.toString());
      const liqBalNum = BigNumber.from(liqBal.toString());

      if(liqBalNum.gt(constants.Zero) && _uniPrice.gt(constants.Zero)) {
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
            approveTransaction={approveTransaction}
        />
    )
}

export default WithdrawLiquidity;