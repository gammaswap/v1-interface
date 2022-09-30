import type { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const style = {
  wrapper: "w-full h-full flex justify-center",
  optionsContainer: "mt-20 flex-col h-1/2 space-y-14",
  optionsHeader: "font-medium flex justify-center text-4xl text-gray-100",
  optionsButtonContainer: "w-[30rem]",
  optionsButtonContent: "w-full overflow-hidden flex items-center bg-neutrals-700 rounded-xl cursor-pointer p-6 drop-shadow-lg hover:bg-neutrals-700 group",
  hoveredOptionsButtonContent: "w-0 h-0 rounded bg-gradient-to-tr from-accents-royalBlue via-primary-blue to-cyan-400 absolute top-0 left-0 ease-out duration-50 transition-all group-hover:w-full group-hover:h-full -z-1",
  optionsButtonPrimary: "w-full transition-colors duration-300 ease-in-out group-hover:text-white z-10 space-y-2",
  buttonTitle: "group-hover:text-white text-2xl text-gray-50 flex",
  buttonText: "text-sm text-gray-50 flex text-start",
  optionsButtonSecondary: "hidden group-hover:absolute group-hover:block group-hover:ml-[15rem]",
}

const Options: NextPage = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.optionsContainer}>
        <h1 className={style.optionsHeader}>Open a New Position</h1>
        <div className={style.optionsButtonContainer}>
          <Link href={'deposit/0'}>
            <button className={style.optionsButtonContent}>
              <span className={style.hoveredOptionsButtonContent}></span>
              <div className={style.optionsButtonPrimary}>
                <div className={style.buttonTitle}>Provide Liquidity</div>
                <div className={style.buttonText}>
                  Lend liquidity with any ERC-20 Token pair.
                </div>
              </div>
              <div className={style.optionsButtonSecondary}>
                <Image src="/gsLogoImage.png" width={200} height={200} className="rounded-full opacity-20" />
              </div>
            </button>
          </Link>
        </div>
        <div className={style.optionsButtonContainer}>
          <Link href={'openloan'}>
            <button className={style.optionsButtonContent}>
            <span className={style.hoveredOptionsButtonContent}></span>
              <div className={style.optionsButtonPrimary}>
                <div className={style.buttonTitle}>Short Liquidity</div>
                <div className={style.buttonText}>
                  Borrow liquidity to hedge against impermanent loss.
                </div>
              </div>
              <div className={style.optionsButtonSecondary}>
                <Image src="/gsLogoImage.png" width={200} height={200} className="rounded-full opacity-20" />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Options