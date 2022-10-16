import { useEffect, useState } from 'react'
import { notifyError } from './useNotification'
import { ExecutionResult } from 'graphql'
import { PoolsDocument, Pool, PoolsQuery, LatestPoolDataDocument, execute, PoolData } from '../../.graphclient'

export const usePoolsHandler = () => {
  const [pools, setPools] = useState<ExecutionResult<PoolsQuery>>()
  const [latestPoolsData, setLatestPoolsData]  = useState<Array<PoolData>>([])
  
  useEffect(() => {
    const fetchPoolsData = async () => {
      const res = await execute(PoolsDocument, {})
      if (res?.data) {
        setPools(res.data.pools)
      } else {
        console.log("NO RESPONSE")
      }
    }
    
    fetchPoolsData()
  }, [])
  
  useEffect(() => {
    const fetchLatestPoolData = async (address: string): Promise<PoolData | number> => {
      const res = await execute(LatestPoolDataDocument, { address })
      if (res?.data.poolDatas[0]) {
        return res.data.poolDatas[0]
      }

      return 0
    }

    const fetchLatestPoolsData = async (pools: Array<Pool>) => {
      // query latest pool data for each addr
      // push to latestPoolsData
      pools?.forEach(async pool => {
        const latestPoolData: PoolData | number = await fetchLatestPoolData(pool.address)
        if (latestPoolData != 0) {
          const newPoolsData = [...latestPoolsData]
          newPoolsData.push(latestPoolData as PoolData)
          setLatestPoolsData(newPoolsData)
        }
      })
    }
    
    fetchLatestPoolsData(pools as Array<Pool>)
  }, [])

  return { pools, latestPoolsData }
}
