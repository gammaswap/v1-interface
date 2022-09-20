import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { usePositionsHandler } from '../../src/hooks/usePositionsHandler'
import { AiOutlineDown } from 'react-icons/ai'

const style = {
  createPositionButtonContainer: 'mx-auto flex flex-col justify-center items-center w-1/8 mt-10',
  createPositionButtonDiv: 'flex items-center w-full justify-end',
  selectPositionTypeDiv: 'flex flex-col items-center w-full justify-start relative',
  createPositionButtonContent:
    'bg-primaryV1-1 rounded-2xl text-md text-white cursor-pointer px-4 py-2 mt-[-0.2rem] shadow-lg shadow-textV1-5/30 hover:bg-primaryV1-3 hover:shadow-textV1-6/30',
  positionWrapper: 'bg-textV1-6 flex flex-col mt-3 rounded-2xl min-h-[550px] min-w-[500px]',
  noPositionWrapper:
    'bg-textV1-6 flex flex-col justify-center align-center items-center mt-3 rounded-2xl min-h-[550px] min-w-[500px]',
  noPositionText: 'text-center text-white',
  posWrapper: 'flex flex-col justify-between min-h-[200px] p-4 m-2 bg-primaryV3-2 rounded-2xl',
  posData: 'flex justify-between align-center',
  eachPos: 'text-2xl text-white',
  posType: 'px-4 bg-primaryV3-1 rounded-2xl text-sm h-fit text-primaryV3-5',
  viewButtonDiv: 'w-full flex justify-end',
  viewButton: 'text-white bg-primaryV1-7 rounded-md px-8 py-2',
  topBarBtns: 'flex justify-between w-full px-2',
  arrow: 'text-sm',
  selectBox:
    'flex justify-between items-center border-y border-x border-slate-200 hover:border-slate-300 w-full py-1 px-2 rounded-lg cursor-pointer',
  selectOptions: 'absolute top-10 bg-white shadow-2xl rounded-lg border-y border-x border-slate-200 z-50',
  eachOption: 'py-2 px-2 text-md hover:bg-primaryV3-2 group cursor-pointer',
  firstOption: 'rounded-tl-lg rounded-tr-lg',
  lastOption: 'rounded-bl-lg rounded-br-lg',
  optionText: 'text-slate-600 group-hover:text-slate-50',
  optionDesc: 'text-slate-400 text-sm group-hover:text-slate-200',
  isSelected: 'bg-primaryV3-2',
  selectedOptionText: 'text-slate-50',
  selectedOptionDesc: 'text-slate-200 text-sm',
}

const PositionsMenu: NextPage = () => {
  const { positions, changePositionType, isSelectOpen, openOrCloseSelectBox, selectedOption } = usePositionsHandler()
  return (
    <div className={style.createPositionButtonContainer}>
      <div className={style.topBarBtns}>
        <div className={style.selectPositionTypeDiv}>
          <div className={style.selectBox} onClick={openOrCloseSelectBox}>
            <p>{selectedOption || 'All'}</p>
            <AiOutlineDown className={style.arrow} />
          </div>
          {isSelectOpen ? (
            <div className={style.selectOptions}>
              <div
                onClick={() => {
                  changePositionType('All')
                }}
                className={
                  selectedOption === 'All'
                    ? style.isSelected + ' ' + style.eachOption + ' ' + style.firstOption
                    : style.eachOption + ' ' + style.firstOption
                }
              >
                <p className={selectedOption === 'All' ? style.selectedOptionText : style.optionText}>All</p>
                <span className={selectedOption === 'All' ? style.selectedOptionDesc : style.optionDesc}>
                  This will show all the opened positions
                </span>
              </div>
              <div
                onClick={() => {
                  changePositionType('Lent')
                }}
                className={selectedOption === 'Lent' ? style.isSelected + ' ' + style.eachOption : style.eachOption}
              >
                <p className={selectedOption === 'Lent' ? style.selectedOptionText : style.optionText}>Lent</p>
                <span className={selectedOption === 'Lent' ? style.selectedOptionDesc : style.optionDesc}>
                  This will show all the lent positions
                </span>
              </div>
              <div
                onClick={() => {
                  changePositionType('Borrowed')
                }}
                className={
                  selectedOption === 'Borrowed'
                    ? style.isSelected + ' ' + style.eachOption + ' ' + style.lastOption
                    : style.eachOption + ' ' + style.lastOption
                }
              >
                <p className={selectedOption === 'Borrowed' ? style.selectedOptionText : style.optionText}>Borrowed</p>
                <span className={selectedOption === 'Borrowed' ? style.selectedOptionDesc : style.optionDesc}>
                  This will show all the borrowed positions
                </span>
              </div>
            </div>
          ) : null}
          {/* <AiOutlineDown className={style.arrow} />
          <select className={style.selectBox} onChange={changePositionType}>
            <option value="All">
              All
            </option>
            <option value="Lent">Lent</option>
            <option value="Borrowed">Borrowed</option>
          </select> */}
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
