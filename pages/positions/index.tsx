import type { NextPage } from 'next'
import Link from 'next/link'

const style = {
    createPositionButtonContainer: "mx-auto flex justify-center items-center w-1/8 text-gray-200",
    createPositionButtonContent: "w-full h-min flex justify-center items-center bg-textV1-5 rounded-2xl text-2xl font-medium cursor-pointer p-4 mt-[-0.2rem] shadow-lg shadow-textV1-5/30 hover:bg-textV1-6 hover:shadow-textV1-6/30",
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