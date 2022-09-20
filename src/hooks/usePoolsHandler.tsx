import { useEffect, useState } from 'react'
import { callSubgraph } from '../services/graphQLApi'
import { notifyError } from './useNotification'
import { PoolCreatedQuery } from '../utils/graphQLQuery'

type PoolType = {
  asset: string
  totalSupply: string
  supplyApy: string
  totalBorrowed: string
  borrowApyVariable: string
  borrowApyStable: string
}

export const usePoolsHandler = () => {
  const [poolData, setPoolData] = useState<PoolType[]>([])

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
            asset: result.poolCreateds[i].pool,
            totalSupply: result.poolCreateds[i].protocol,
            totalBorrowed: result.poolCreateds[i].protocolId,
            borrowApyVariable: result.poolCreateds[i].cfmm,
            borrowApyStable: result.poolCreateds[i].count,
          }
          data.push(obj)
          // TODO: Below line will be used when we get the data from subgraph with the same keys as we have defined in PoolType
          // setPoolData((poolData) => [...poolData, result.poolCreateds[i]])
        }
        setPoolData(data)
      }
    }

    if (poolData?.length === 0) {
      fetchPoolsData()
    }
  }, [poolData])

  return { poolData }
}
