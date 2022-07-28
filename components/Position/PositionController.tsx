import * as React from 'react'
import {useState, useEffect} from 'react'
import PositionView from './PositionView'

const PositionController = () => {
  const [positions, setPositions] = useState<{asset: string; amountOfLiquidity: string; amountOfCollateral: string; profit: string; loss: string}[]>()

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

  return <PositionView positions={positions} />
}

export default PositionController
