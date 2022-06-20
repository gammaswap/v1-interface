import type { NextPage } from 'next'
import Link from 'next/link'

const style = {
    createPositionButtonContainer: "mx-auto flex justify-center items-center w-1/8 text-gray-200",
    createPositionButtonContent: "w-full h-min flex justify-center items-center bg-blue-500 rounded-2xl text-2xl font-medium cursor-pointer p-4 mt-[-0.2rem] shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-blue-600/30",
}

const PositionsMenu: NextPage = () => {
    return (
        <div className={style.createPositionButtonContainer}>
            <Link href={'positions/options'}>
                <button className={style.createPositionButtonContent}>+ Create Position</button>
            </Link>
        </div>
    )
}

export default PositionsMenu