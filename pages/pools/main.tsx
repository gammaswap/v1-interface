import type { NextPage } from "next"
import { useState } from "react"
import Image from "next/image"
import { InformationCircleIcon } from "@heroicons/react/outline"
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/outline"
import { PoolData } from "../../src/components/Pools/PoolTableRow"
import { usePoolsHandler } from "../../src/hooks/usePoolsHandler"
import { PoolsOverviewTable } from "../../src/components/Pools/PoolsOverviewTable"

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
    arrow: "w-4 h-4",
    poolStatChangeNumber: "text-secondary-jungleGreen",
  }

  const { poolsData } = usePoolsHandler()
  const [selectedPoolData, setSelectedPoolData] = useState<PoolData>()

  const poolStats = [
    {
      header: "Total Pool Size",
      amount: "$25m",
      change: "1.23%"
    },
    {
      header: "Total Available",
      amount: "$6.03m",
      change: "1.23%"
    },
    {
      header: "Available to Borrow",
      amount: "$4.04m",
      change: "1.23%"
    },
  ]

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        {/* Main Pool Statistics */}
        <div className={style.poolStatsContainer}>
          <h1 className={style.poolStatsHeader}>GammaSwap Overview</h1>
          <div className={style.poolStatsContent}>
            {/* Pool Stats */}
            {poolStats.map((stat, index) => (
              <div key={index} className={style.poolStatContainer}>
                <div className={style.poolStatHeader}>
                  <h2>{stat.header}</h2>
                  <InformationCircleIcon className={style.infoIcon} />
                </div>
                <div className={style.poolStatInfo}>
                  <div className={style.poolStatNumber}>{stat.amount}</div>
                  <div className={style.poolStatChange}>
                    <div className={style.poolStatChangeArrow}>
                      <ArrowUpIcon className={style.arrow} />
                    </div>
                    <p className={style.poolStatChangeNumber}>{stat.change}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PoolsOverviewTable />
      </div>
    </div>
  )
}

export default Pools
