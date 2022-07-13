import * as React from "react";
import { useState, useEffect, useContext } from "react";
import WithdrawLiquidityView from "./WithdrawLiquidityView";
import { WalletContext } from "../../context/WalletContext";
import { ethers, Contract, BigNumber, constants } from "ethers";
import DepPool from "../../abis/DepositPool.json";
import IUniswapV2Pair from "../../abis/IUniswapV2Pair.json";
import IERC20 from "../../abis/ERC20.json";
import Tokens, { Token } from "../Tokens";
import IERC20Metadata from "../../abis/IERC20Metadata.json";

const ZEROMIN = 0;

const WithdrawLiquidity = () => {
  const [depPool, setdepPool] = useState<Contract | null>(null);
  const [sliderPercentage, setsliderPercentage] = useState([0]);
  const { provider, accountInfo } = useContext(WalletContext);
  const [uniPrice, setUniPrice] = useState<string>("0");
  const [liquidityAmt, setLiquidityAmt] = useState<number>(0);
  const [liqInTokB, setLiqInTokB] = useState<number>(0);
  const [token0, setToken0] = useState({});
  const [token1, setToken1] = useState({});
  const [enableRemove, setenableRemove] = useState<Boolean>(false);

  async function changeSliderPercentage(percentage: number) {
    let data: number = parseInt(percentage.toFixed(0));
    setsliderPercentage([data]);
  }

  function sliderPercentChange(values: number[]) {
    setsliderPercentage(values);
  }

  async function approveTransaction() {
    if (provider) {
      let address = "0x3eFadc5E507bbdA54dDb4C290cc3058DA8163152";
      if (accountInfo && accountInfo?.address) {
        setdepPool(new ethers.Contract(address, DepPool.abi, provider.getSigner(accountInfo?.address)));
      } else {
        setdepPool(new ethers.Contract(address, DepPool.abi, provider));
      }
    } else {
      console.log("Please connect wallet");
    }

    if (!accountInfo || !accountInfo.address) {
      console.log("Wallet not connected.");
      return;
    }

    if (depPool === null) {
      return;
    }
    approveWithdraw(depPool, depPool.address)
      .then(() => {
        setenableRemove(true);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  async function withdrawLiquidity(balance: number) {
    let amt = ethers.utils.parseEther(((liquidityAmt * balance) / 100).toString()).toString();
    if (provider) {
      let address = "0x3eFadc5E507bbdA54dDb4C290cc3058DA8163152";
      if (accountInfo && accountInfo?.address) {
        setdepPool(new ethers.Contract(address, DepPool.abi, provider.getSigner(accountInfo?.address)));
      } else {
        setdepPool(new ethers.Contract(address, DepPool.abi, provider));
      }
    } else {
      console.log("Please connect wallet");
    }

    if (!accountInfo || !accountInfo.address) {
      console.log("Wallet not connected.");
      return;
    }

    if (depPool === null) {
      return;
    }

    try {
      let tx = await depPool.removeLiquidity(amt, ZEROMIN, ZEROMIN, accountInfo.address, {
        gasLimit: 10000000,
      });
      return await tx.wait();
    } catch (e) {
      return e;
    }
  }

  async function approveWithdraw(depPool: Contract | null, depPoolAddr: string) {
    if (!accountInfo || !accountInfo.address) {
      console.log("Wallet not connected.");
      return;
    }
    if (depPool === null) {
      return null;
    } else {
      if (provider !== null) {
        try {
          let tx = await depPool.approve(depPoolAddr, constants.MaxUint256.toString());
          return await tx.wait();
        } catch (e) {
          return e;
        }
      } else {
        console.log("Please connect wallet");
      }
    }
  }

  async function approve(fromToken: string, toAddr: string) {
    if (!provider) {
      console.log("provider or accountInfo not set");
      return;
    }
    if (!accountInfo || !accountInfo.address) {
      console.log("Wallet not connected.");
      return;
    }
    if (depPool === null) {
      return;
    }
    var erc20 = new ethers.Contract(fromToken, IERC20.abi, provider.getSigner(accountInfo?.address));
    let allowance = await erc20
      .allowance(accountInfo.address, toAddr)
      .then((res: string) => {
        console.log("check allowance ", res.toString());
        return res;
      })
      .catch((err: Error) => {
        console.error("checkAllowance", err);
      });
    if (parseFloat(allowance.toString()) <= 0) {
      await erc20.approve(toAddr, constants.MaxUint256);
    }
  }

  useEffect(() => {
    async function fetchContract() {
      if (!provider) {
        console.log("Please connect wallet.");
        return;
      }

      if (provider) {
        let address = "0x3eFadc5E507bbdA54dDb4C290cc3058DA8163152";
        if (accountInfo && accountInfo?.address) {
          let _depPool = new ethers.Contract(address, DepPool.abi, provider.getSigner(accountInfo?.address));
          setdepPool(_depPool);
          const token0Addr = await _depPool.token0();
          const token1Addr = await _depPool.token1();
          const _token0 = new ethers.Contract(token0Addr, IERC20Metadata.abi, provider.getSigner(accountInfo?.address));
          const _token1 = new ethers.Contract(token1Addr, IERC20Metadata.abi, provider.getSigner(accountInfo?.address));
          const symbol0 = await _token0.symbol();
          const symbol1 = await _token1.symbol();
          setToken0({ address: token0Addr, symbol: symbol0, contract: _token0 });
          setToken1({ address: token1Addr, symbol: symbol1, contract: _token1 });
        } else {
          let _depPool = new ethers.Contract(address, DepPool.abi, provider);
          setdepPool(_depPool);
          const token0Addr = await _depPool.token0();
          const token1Addr = await _depPool.token1();
          const _token0 = new ethers.Contract(token0Addr, IERC20Metadata.abi, provider);
          const _token1 = new ethers.Contract(token1Addr, IERC20Metadata.abi, provider);
          const symbol0 = await _token0.symbol();
          const symbol1 = await _token1.symbol();
          setToken0({ address: token0Addr, symbol: symbol0, contract: _token0 });
          setToken1({ address: token1Addr, symbol: symbol1, contract: _token1 });
        }
      } else {
        console.log("Please connect wallet");
      }
    }
    fetchContract();
  }, [provider]);

  function pretty(num: number) {
    return parseFloat(ethers.utils.formatEther(num.toString()).toString()).toFixed(2);
  }

  useEffect(() => {
    async function fetchData() {
      if (!depPool) {
        return;
      }
      const liqBal = await depPool.balanceOf(accountInfo?.address);
      setLiquidityAmt(parseFloat(pretty(liqBal.toString())));

      const uniPair = await depPool.getUniPair();
      if (!provider) {
        return;
      }

      const uniPairContract = new ethers.Contract(uniPair, IUniswapV2Pair.abi, provider);
      const reserves = await uniPairContract.getReserves();
      const _uniPrice = BigNumber.from(reserves.reserve1).mul(BigNumber.from(10).pow(18)).div(reserves.reserve0);
      setUniPrice(_uniPrice.toString());
      const liqBalNum = BigNumber.from(liqBal.toString());

      if (liqBalNum.gt(constants.Zero) && _uniPrice.gt(constants.Zero)) {
        setLiqInTokB(
          parseFloat(
            pretty(
              sqrt(_uniPrice.mul(BigNumber.from(10).pow(18)))
                .mul(liqBalNum)
                .div(BigNumber.from(10).pow(18))
                .mul(2)
                .toString()
            )
          )
        );
      } else {
        setLiqInTokB(0);
      }
    }
    fetchData();
  }, [depPool]);

  function sqrt(y: any) {
    let z;
    if (y.gt(3)) {
      z = y;
      let x = y.div(2).add(1);
      while (x.lt(z)) {
        z = x;
        x = y.div(x).add(x).div(2);
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
      token0={token0}
      token1={token1}
      liquidityAmt={liquidityAmt}
      liqInTokB={liqInTokB}
      enableRemove={enableRemove}
    />
  );
};

export default WithdrawLiquidity;
