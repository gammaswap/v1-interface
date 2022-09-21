import { useState, useEffect } from 'react'
import { callSubgraph } from '../services/graphQLApi'
import { LoanQuery } from '../utils/graphQLQuery'

type PositionType = {
  asset: string
  amountOfLiquidity: string
  amountOfCollateral: string
  profit: string
  loss: string
}

export const usePositionHandler = () => {
  const [positions, setPositions] = useState<PositionType[]>([])

  useEffect(() => {
    const fetchPositionsData = async () => {
      let query = JSON.stringify(LoanQuery)
      let result = await callSubgraph(query)
      if (result?.loans?.length > 0) {
        let data: PositionType[] = []
        // setPositions([])
        for (let i = 0; i < result.loans.length; i++) {
          let obj = {
            asset: result.loans[i].pool,
            amountOfLiquidity: result.loans[i].tokenId,
            amountOfCollateral: '0',
            profit: '0',
            loss: '0',
          }
          data.push(obj)
          // setPositions((positions) => [...positions, result.loans[i]])
        }
        setPositions(data)
      }
    }
    if (process.env.NEXT_PUBLIC_SUBGRAPH_URL) {
      if (positions?.length === 0) {
        fetchPositionsData()
      }
    } else {
      setPositions([
        {
          asset: 'ETH - BN',
          amountOfLiquidity: '100',
          amountOfCollateral: '200',
          profit: '20',
          loss: '80',
        },
        {
          asset: 'ZIL - ETH',
          amountOfLiquidity: '154',
          amountOfCollateral: '375',
          profit: '12',
          loss: '88',
        },
        {
          asset: 'DAI - BTC',
          amountOfLiquidity: '45687',
          amountOfCollateral: '1234',
          profit: '100',
          loss: '00',
        },
      ])
    }
  }, [positions])

  return { positions }
}
