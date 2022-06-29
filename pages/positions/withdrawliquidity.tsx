import { useState, ChangeEvent, SetStateAction, Dispatch } from 'react'
import type { NextPage } from 'next'

const WithdrawLiquidity: NextPage = () => {
    
    const style = {
        wrapper: "w-screen flex justify-center items-center",
        content: "bg-gray-900 w-[40rem] rounded-2xl p-4",
        formHeader: "px-2 flex justify-between items-center font-semibold text-xl text-gray-200",
        formLabel: "pt-3 px-2 font-regular text-sm text-gray-200",
        tokenContainer: "bg-gray-800 my-3 rounded-2xl p-6 text-3xl border-2 border-gray-800 hover:border-gray-600 flex justify-between",
        tokenInput: "bg-transparent placeholder:text-gray-600 outline-none mb-6 w-full text-4xl text-gray-300 mt-4",
        confirmButton: "bg-blue-400 my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center cursor-pointer text-white mt-8 border-2 border-blue-400 hover:border-blue-300"
      }
    
        const [tokenAInputVal, setTokenAInputVal] = useState<string>("")
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
                  <div>Withdraw Liquidity</div>
                </div>
                <div className={style.formLabel}>
                <div>Balance in Liquidity: 0</div>
                <div>Balance in : 0</div>
                </div>
                <div className={style.tokenContainer}>
                  <input type="text" onChange={e => validateTokenInput(e, setTokenAInputVal)} value={tokenAInputVal} placeholder="0.0" className={style.tokenInput} />
                </div>
                <div>
                    <div className={style.confirmButton}>
                        Submit
                    </div>
                </div>
              </div>
            </div>
        )
    }

export default WithdrawLiquidity
