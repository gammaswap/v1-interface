import { useEffect, useState } from 'react'
import { callApi } from '../utils/graphQLApi'
import { notifyError } from './useNotification'

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
    if (poolData?.length === 0) {
      let query = JSON.stringify({
        query: `
    {
      poolCreateds {
        id
        pool
        cfmm
        protocolId
        protocol
        count
      }
    }
    `,
      })
      callApi(query)
        .then((res) => {
          if (res?.poolCreateds?.length > 0) {
            let data: PoolType[] = []
            for (let i = 0; i < res.poolCreateds.length; i++) {
              let obj: PoolType = {
                supplyApy: '0',
                asset: res.poolCreateds[i].pool,
                totalSupply: res.poolCreateds[i].protocol,
                totalBorrowed: res.poolCreateds[i].protocolId,
                borrowApyVariable: res.poolCreateds[i].cfmm,
                borrowApyStable: res.poolCreateds[i].count,
              }
              data.push(obj)
            }
            setPoolData(data)
          }
        })
        .catch((err) => {
          notifyError(err)
        })
    }
    // setPoolData([
    //   {
    //     asset: 'Binance',
    //     totalSupply: '20,223,182,626',
    //     supplyApy: '895',
    //     totalBorrowed: '20,960,370',
    //     borrowApyVariable: '1683',
    //     borrowApyStable: '394',
    //   },
    //   {
    //     asset: 'Coinbase Exchange',
    //     totalSupply: '2,815,007,914',
    //     supplyApy: '945',
    //     totalBorrowed: '1,756,438',
    //     borrowApyVariable: '1274',
    //     borrowApyStable: '5196',
    //   },
    //   {
    //     asset: 'Gate.io',
    //     totalSupply: '1,652,717,489',
    //     supplyApy: '549',
    //     totalBorrowed: '2,658,869',
    //     borrowApyVariable: '2565',
    //     borrowApyStable: '1448',
    //   },
    // ])
  }, [poolData])

  return { poolData }
}
