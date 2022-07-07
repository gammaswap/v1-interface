import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import WithdrawLiquidityView from './WithdrawLiquidityView'
import { WalletContext } from '../../context/WalletContext'
import { ethers, Contract, BigNumber, constants } from 'ethers'
import DepPool from '../../abis/DepositPool.json'

const ZEROMIN = 0;

const WithdrawLiquidity = () => {
  const [depPool, setdepPool] = useState<Contract | null>(null)
  const [sliderPercentage, setsliderPercentage] = useState([0])
  const { provider, accountInfo } = useContext(WalletContext)

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
    .methods
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
    const res = await depPool.methods.approve(depPoolAddr, constants.MaxUint256.toString()).send({ from: accountInfo.address });
    }
  }

  useEffect(() => {
    if (!provider) {
        console.log("Please connect wallet.")
        return
    }
    
    var signer = provider.getSigner()
    console.log("provider set and seen in openloan:", provider, accountInfo?.address)
    console.log("signer set and seen in openloan:", signer, accountInfo?.address)
}, [provider])

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