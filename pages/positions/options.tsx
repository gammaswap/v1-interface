import type { NextPage } from 'next'
import Link from 'next/link'

const style = {
  wrapper: "flex-col space-y-20 justify-center w-[30rem]",
  header: "font-bold mx-auto flex justify-center w-[30rem] text-black text-4xl",
  optionsButtonContainer: "mx-auto flex justify-left items-left w-[30rem] text-textV1-1",
  optionsButtonContent: "w-full justify-left items-left bg-textV1-5 rounded-2xl font-medium cursor-pointer p-4 mt-[-0.2rem] shadow-lg shadow-textV1-5/30 hover:bg-textV1-6 hover:shadow-textV1-6/30",
  buttonTitle: "text-2xl flex",
  buttonText: "text-sm flex text-left",
}

const options: NextPage = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div>Open a new Position</div>
      </div>
      <div className={style.optionsButtonContainer}>
        <Link href={'addliquidity'}>
          <button className={style.optionsButtonContent}>
            <div className={style.buttonTitle}> Lend</div>
            <div className={style.buttonText}>
              Provide liquidity with any pair of ERC-20 tokens. Begin earning
              yields when you deposit your tokens into the GammaSwap Pool.</div>
          </button>
        </Link>
      </div>
      <div className={style.optionsButtonContainer}>
        <Link href={'openloan'}>
          <button className={style.optionsButtonContent}>
            <div className={style.buttonTitle}>Borrow</div>
            <div className={style.buttonText}>
              Open a laon if you're long volatility and hedge your risk 
              exposure. Analyze the health of your loan from the moment you 
              borrow all the way until you pay it back.
              </div>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default options