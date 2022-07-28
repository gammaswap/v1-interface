import type { NextPage } from "next"

const CreatePool: NextPage = () => {
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
  }

  return (
    <div className={style.wrapper}>
      <div className={style.card}>
        <div className={style.cardHead}>
          <p className={style.createPoolHeading}>Create Pool</p>
        </div>
        <div className={style.cardBody}>
          <div className={style.createPoolLabelDiv}>
            <p className={style.createPoolAddress}>Address</p>
          </div>
          <div className={style.inputDiv}>
            <input placeholder="0x36cZJ7...gDQj" type="text" className={style.inputBox} />
          </div>
        </div>
        <div className={style.cardFooter}>
          <button className={style.saveBtn}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default CreatePool
