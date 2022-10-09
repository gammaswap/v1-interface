import { HexString } from "@coinbase/wallet-sdk/dist/types"
import React from "react"
import Image from "next/image"

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

export const PoolTableRow = () => {
  // const { poolData, clickHandler} = props

  const style = {
    poolsOverviewTableRow: "pt-4",
    poolsOverviewTableContent: "flex space-x-32",
    poolsOverviewTableRowPrimary: "flex space-x-6",
    poolsOverviewTableRowItem: "",
    poolsOverviewTableRowPool: "flex space-x-2",
    poolsOverviewTableRowPoolIcons: "",
    poolsOverviewTableRowPoolIcon: "",
    poolsOverviewTableRowSecondary: "flex space-x-20 ml-auto",
    poolsOverviewTableLine: "w-full h-[0.10rem] bg-neutrals-700 opacity-40 mt-4",
  }

  return (
    <div className={style.poolsOverviewTableRow}>
      <div className={style.poolsOverviewTableContent}>
        <div className={style.poolsOverviewTableRowPrimary}>
          <p className={style.poolsOverviewTableRowItem}>1</p>
          <div className={style.poolsOverviewTableRowPool}>
            <div className={style.poolsOverviewTableRowPoolIcons}>
              <Image src={""} className={style.poolsOverviewTableRowPoolIcon} width={""} height={""} />
              <Image src={""} className={style.poolsOverviewTableRowPoolIcon} width={""} height={""} />
            </div>
            <p className={style.poolsOverviewTableRowItem}>USDC/ETH</p>
          </div>
        </div>
        
        <div className={style.poolsOverviewTableRowSecondary}>
          <p className={style.poolsOverviewTableRowItem}>1.34m</p>
          <p className={style.poolsOverviewTableRowItem}>3.34%</p>
          <p className={style.poolsOverviewTableRowItem}>432k</p>
          <p className={style.poolsOverviewTableRowItem}>2.22%</p>
        </div>
      </div>
      <div className={style.poolsOverviewTableLine}></div>
    </div>
  )
}
