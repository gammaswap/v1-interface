import { HexString } from "@coinbase/wallet-sdk/dist/types"
import React from "react"

export type PoolData = {
  name: string
  address: string
  totalSupply: string
  supplyApy: string
  totalBorrowed: string
  borrowApyVariable: string
  borrowApyStable: string
}

type PoolTableRowProps = {
  poolData: PoolData
  clickHandler: (poolData: PoolData) => void
}

export const PoolTableRow = (props: PoolTableRowProps) => {
  const { poolData, clickHandler} = props

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
    <div onClick={() => clickHandler(poolData)}>
      <div className={style.tableBodyRow}>
        <div className={style.tableBodyDefinition + " " + style.assetHead}>
          <p>{poolData.name}</p>
        </div>
        <div className={style.tableBodyDefinition + " " + style.totalSupplyHead}>
          <p>{poolData.totalSupply}M</p>
        </div>
        <div className={style.tableBodyDefinition + " " + style.supplyApyHead}>
          <p>{poolData.supplyApy}%</p>
        </div>
        <div className={style.tableBodyDefinition + " " + style.totalBorrowedHead}>
          <p>{poolData.totalBorrowed}M</p>
        </div>
        <div className={style.tableBodyDefinition + " " + style.borrowApyVariableHead}>
          <p>{poolData.borrowApyVariable}%</p>
        </div>
        <div className={style.tableBodyDefinition + " " + style.borrowApyStableHead}>
          <p>{poolData.borrowApyStable}%</p>
        </div>
      </div>
    </div>
  )
}
