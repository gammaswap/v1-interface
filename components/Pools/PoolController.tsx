import * as React from 'react'
import {useState, useEffect} from 'react'
import PoolView from './PoolView'

const PoolController = () => {
  const [poolData, setPoolData] = useState<{asset: string; totalSupply: string; supplyApy: string; totalBorrowed: string; borrowApyVariable: string; borrowApyStable: string}[]>()

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

  return <PoolView poolData={poolData} />
}

export default PoolController
