import type { NextPage } from "next"
import { InformationCircleIcon } from "@heroicons/react/outline"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline"
import Link from "next/link"
import { PoolTableRow, PoolData } from "../../src/components/Pools/PoolTableRow"
import { usePoolsHandler } from "../../src/hooks/usePoolsHandler"
import { useState } from "react"
import PoolDetailsModal from "../../src/components/Pools/PoolDetailsModal"

const Pools: NextPage = () => {
  const style = {
    wrapper: "w-screen flex flex-col",
    topBar: "w-screen flex flex-col bg-gray-800 h-48 py-4 px-16 justify-center",
    heading: "m-2 text-3xl text-white",
    topBarHead: "flex flex-row items-center",
    topBarListings: "flex pl-1",
    topBarSingleListings: "m-2",
    currencySymbol: "text-2xl text-slate-400",
    topBarData: "text-sm text-gray-400",
    topBarSingleValue: "text-2xl text-slate-100",
    tableView: "overflow-x-auto relative bg-white mx-20",
    tableContainer: "p-4 rounded-lg bg-gray-50 bg-gray-700 text-gray-400",
    tableHead: "flex text-xs text-gray-700 uppercase pl-2 pr-4 border-b border-gray-500",
    tableHeading: "flex align-center py-3",
    infoSvg: "ml-2 w-4 h-4 text-lg",
    poolHeading: "pb-12 pt-6 pl-3 text-xl",
    topHeading: "flex justify-between",
    createPool: "flex justify-center items-center",
    createPoolBtn: "p-3 bg-red-400 font-semibold rounded-xl text-md cursor-pointer",
    assetHead: "w-[20%] justify-start font-medium text-white",
    totalSupplyHead: "w-[16%] justify-end font-medium text-white",
    supplyApyHead: "w-[16%] justify-end font-medium text-white",
    totalBorrowedHead: "w-[16%] justify-end font-medium text-white",
    borrowApyVariableHead: "w-[16%] justify-end font-medium text-white",
    borrowApyStableHead: "w-[16%] justify-end font-medium text-white",
    arrow: "mt-2 w-4 h-4 text-2xl cursor-pointer",
    allArrows: "flex justify-end",
  }

  const { poolsData } = usePoolsHandler()
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false)
  const [selectedPoolData, setSelectedPoolData] = useState<PoolData>()

  const openPoolDetails = (poolData: PoolData): void => {
    setSelectedPoolData(poolData)
    setIsDetailsOpen(true)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.topBar}>
        <div className={style.topBarHead}>
          <p className={style.heading}>GammaSwap Pools</p>
        </div>
        <div className={style.topBarListings}>
          <div className={style.topBarSingleListings}>
            <p className={style.topBarData}>Total Pool Size</p>
            <p className={style.topBarSingleValue}>
              <span className={style.currencySymbol}>$</span>5.60B
            </p>
          </div>
          <div className={style.topBarSingleListings}>
            <p className={style.topBarData}>Total Available</p>
            <p className={style.topBarSingleValue}>
              <span className={style.currencySymbol}>$</span>5.60B
            </p>
          </div>
          <div className={style.topBarSingleListings}>
            <p className={style.topBarData}>Total Borrow</p>
            <p className={style.topBarSingleValue}>
              <span className={style.currencySymbol}>$</span>5.60B
            </p>
          </div>
        </div>
      </div>
      <div className={style.tableView}>
        <div className={style.topHeading}>
          <div className={style.poolHeading}>
            <p>Gammaswap assets</p>
          </div>
          <div className={style.createPool}>
            <Link href={"/pools/createpool"}>
              <div className={style.createPoolBtn}>Create Pool</div>
            </Link>
          </div>
        </div>
        <div className={style.tableContainer}>
          <div className={style.tableHead}>
            <div className={style.tableHeading + " " + style.assetHead}>
              <p>Asset</p>
            </div>
            <div className={style.tableHeading + " " + style.totalSupplyHead}>
              <p>Total Supply</p>
            </div>
            <div className={style.tableHeading + " " + style.supplyApyHead}>
              <p>Supply APY</p>
            </div>
            <div className={style.tableHeading + " " + style.totalBorrowedHead}>
              <p>Total Borrowed</p>
            </div>
            <div className={style.tableHeading + " " + style.borrowApyVariableHead}>
              <p>Borrow APY, variable</p>
              <InformationCircleIcon className={style.infoSvg} />
            </div>
            <div className={style.tableHeading + " " + style.borrowApyStableHead}>
              <p>Borrow APY, stable</p>
              <InformationCircleIcon className={style.infoSvg} />
            </div>
          </div>
          {poolsData && poolsData.length > 0 ? poolsData.map((poolData, index) => <PoolTableRow key={index} poolData={poolData} clickHandler={openPoolDetails} />) : null}
          <div className={style.allArrows}>
            <ArrowLeftIcon className={style.arrow} />
            <ArrowRightIcon className={style.arrow} />
          </div>
        </div>
      </div>
      <PoolDetailsModal
        isOpen={isDetailsOpen}
        setIsOpen={setIsDetailsOpen}
        poolData={selectedPoolData}
      />
    </div>
  )
}

export default Pools
