import type { NextPage } from 'next'
import { usePositionHandler } from '../../src/hooks/usePositionHandler'
import PositionTableRow from '../../src/components/Positions/PositionTableRow'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline'

const PositionPage: NextPage = () => {
  const { positions } = usePositionHandler()

  const style = {
    wrapper: 'w-screen flex flex-col',
    tableContainer:
      'flex flex-col overflow-x-auto relative bg-white mx-20 p-4 rounded-lg bg-gray-50 bg-gray-700 text-gray-400',
    tableData: 'w-full text-sm text-left text-gray-500 datk:text-gray-400',
    tableHead: 'flex text-xs text-gray-700 uppercase pl-2 pr-4 border-b border-gray-500',
    tableHeading: 'py-3 w-[20%] font-medium text-white flex align-center overflow-hidden',
    tableBodyRow: 'bg-white border-b bg-gray-800 border-gray-700',
    tableBodyDefinition: 'py-4 px-6',
    arrow: 'mt-2 w-4 h-4 text-2xl cursor-pointer',
    allArrows: 'flex justify-end',
    rightAlign: 'justify-end',
    leftAlign: 'justify-start',
  }

  return (
    <div className={style.wrapper}>
      <div className={style.tableContainer}>
        <div className={style.tableHead}>
          <div className={style.tableHeading + ' ' + style.leftAlign}>
            <p>Liquidity Pool</p>
          </div>
          <div className={style.tableHeading + ' ' + style.rightAlign}>
            <p>Amount of Liquidity</p>
          </div>
          <div className={style.tableHeading + ' ' + style.rightAlign}>
            <p>Amount of Collateral</p>
          </div>
          <div className={style.tableHeading + ' ' + style.rightAlign}>
            <p>Profit</p>
          </div>
          <div className={style.tableHeading + ' ' + style.rightAlign}>
            <p>Loss</p>
          </div>
        </div>
        {positions && positions.length > 0
          ? positions.map((pos, index) => {
              return <PositionTableRow key={index} position={pos} />
            })
          : null}

        <div className={style.allArrows}>
          <ArrowLeftIcon className={style.arrow} />
          <ArrowRightIcon className={style.arrow} />
        </div>
      </div>
    </div>
  )
}

export default PositionPage
