import { useState, useEffect } from 'react'

type PositionTypeParams = {
  tokenA: string
  tokenB: string
  positionType: string
}

export const usePositionsHandler = () => {
  const [positions, setPositions] = useState<PositionTypeParams[]>()
  const [initialPositions, setInitialPositions] = useState<PositionTypeParams[]>()

  useEffect(() => {
    const timer = setTimeout(() => {
      let data = [
        { tokenA: 'ETH', tokenB: 'USDC', positionType: 'Lent' },
        { tokenA: 'ETH', tokenB: 'USDC', positionType: 'Borrowed' },
      ]
      setPositions(data)
      setInitialPositions(data)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  function changePositionType(e: any) {
    if (e.target.value && initialPositions) {
      switch (e.target.value) {
        case 'Lent':
          let lentData = initialPositions.filter((pos) => pos.positionType.toLocaleLowerCase() === 'lent')
          setPositions(lentData)
          break
        case 'Borrowed':
          let borrowedData = initialPositions.filter((pos) => pos.positionType.toLocaleLowerCase() === 'borrowed')
          setPositions(borrowedData)
          break
        default:
          setPositions(initialPositions)
          break
      }
    }
  }

  return { positions, changePositionType }
}
