import React from 'react'

type PositionProps = {
  asset: string
  amountOfLiquidity: string
  amountOfCollateral: string
  profit: string
  loss: string
}

type PropsType = {
  position: PositionProps
}

const PositionTableRow = (props: PropsType) => {
  const { position } = props

  const style = {
    tableBodyRow: 'flex text-xs text-gray-700 uppercase pl-2 pr-4 border-b border-gray-500',
    tableBodyDefinition: 'py-3 w-[20%] justify-start font-medium text-white flex align-center overflow-hidden',
    rightAlign: 'justify-end',
    leftAlign: 'justify-start',
  }

  return (
    <a href="">
      <div className={style.tableBodyRow}>
        <div className={style.tableBodyDefinition + ' ' + style.leftAlign}>
          <p>{position.asset}</p>
        </div>
        <div className={style.tableBodyDefinition + ' ' + style.rightAlign}>
          <p>{position.amountOfLiquidity}</p>
        </div>
        <div className={style.tableBodyDefinition + ' ' + style.rightAlign}>
          <p>{position.amountOfCollateral}</p>
        </div>
        <div className={style.tableBodyDefinition + ' ' + style.rightAlign}>
          <p>{position.profit}</p>
        </div>
        <div className={style.tableBodyDefinition + ' ' + style.rightAlign}>
          <p>{position.loss}</p>
        </div>
      </div>
    </a>
  )
}

export default PositionTableRow
