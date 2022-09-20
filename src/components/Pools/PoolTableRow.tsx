import React from "react"

type PoolProps = {
  asset: string
  totalSupply: string
  supplyApy: string
  totalBorrowed: string
  borrowApyVariable: string
  borrowApyStable: string
}

type PropsType = {
  pool: PoolProps
}

const PoolTableRow = (props: PropsType) => {
  const { pool } = props

  const style = {
    tableBodyRow: "flex border-b border-gray-500 pl-2 pr-4",
    tableBodyDefinition: "py-4 flex overflow-hidden mr-2 ml-2",
    assetHead: "w-[20%] justify-start font-medium text-white",
    totalSupplyHead: "w-[16%] justify-end font-medium text-white",
    supplyApyHead: "w-[16%] justify-end font-medium text-white",
    totalBorrowedHead: "w-[16%] justify-end font-medium text-white",
    borrowApyVariableHead: "w-[16%] justify-end font-medium text-white",
    borrowApyStableHead: "w-[16%] justify-end font-medium text-white",
  }

  return (
    <a href="">
      <div className={style.tableBodyRow}>
        <div className={style.tableBodyDefinition + " " + style.assetHead}>
          <p>{pool.asset}</p>
        </div>
        <div className={style.tableBodyDefinition + " " + style.totalSupplyHead}>
          <p>{pool.totalSupply}M</p>
        </div>
        <div className={style.tableBodyDefinition + " " + style.supplyApyHead}>
          <p>{pool.supplyApy}%</p>
        </div>
        <div className={style.tableBodyDefinition + " " + style.totalBorrowedHead}>
          <p>{pool.totalBorrowed}M</p>
        </div>
        <div className={style.tableBodyDefinition + " " + style.borrowApyVariableHead}>
          <p>{pool.borrowApyVariable}%</p>
        </div>
        <div className={style.tableBodyDefinition + " " + style.borrowApyStableHead}>
          <p>{pool.borrowApyStable}%</p>
        </div>
      </div>
    </a>
  )
}

export default PoolTableRow
