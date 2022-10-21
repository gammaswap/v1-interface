import { useEffect, useState, useCallback } from 'react'
import { notifyError } from './useNotification'
import { ExecutionResult } from 'graphql'
import { PoolsDocument, Pool, PoolsQuery, LatestPoolDataDocument, execute, PoolData } from '../../.graphclient'
import { usePoolsData } from '../context/PoolsDataContext'

export const usePoolsHandler = () => {
  const [pools, setPools] = useState<ExecutionResult<PoolsQuery>>()
  const { latestPoolsData, setLatestPoolsData } = usePoolsData()
  
  // fetches all pool entities
  const fetchPoolsData = useCallback(async () => {
    const res = await execute(PoolsDocument, {})
    if (res?.data) {
      setPools(res.data.pools)
    } else {
      console.log("NO RESPONSE")
    }
  }, [])
  
  // fetches pool's latest data by pool address
  const fetchLatestPoolData = async (address: string): Promise<PoolData | number> => {
    const res = await execute(LatestPoolDataDocument, { address })
    if (res?.data.poolDatas[0]) {
      return res.data.poolDatas[0]
    }
  
    return 0
  }
  
  // iterates through all pool addresses and fetches latest pool data for it
  const fetchLatestPoolsData = useCallback(async (pools: Array<Pool>) => {
    const newPoolsData: Array<PoolData> = []

    for (const pool of pools) {
      const latestPoolData: PoolData | number = await fetchLatestPoolData(pool.address)
      if (latestPoolData != 0) {
        newPoolsData.push(latestPoolData as PoolData)
      }
    }
    
    setLatestPoolsData(newPoolsData)
  }, [])
  
  useEffect(() => {
    fetchPoolsData()
  }, [fetchPoolsData])

  useEffect(() => {
    if (pools) fetchLatestPoolsData(pools as Array<Pool>)
  }, [pools])

  return { pools, latestPoolsData }
}
