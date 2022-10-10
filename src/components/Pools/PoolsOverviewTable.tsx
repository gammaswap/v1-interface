import { NextPage } from "next"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline"
import { PoolTableRow } from "./PoolTableRow"


export const PoolsOverviewTable: NextPage = () => {
  const style = {
    poolsOverviewContainer: "font-normal flex flex-col space-y-2",
    poolsOverviewHeader: "text-neutrals-600 font-medium",
    poolsOverviewTable: "flex flex-col bg-neutrals-800 pt-4 px-3 rounded-lg drop-shadow-md",
    poolsOverviewTableHeader: "",
    poolsOverviewTableHeaderContent: "flex",
    poolsOverviewTableHeaderPrimary: "flex space-x-6",
    poolsOverviewTableHeaderItem: "text-neutrals-300",
    poolsOverviewTableHeaderSecondary: "flex space-x-6 ml-auto",
    poolsOverviewTableLine: "w-full h-[0.10rem] bg-neutrals-700 opacity-40 mt-2",
    poolsOverviewPagination: "py-4 flex justify-center items-center space-x-5 text-neutrals-400",
    poolsOverviewPaginationPreviousArrow: "",
    arrow: "w-4 h-4",
    poolsOverviewPaginationPage: "text-neutrals-100 text-sm",
    poolsOverviewPaginationNextArrow: "",
  }

  return (
    <div className={style.poolsOverviewContainer}>
      <h1 className={style.poolsOverviewHeader}>Top Pools</h1>
      <div className={style.poolsOverviewTable}>
        
        {/* Table Header */}
        <div className={style.poolsOverviewTableHeader}>
          <div className={style.poolsOverviewTableHeaderContent}>
            <div className={style.poolsOverviewTableHeaderPrimary}>
              <p className={style.poolsOverviewTableHeaderItem}>#</p>
              <p className={style.poolsOverviewTableHeaderItem}>Pool</p>
            </div>
            
            <div className={style.poolsOverviewTableHeaderSecondary}>
              <p className={style.poolsOverviewTableHeaderItem}>Total Supply</p>
              <p className={style.poolsOverviewTableHeaderItem}>Supply APY</p>
              <p className={style.poolsOverviewTableHeaderItem}>Total Borrowed</p>
              <p className={style.poolsOverviewTableHeaderItem}>Borrow APY</p>
            </div>
          </div>
          <div className={style.poolsOverviewTableLine}></div>
        </div>

        {/* Table Row */}
        <PoolTableRow />
        <PoolTableRow />
        <PoolTableRow />
        <PoolTableRow />
        <PoolTableRow />
        
        {/* TODO: Pagination Section */}
        <div className={style.poolsOverviewPagination}>
          
          <div className={style.poolsOverviewPaginationPreviousArrow}>
            <ArrowLeftIcon className={style.arrow} />
          </div>
          
          <div className={style.poolsOverviewPaginationPage}>Page 1 of 5</div>
          
          <div className={style.poolsOverviewPaginationNextArrow}>
            <ArrowRightIcon className={style.arrow} />
          </div>

        </div>
      </div>
    </div>

  )
}