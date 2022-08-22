import { useState, useEffect } from 'react'

type PositionTypeParams = {
  tokenA: string
  tokenB: string
  positionType: string
}

export const usePositionsHandler = () => {
  const [positions, setPositions] = useState<PositionTypeParams[]>()
  const [initialPositions, setInitialPositions] = useState<PositionTypeParams[]>()
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false)
  const [selectedOption, setSelectedOption] = useState<string>('All')

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

  function openOrCloseSelectBox() {
    setIsSelectOpen((prevState) => !prevState)
  }

  function changePositionType(positionType: string) {
    if (positionType && initialPositions) {
      setIsSelectOpen((prevState) => !prevState)
      switch (positionType) {
        case 'Lent':
          setSelectedOption('Lent')
          let lentData = initialPositions.filter((pos) => pos.positionType.toLocaleLowerCase() === 'lent')
          setPositions(lentData)
          break
        case 'Borrowed':
          setSelectedOption('Borrowed')
          let borrowedData = initialPositions.filter((pos) => pos.positionType.toLocaleLowerCase() === 'borrowed')
          setPositions(borrowedData)
          break
        default:
          setSelectedOption('All')
          setPositions(initialPositions)
          break
      }
    }
  }

  return { positions, changePositionType, isSelectOpen, openOrCloseSelectBox, selectedOption }
}
