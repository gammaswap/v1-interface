import type { NextPage } from "next"
import { useState } from "react"
import Image from "next/image"
import { InformationCircleIcon } from "@heroicons/react/outline"
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/outline"
import Link from "next/link"
import { PoolTableRow, PoolData } from "../../src/components/Pools/PoolTableRow"
import { usePoolsHandler } from "../../src/hooks/usePoolsHandler"

const Pools: NextPage = () => {
  const style = {
    wrapper: "w-full h-full flex justify-center text-neutrals-100",
    container: "flex flex-col space-y-10 mx-auto mt-4",
    poolStatsContainer: "w-[45rem] bg-neutrals-800 p-4 rounded-lg drop-shadow-md",
    poolStatsHeader: "text-3xl",
    poolStatsContent: "flex justify-between mt-4",
    poolStatContainer: "bg-neutrals-800 rounded-lg py-2 px-4 drop-shadow-md",
    poolStatHeader: "text-sm text-neutrals-600 flex items-center space-x-1",
    infoIcon: "w-4 h-4 cursor-pointer hover:text-neutrals-100",
    poolStatInfo: "flex items-center space-x-2 mt-1",
    poolStatNumber: "text-2xl",
    poolStatChange: "flex items-center",
    poolStatChangeArrow: "text-secondary-jungleGreen",
    downArrow: "",
    poolStatChangeNumber: "text-secondary-jungleGreen",
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

  const { poolsData } = usePoolsHandler()
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false)
  const [selectedPoolData, setSelectedPoolData] = useState<PoolData>()

  const openPoolDetails = (poolData: PoolData): void => {
    setSelectedPoolData(poolData)
    setIsDetailsOpen(true)
  }

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {/* Main Pool Statistics */}
        <div className={style.poolStatsContainer}>
          <h1 className={style.poolStatsHeader}>GammaSwap Overview</h1>
          <div className={style.poolStatsContent}>
            
            {/* Pool Stat #1 */}
            <div className={style.poolStatContainer}>
              <div className={style.poolStatHeader}>
                <h2>Total Pool Size</h2>
                <InformationCircleIcon className={style.infoIcon} />
              </div>
              <div className={style.poolStatInfo}>
                
                <div className={style.poolStatNumber}>$25m</div>
                
                <div className={style.poolStatChange}>
                  <div className={style.poolStatChangeArrow}>
                    <ArrowUpIcon className={style.arrow} />
                  </div>
                  <p className={style.poolStatChangeNumber}>1.23%</p>
                </div>
              
              </div>
            </div>

            {/* Pool Stat #2 */}
            <div className={style.poolStatContainer}>
              <div className={style.poolStatHeader}>
                <h2>Total Pool Size</h2>
                <InformationCircleIcon className={style.infoIcon} />
              </div>
              <div className={style.poolStatInfo}>
                
                <div className={style.poolStatNumber}>$6.03m</div>
                
                <div className={style.poolStatChange}>
                  <div className={style.poolStatChangeArrow}>
                    <ArrowUpIcon className={style.arrow} />
                  </div>
                  <p className={style.poolStatChangeNumber}>1.23%</p>
                </div>
              
              </div>
            </div>

            {/* Pool Stat #3 */}
            <div className={style.poolStatContainer}>
              <div className={style.poolStatHeader}>
                <h2>Total Pool Size</h2>
                <InformationCircleIcon className={style.infoIcon} />
              </div>
              <div className={style.poolStatInfo}>
                
                <div className={style.poolStatNumber}>$4.04m</div>
                
                <div className={style.poolStatChange}>
                  <div className={style.poolStatChangeArrow}>
                    <ArrowUpIcon className={style.arrow} />
                  </div>
                  <p className={style.poolStatChangeNumber}>1.23%</p>
                </div>
              
              </div>
            </div>

          </div>
        </div>
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
            
            {/* Pagination Section */}
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
      </div>
    </div>
  )
}

export default Pools
