import { useEffect, useState } from "react"

type PoolType = { asset: string; totalSupply: string; supplyApy: string; totalBorrowed: string; borrowApyVariable: string; borrowApyStable: string }

export const usePoolsHandler = () => {
  const [poolData, setPoolData] = useState<PoolType[]>()

  useEffect(() => {
    setPoolData([
      {
        asset: "Binance",
        totalSupply: "20,223,182,626",
        supplyApy: "895",
        totalBorrowed: "20,960,370",
        borrowApyVariable: "1683",
        borrowApyStable: "394",
      },
      {
        asset: "Coinbase Exchange",
        totalSupply: "2,815,007,914",
        supplyApy: "945",
        totalBorrowed: "1,756,438",
        borrowApyVariable: "1274",
        borrowApyStable: "5196",
      },
      {
        asset: "Gate.io",
        totalSupply: "1,652,717,489",
        supplyApy: "549",
        totalBorrowed: "2,658,869",
        borrowApyVariable: "2565",
        borrowApyStable: "1448",
      },
    ])
  }, [])

  return { poolData }
}
