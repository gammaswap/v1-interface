import { MdOutlineClose } from 'react-icons/md'
import { useRebalanceHandler } from '../../hooks/useRebalanceHandler'

type SlippageProps = {
  openSlippage: any
}

export const SlippageModal = ({ openSlippage }: SlippageProps) => {
  const { slippage, handleSlippageInput, slippageMinutes, handleSlippageMinutes, changeSlippagePercent } =
    useRebalanceHandler()
  const style = {
    slippageWrapper: 'w-screen flex justify-center items-center bg-primaryV1-4/50 absolute h-screen z-50',
    slippageContent: 'bg-primaryV3-4 w-[25rem] rounded-2xl p-4 border-2 border-primaryV3-1',
    slippageTopbar: 'flex justify-between items-center mb-4',
    slippageTopHeading: 'text-textV1-1 font-semibold text-lg',
    slippageCancel: 'text-textV1-1 text-lg',
    closeIcon: 'cursor-pointer',
    slippageMiddle: 'flex flex-col border rounded-2xl border-primaryV3-1 py-4 px-2',
    slippageHeading: 'text-md text-white mb-2',
    slippageTextBoxDiv: 'flex justify-between',
    slippageText:
      'w-full rounded-2xl bg-primaryV1-4 py-1 pl-4 pr-6 outline-none placeholder:text-textV1-4 text-textV1-6 text-end',
    percentages: 'flex justify-between w-full ml-4',
    slippagePercent: 'bg-primaryV1-4 px-2 py-1 rounded-full cursor-pointer hover:bg-primaryV1-5 hover:text-white',
    slippageDeadlineBox: 'flex flex-col border rounded-2xl border-primaryV3-1 py-4 px-2 mt-2',
    slippageDeadlineHeading: 'text-md text-white mb-2',
    slippageDeadlineTextBoxDiv: 'flex justify-between',
    slippageDeadlineText:
      'w-full rounded-2xl bg-primaryV1-4 px-4 outline-none placeholder:text-textV1-4 text-textV1-6 text-end',
    minutesText: 'w-full text-white ml-2 py-1',
    slippageTextBox: 'relative w-full flex items-center',
    slippagePercentSign: 'absolute right-2 text-textV1-6 font-semibold',
  }
  return (
    <>
      <div className={style.slippageWrapper}>
        <div className={style.slippageContent}>
          <div className={style.slippageTopbar}>
            <div className={style.slippageTopHeading}>
              <p>Slippage</p>
            </div>
            <div className={style.slippageCancel}>
              <MdOutlineClose className={style.closeIcon} onClick={openSlippage} />
            </div>
          </div>

          <div className={style.slippageMiddle}>
            <div className={style.slippageHeading}>
              <p>Slippage Tolerance</p>
            </div>
            <div className={style.slippageTextBoxDiv}>
              <div className={style.slippageTextBox}>
                <input
                  value={slippage}
                  onChange={handleSlippageInput}
                  type="text"
                  className={style.slippageText}
                  placeholder={'0.0'}
                />
                <span className={style.slippagePercentSign}>%</span>
              </div>
              <div className={style.percentages}>
                <span
                  onClick={() => {
                    changeSlippagePercent('0.5')
                  }}
                  className={style.slippagePercent}
                >
                  0.5%
                </span>
                <span
                  onClick={() => {
                    changeSlippagePercent('1')
                  }}
                  className={style.slippagePercent}
                >
                  1%
                </span>
                <span
                  onClick={() => {
                    changeSlippagePercent('3')
                  }}
                  className={style.slippagePercent}
                >
                  3%
                </span>
              </div>
            </div>
          </div>

          <div className={style.slippageDeadlineBox}>
            <div className={style.slippageDeadlineHeading}>
              <p>Transaction Deadline</p>
            </div>
            <div className={style.slippageDeadlineTextBoxDiv}>
              <input
                value={slippageMinutes}
                onChange={handleSlippageMinutes}
                type="text"
                className={style.slippageDeadlineText}
                placeholder={'30'}
              />
              <span className={style.minutesText}>Minutes</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
