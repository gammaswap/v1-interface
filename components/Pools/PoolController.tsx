import * as React from 'react'
import {useState, useEffect, useContext} from 'react'
import PoolView from './PoolView'
import {WalletContext} from '../../context/WalletContext'
import PositionMgr from '../../abis/PositionManager.json'
import IERC20 from '../../abis/ERC20.json'
import DepositPool from '../../abis/DepositPool.json'
import {ethers, BigNumber, Contract, constants} from 'ethers'

const PoolController = () => {
  const {provider, accountInfo} = useContext(WalletContext)
  const [poolData, setPoolData] = useState<{asset: string; totalSupply: string; supplyApy: string; totalBorrowed: string; borrowApyVariable: string; borrowApyStable: string}[]>()
  const [posManager, setPosManager] = useState<Contract | null>(null)
  const [depPool, setDepPool] = useState<Contract | null>(null)

  useEffect(() => {
    let data = [
      {
        asset: 'Binance',
        totalSupply: '20,223,182,626',
        supplyApy: '895',
        totalBorrowed: '20,960,370',
        borrowApyVariable: '1683',
        borrowApyStable: '394',
      },
      {
        asset: 'Coinbase Exchange',
        totalSupply: '2,815,007,914',
        supplyApy: '945',
        totalBorrowed: '1,756,438',
        borrowApyVariable: '1274',
        borrowApyStable: '5196',
      },
      {
        asset: 'Gate.io',
        totalSupply: '1,652,717,489',
        supplyApy: '549',
        totalBorrowed: '2,658,869',
        borrowApyVariable: '2565',
        borrowApyStable: '1448',
      },
    ]
    setPoolData(data)
  }, [])

  useEffect(() => {
    async function fetchContract() {
      if (!provider) {
        return
      }

      // Address for position manager
      const posManagerAddress = '0xC6CB7f8c046756Bd33ad6b322a3b88B0CA9ceC1b'
      // Address for Deposit Pool
      const depositPoolAddress = '0x3eFadc5E507bbdA54dDb4C290cc3058DA8163152'
      if (accountInfo?.address) {
        setPosManager(new ethers.Contract(posManagerAddress, PositionMgr.abi, provider.getSigner(accountInfo?.address)))
        setDepPool(new ethers.Contract(depositPoolAddress, DepositPool.abi, provider.getSigner(accountInfo?.address)))
      } else {
        setPosManager(new ethers.Contract(posManagerAddress, PositionMgr.abi, provider))
        setDepPool(new ethers.Contract(depositPoolAddress, DepositPool.abi, provider))
      }
    }
    fetchContract()
  }, [provider])

  useEffect(() => {
    getToken()
      .then((res) => {
        let token0: any = null
        if (provider) {
          if (accountInfo?.address) {
            token0 = new ethers.Contract(res, IERC20.abi, provider.getSigner(accountInfo?.address))
          } else {
            token0 = new ethers.Contract(res, IERC20.abi, provider)
          }

          if (token0) {
            token0
              .totalSupply()
              .then((res) => {
                console.log(res.toString())
              })
              .catch((err) => {
                console.log(err)
              })
          }
        }
        console.log(res.toString())
      })
      .catch((err) => {
        console.log(err)
      })

    async function getToken() {
      if (!depPool) {
        return
      }
      return depPool.token0()
    }
  }, [depPool])

  return <PoolView poolData={poolData} />
}

export default PoolController
