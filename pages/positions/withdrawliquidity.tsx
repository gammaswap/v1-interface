import { useState, ChangeEvent, SetStateAction, Dispatch } from 'react'
import type { NextPage } from 'next'
import Slider from 'react-slider-simple';
import { ArrowDownIcon } from '@chakra-ui/icons'

const WithdrawLiquidity: NextPage = () => {
  const [tokenAInputVal, setTokenAInputVal] = useState<string>("")
  const [sliderPercentage, setsliderPercentage] = useState<number>(0)
    const style = {
        wrapper: "w-screen flex justify-center items-center",
        content: "bg-gray-900 w-[40rem] rounded-2xl p-4",
        formHeader: "px-2 flex justify-between items-center font-semibold text-xl text-gray-200 text-center",
        formLabel: " flex justify-between pt-3 px-2 font-regular text-sm text-gray-200",
        tokenContainer: "bg-gray-800 my-3 rounded-2xl p-6 text-3xl border-2 border-gray-800 hover:border-gray-600 flex justify-between",
        tokenInput: "bg-transparent placeholder:text-gray-600 outline-none mb-6 w-full text-4xl text-gray-300 mt-4",
        confirmButton: "w-full bg-blue-400 m-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center cursor-pointer text-white mt-8 border-2 border-blue-400 hover:border-blue-300",
        invalidatedButton: "w-full my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center text-gray-600 mt-8 border-2 border-gray-700",
        withdrawHeading: 'w-screen text-center',
        sliderStyle: 'border border-gray-800 my-4 p-4 rounded-2xl',
        sliderPercent: 'mb-5 text-7xl text-white',
        percentageBox: 'flex justify-between p-4',
        percentages: 'bg-gray-800 text-white text-center w-full mx-5 py-2 cursor-pointer rounded-sm font-semibold',
        dropdownArrow: "w-12 h-8",
        downIcon: "flex justify-center",
        buttonDiv: "flex justify-center"
      }

      const onChange = (percent: number) => {
        let data : number = parseInt(percent.toFixed(0))
        setsliderPercentage(data);
      }
      const onDone = (percent: number) => {
        console.log(`I'm done. here's the percent: ${percent}%`);
      };
        const validateTokenInput = (
            e: ChangeEvent<HTMLInputElement>,
            setToken: Dispatch<SetStateAction<string>>
          ): void => {
            const tokenInput: string = (e.target as HTMLInputElement).value
            setToken(tokenInput.replace(/[^0-9.]/g, ''))
          }
        
        return (
            <div className={style.wrapper}>
              <div className={style.content}>
                <div className={style.formHeader}>
                  <div className={style.withdrawHeading}>Withdraw Liquidity</div>
                </div>
                <div>
                  <div className={style.formLabel}>
                    <p>
                      Amount
                    </p>
                    <p>
                      Detailed
                    </p>
                  </div>
                  <div className={style.sliderStyle}>
                    <p className={style.sliderPercent}>{sliderPercentage}%</p>
                    <Slider
                      value={sliderPercentage}
                      onChange={onChange}
                      onDone={onDone}
                      thumbColor="rgb(51, 8 1, 70)"
                      shadowColor="rgb(31, 41, 55)"
                      sliderPathColor="rgb(31, 41, 70)"
                    />
                    <div className={style.percentageBox}>
                      <p className={style.percentages} onClick={() => {setsliderPercentage(25)}}>25%</p>
                      <p className={style.percentages} onClick={() => {setsliderPercentage(50)}}>50%</p>
                      <p className={style.percentages} onClick={() => {setsliderPercentage(75)}}>75%</p>
                      <p className={style.percentages} onClick={() => {setsliderPercentage(100)}}>Max</p>
                    </div>
                  </div>
                  <div className={style.downIcon}>
                    <ArrowDownIcon className={style.dropdownArrow} style={{color: 'white'}} />
                  </div>
                </div>
                <div className={style.tokenContainer}>
                  <input type="text" onChange={e => validateTokenInput(e, setTokenAInputVal)} value={tokenAInputVal} placeholder="0.0" className={style.tokenInput} />
                </div>
                <div className={style.buttonDiv}>
                    <div className={style.confirmButton}>
                        Approve
                    </div>
                    <div className={style.invalidatedButton}>
                        Remove
                    </div>
                </div>
              </div>
            </div>
        )
    }

export default WithdrawLiquidity
