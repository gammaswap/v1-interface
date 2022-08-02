import React from "react"
import { usePoolsHandler } from "../../hooks/usePoolsHandler"
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs"

const PoolTableRow = () => {
  const style = {
    tableBodyRow: "flex border-b border-gray-500 pl-2 pr-4",
    tableBodyDefinition: "py-4 flex",
    arrow: "mt-2 text-2xl cursor-pointer",
    assetHead: "w-[20%] justify-start font-medium text-white",
    totalSupplyHead: "w-[16%] justify-end font-medium text-white",
    supplyApyHead: "w-[16%] justify-end font-medium text-white",
    totalBorrowedHead: "w-[16%] justify-end font-medium text-white",
    borrowApyVariableHead: "w-[16%] justify-end font-medium text-white",
    borrowApyStableHead: "w-[16%] justify-end font-medium text-white",
    allArrows: "flex justify-end",
  }

  const { poolData } = usePoolsHandler()
  return (
    <>
      {poolData && poolData.length > 0
        ? poolData.map((pool, index) => {
            return (
              <a href="" key={index}>
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
          })
        : null}
      <div className={style.allArrows}>
        <BsArrowLeftShort className={style.arrow} />
        <BsArrowRightShort className={style.arrow} />
      </div>
    </>
  )
}

export default PoolTableRow
