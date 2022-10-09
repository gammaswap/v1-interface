import { useEffect, useState } from 'react'
import { notifyError } from './useNotification'
import { PoolsQueryDocument, PoolsQueryQuery, execute } from '../../.graphclient'

export const usePoolsHandler = () => {
  const [poolsData, setPoolsData] = useState<PoolsQueryQuery>()
  
  useEffect(() => {
    const fetchPoolsData = async () => {
      const res = await execute(PoolsQueryDocument, {})
      if (res?.data) {
        setPoolsData(res?.data)
      } else {
        console.log("NO RESPONSE")
      }
    }
    fetchPoolsData()
  }, [])

  return { poolsData }
}
