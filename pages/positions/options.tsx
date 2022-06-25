import type { NextPage } from 'next'
import Link from 'next/link'

const style = {
    wrapper: "flex flex-col space-y-20",
    optionsButtonContainer: "mx-auto flex justify-center items-center w-1/8 text-gray-200",
    optionsButtonContent: "w-full h-min flex justify-center items-center bg-blue-500 rounded-2xl text-2xl font-medium cursor-pointer p-4 mt-[-0.2rem] shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-blue-600/30",
}

const options: NextPage = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.optionsButtonContainer}>
                <Link href={'addliquidity'}>
                    <button className={style.optionsButtonContent}>Add Liquidity</button>
                </Link>
            </div>
            <div className={style.optionsButtonContainer}>
                <Link href={'openloan'}>
                    <button className={style.optionsButtonContent}>Borrow</button>
                </Link>
            </div>
        </div>
    )
}

export default options