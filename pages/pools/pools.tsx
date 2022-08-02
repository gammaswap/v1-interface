import type { NextPage } from "next"
import { HiOutlineInformationCircle } from "react-icons/hi"
import Link from "next/link"
import PoolTableRow from "../../components/Pools/PoolTableRow"

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
    tableContainer: "p-4 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
    tableHead: "flex text-xs text-gray-700 uppercase pl-2 pr-4 border-b border-gray-500",
    tableHeading: "flex align-center py-3",
    infoSvg: "ml-2 text-lg",
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
              <HiOutlineInformationCircle className={style.infoSvg} />
            </div>
            <div className={style.tableHeading + " " + style.borrowApyStableHead}>
              <p>Borrow APY, stable</p>
              <HiOutlineInformationCircle className={style.infoSvg} />
            </div>
          </div>
          <PoolTableRow />
        </div>
      </div>
    </div>
  )
}

export default Pools
