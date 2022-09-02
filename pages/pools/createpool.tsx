import type { NextPage } from "next"
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react"
import { useCreatePoolHandler } from "../../src/hooks/useCreatePoolHandler"
import { ethers } from 'ethers'

const CreatePool: NextPage = () => {

  const {
    createPool,
    token1Addr,
    setToken1Addr,
    token2Addr,
    setToken2Addr,
    cfmmAddr,
    setCfmmAddr
  } = useCreatePoolHandler()

  const [buttonEnabled, setButtonEnabled] = useState<boolean>(false)

  const style = {
    wrapper: "w-screen flex flex-col items-center",
    card: "flex flex-col bg-gray-900 w-[30rem] rounded-2xl p-4 mt-4",
    cardHead: "font-semibold text-xl text-gray-200 px-2",
    createPoolHeading: "",
    cardBody: "px-2 text-white my-4",
    createPoolLabelDiv: "mt-3",
    createPoolAddress: "font-semibold text-gray-200 w-full",
    inputDiv: "bg-gray-800 rounded-2xl p-4 border-2 border-gray-800 hover:border-gray-600 flex justify-between w-full mt-3",
    inputBox: "bg-transparent placeholder:ttext-gray-600 outline-none w-full text-3xl text-gray-300",
    cardFooter: "text-white px-2 mt-3",
    saveBtn: "bg-green-300 w-full rounded-2xl text-slate-200 inline-flex place-content-center py-2 font-semibold",
    saveBtnGrey: 'bg-[#274060] w-full rounded-2xl text-gray-500 inline-flex place-content-center py-2 font-semibold',
  }

  useEffect(() => {
    if (!token1Addr || !token2Addr || !cfmmAddr ||
      !ethers.utils.isAddress(token1Addr) ||
      !ethers.utils.isAddress(token2Addr) ||
      !ethers.utils.isAddress(cfmmAddr)) {
      setButtonEnabled(false)
    } else {
      setButtonEnabled(true)
    }
  }, [token1Addr, token2Addr, cfmmAddr])

  return (
    <div className={style.wrapper}>
      <div className={style.card}>
        <div className={style.cardHead}>
          <p className={style.createPoolHeading}>Create Pool</p>
        </div>
        <div className={style.cardBody}>
          <div className={style.createPoolLabelDiv}>
            <p className={style.createPoolAddress}>Token 1 Address</p>
          </div>
          <div className={style.inputDiv}>
            <input placeholder="0x123..." type="text" className={style.inputBox}
              value={token1Addr}
              onChange={(e) => setToken1Addr(e.target.value)} />
          </div>
        </div>
        <div className={style.cardBody}>
          <div className={style.createPoolLabelDiv}>
            <p className={style.createPoolAddress}>Token 2 Address</p>
          </div>
          <div className={style.inputDiv}>
            <input placeholder="0x123..." type="text" className={style.inputBox}
              value={token2Addr}
              onChange={(e) => setToken2Addr(e.target.value)} />
          </div>
        </div>
        <div className={style.cardBody}>
          <div className={style.createPoolLabelDiv}>
            <p className={style.createPoolAddress}>CFMM Address</p>
          </div>
          <div className={style.inputDiv}>
            <input placeholder="0x123..." type="text" className={style.inputBox}
              value={cfmmAddr}
              onChange={(e) => setCfmmAddr(e.target.value)} />
          </div>
        </div>
        <div className={style.cardFooter}>
          <button className={buttonEnabled ? style.saveBtn : style.saveBtnGrey}
            onClick={buttonEnabled ? createPool : undefined} >Create Pool</button>
        </div>
      </div>
    </div>
  )
}

export default CreatePool
