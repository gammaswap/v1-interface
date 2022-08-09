import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { usePositionsHandler } from '../../src/hooks/usePositionsHandler'
import { AiOutlineDown } from 'react-icons/ai'

const style = {
  createPositionButtonContainer: 'mx-auto flex flex-col justify-center items-center w-1/8 mt-10',
  createPositionButtonDiv: 'flex items-center w-full justify-end',
  selectPositionTypeDiv: 'flex items-center w-full justify-start relative',
  selectBox:
    'form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:outline-none',
  createPositionButtonContent:
    'bg-primaryV1-1 rounded-2xl text-md text-white font-medium cursor-pointer px-4 py-2 mt-[-0.2rem] shadow-lg shadow-textV1-5/30 hover:bg-primaryV1-3 hover:shadow-textV1-6/30',
  positionWrapper: 'bg-textV1-6 flex flex-col mt-3 rounded-2xl min-h-[550px] min-w-[500px]',
  noPositionWrapper:
    'bg-textV1-6 flex flex-col justify-center align-center items-center mt-3 rounded-2xl min-h-[550px] min-w-[500px]',
  noPositionText: 'text-center text-white',
  posWrapper: 'flex flex-col justify-between min-h-[200px] p-4 m-2 bg-primaryV3-2 rounded-2xl',
  posData: 'flex justify-between align-center',
  eachPos: 'text-2xl font-semibold text-white',
  posType: 'px-4 bg-primaryV3-1 rounded-2xl text-sm h-fit text-primaryV3-5',
  viewButtonDiv: 'w-full flex justify-end',
  viewButton: 'text-white bg-primaryV1-7 rounded-md px-8 py-2',
  topBarBtns: 'flex justify-between w-full px-2',
  arrow: 'absolute right-4 text-sm',
}

const PositionsMenu: NextPage = () => {
  const { positions, changePositionType } = usePositionsHandler()
  return (
    <div className={style.createPositionButtonContainer}>
      <div className={style.topBarBtns}>
        <div className={style.selectPositionTypeDiv}>
          <AiOutlineDown className={style.arrow} />
          <select className={style.selectBox} onChange={changePositionType}>
            <option value="All">
              All
            </option>
            <option value="Lent">Lent</option>
            <option value="Borrowed">Borrowed</option>
          </select>
        </div>
        <div className={style.createPositionButtonDiv}>
          <Link href={'positions/options'}>
            <button className={style.createPositionButtonContent}>+ Create Position</button>
          </Link>
        </div>
      </div>
      <div className={positions ? style.positionWrapper : style.noPositionWrapper}>
        {positions && positions.length > 0 ? (
          positions.map((pos, index) => {
            return (
              <div className={style.posWrapper} key={index}>
                <div className={style.posData}>
                  <p className={style.eachPos}>
                    {pos.tokenA}/{pos.tokenB} Position
                  </p>
                  <p className={style.posType}>{pos.positionType}</p>
                </div>
                <div className={style.viewButtonDiv}>
                  <button className={style.viewButton}>View</button>
                </div>
              </div>
            )
          })
        ) : (
          <div>
            <Image src="/assets/not_found.svg" alt="Not Found" width={400} height={82} />
            <p className={style.noPositionText}>
              It looks like you have no open positions yet.
              <br />
              Now is your time.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PositionsMenu
