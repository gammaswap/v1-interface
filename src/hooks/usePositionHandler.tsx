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
    if (positions?.length === 0) {
      fetchPositionsData()
    }
  }, [positions])

  return { positions }
}
