import type { NextPage } from "next"
import { HiOutlineInformationCircle } from "react-icons/hi"
import Link from "next/link"
import { usePoolsHandler } from "../../hooks/usePoolsHandler"

const Pools: NextPage = () => {
  const { poolData } = usePoolsHandler()
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
    tableData: "w-full text-sm text-left text-gray-500 dark:text-gray-400",
    tableHead: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
    tableHeading: "py-3 px-6",
    tableBodyRow: "bg-white border-b dark:bg-gray-800 dark:border-gray-700",
    tableBodyDefinition: "py-4 px-6",
    tableHeadDiv: "flex items-center",
    infoSvg: "ml-2 text-lg",
    poolHeading: "pb-12 pt-6 pl-3 text-xl",
    detailsBtn: "bg-slate-100 py-2 px-4 text-gray-600 font-semibold hover:bg-slate-200",
    topHeading: "flex justify-between",
    createPool: "flex justify-center items-center",
    createPoolBtn: "p-3 bg-red-400 font-semibold rounded-xl text-md cursor-pointer",
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
        <table className={style.tableData}>
          <thead className={style.tableHead}>
            <tr>
              <th className={style.tableHeading}>Asset</th>
              <th className={style.tableHeading}>Total Supply</th>
              <th className={style.tableHeading}>Supply APY</th>
              <th className={style.tableHeading}>Total Borrowed</th>
              <th className={style.tableHeading}>
                <div className={style.tableHeadDiv}>
                  Borrow APY, variable <HiOutlineInformationCircle className={style.infoSvg} />
                </div>
              </th>
              <th className={style.tableHeading}>
                <div className={style.tableHeadDiv}>
                  Borrow APY, stable <HiOutlineInformationCircle className={style.infoSvg} />
                </div>
              </th>
              <th className={style.tableHeading}></th>
            </tr>
          </thead>
          <tbody>
            {poolData && poolData.length > 0
              ? poolData.map((pool, index) => {
                  return (
                    <tr className={style.tableBodyRow} key={index}>
                      <td className={style.tableBodyDefinition}>{pool.asset}</td>
                      <td className={style.tableBodyDefinition}>{pool.totalSupply}M</td>
                      <td className={style.tableBodyDefinition}>{pool.supplyApy}%</td>
                      <td className={style.tableBodyDefinition}>{pool.totalBorrowed}M</td>
                      <td className={style.tableBodyDefinition}>{pool.borrowApyVariable}%</td>
                      <td className={style.tableBodyDefinition}>{pool.borrowApyStable}%</td>
                      <td className={style.tableBodyDefinition}>
                        <button className={style.detailsBtn}>Details</button>
                      </td>
                    </tr>
                  )
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Pools
