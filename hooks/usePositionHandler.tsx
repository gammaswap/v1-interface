import { useState, useEffect } from 'react'

type PositionType = {
  asset: string
  amountOfLiquidity: string
  amountOfCollateral: string
  profit: string
  loss: string
}

export const usePositionHandler = () => {
  const [positions, setPositions] = useState<PositionType[]>()

  useEffect(() => {
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
  }, [])

  return { positions }
}
