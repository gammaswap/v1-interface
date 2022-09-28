import { useEffect, useState } from 'react'
import { callSubgraph } from '../services/graphQLApi'
import { notifyError } from './useNotification'
import { PoolCreatedQuery } from '../utils/graphQLQuery'

type PoolType = {
  name: string
  address: string
  totalSupply: string
  supplyApy: string
  totalBorrowed: string
  borrowApyVariable: string
  borrowApyStable: string
}

export const usePoolsHandler = () => {
  const [poolsData, setPoolsData] = useState<PoolType[]>([])

  useEffect(() => {
    const fetchPoolsData = async () => {
      let query = JSON.stringify(PoolCreatedQuery)
      let result = await callSubgraph(query)
      if (result?.poolCreateds?.length > 0) {
        let data: PoolType[] = []
        // setPoolData([])
        for (let i = 0; i < result.poolCreateds.length; i++) {
          let obj: PoolType = {
            supplyApy: '0',
            name: result.poolCreateds[i].pool,
            address: "",
            totalSupply: result.poolCreateds[i].protocol,
            totalBorrowed: result.poolCreateds[i].protocolId,
            borrowApyVariable: result.poolCreateds[i].cfmm,
            borrowApyStable: result.poolCreateds[i].count,
          }
          data.push(obj)
          // TODO: Below line will be used when we get the data from subgraph with the same keys as we have defined in PoolType
          // setPoolData((poolData) => [...poolData, result.poolCreateds[i]])
        }
        setPoolsData(data)
      }
    }

    if (process.env.NEXT_PUBLIC_SUBGRAPH_URL) {
      if (poolsData?.length === 0) {
        fetchPoolsData()
      }
    } else {
      setPoolsData([
        {
          name: 'Binance',
          address: process.env.NEXT_PUBLIC_GAMMAPOOL_ADDRESS || "",
          totalSupply: '20,223,182,626',
          supplyApy: '895',
          totalBorrowed: '20,960,370',
          borrowApyVariable: '1683',
          borrowApyStable: '394',
        },
        {
          name: 'Coinbase Exchange',
          address: process.env.NEXT_PUBLIC_GAMMAPOOL_ADDRESS || "",
          totalSupply: '2,815,007,914',
          supplyApy: '945',
          totalBorrowed: '1,756,438',
          borrowApyVariable: '1274',
          borrowApyStable: '5196',
        },
        {
          name: 'Gate.io',
          address: process.env.NEXT_PUBLIC_GAMMAPOOL_ADDRESS || "",
          totalSupply: '1,652,717,489',
          supplyApy: '549',
          totalBorrowed: '2,658,869',
          borrowApyVariable: '2565',
          borrowApyStable: '1448',
        },
      ])
    }
  }, [])

  return { poolsData }
}
