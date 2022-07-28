import * as React from 'react'

type PositionProps = {
  positions: {asset: string; amountOfLiquidity: string; amountOfCollateral: string; profit: string; loss: string}[] | undefined
}

const PositionView = ({positions}: PositionProps) => {
  const style = {
    wrapper: 'w-screen flex justify-center items-center',
    tableView: 'w-screen overflow-x-auto relative bg-white mx-20',
    tableData: 'w-full text-sm text-left text-gray-500 datk:text-gray-400',
    tableHead: 'text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400',
    tableHeading: 'py-3 px-6',
    tableBodyRow: 'bg-white border-b dark:bg-gray-800 dark:border-gray-700',
    tableBodyDefinition: 'py-4 px-6',
  }

  return (
    <div className={style.wrapper}>
      <div className={style.tableView}>
        <table className={style.tableData}>
          <thead className={style.tableHead}>
            <tr>
              <th className={style.tableHeading}>Liquidity Pool</th>
              <th className={style.tableHeading}>Amount of Liquidity</th>
              <th className={style.tableHeading}>Amount of Collateral</th>
              <th className={style.tableHeading}>Profit</th>
              <th className={style.tableHeading}>Loss</th>
            </tr>
          </thead>
          <tbody>
            {positions && positions.length > 0
              ? positions.map((pos, index) => {
                  return (
                    <tr className={style.tableBodyRow} key={index}>
                      <td className={style.tableBodyDefinition}>{pos.asset}</td>
                      <td className={style.tableBodyDefinition}>{pos.amountOfLiquidity}</td>
                      <td className={style.tableBodyDefinition}>{pos.amountOfCollateral}</td>
                      <td className={style.tableBodyDefinition}>{pos.profit}</td>
                      <td className={style.tableBodyDefinition}>{pos.loss}</td>
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

export default PositionView
