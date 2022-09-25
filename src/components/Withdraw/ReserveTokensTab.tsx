import * as React from 'react'
import Image from 'next/image'

export const ReserveTokensTab = () => {
    const style = {
        sectionHeader: 'font-semibold text-neutrals-400 w-full',
        reserveTokensPooledTokensContainer: 'drop-shadow-md p-4 bg-neutrals-700 rounded-lg text-neutrals-100 mt-5',
        reserveTokensPooledContainer: 'flex',
        reserveTokensPooledAmount: 'flex items-center',
        reserveTokensPooledPair: 'flex space-x-2 ml-auto',
        reserveTokensPooledSymbol: 'text-neutrals-100',
        reserveTokensEarnedTokensContainer: 'bg-neutrals-700 drop-shadow-md p-4 rounded-lg text-neutrals-100 mt-5',
        reserveTokensPNLContainer: 'mt-5 flex',
        reserveTokensProfitsLossesContainer: '',
        profitsLosses: 'text-secondary-jungleGreen',
        reserveTokensPNLGraph: 'w-64 h-32 bg-neutrals-800 rounded-md drop-shadow-md flex justify-center items-center text-neutrals-200/20 ml-auto',
        reserveTokenAIcon: 'flex items-center',
        reserveTokenBIcon: 'flex items-center',
    }

    return (
        <>
            {/* POOLED SECTION */}
            <div className={style.reserveTokensPooledTokensContainer}>
                <div className={style.sectionHeader}>Pooled</div>
                <div className={style.reserveTokensPooledContainer}>
                    <h1 className={style.reserveTokensPooledAmount}>168.8921</h1>
                    <div className={style.reserveTokensPooledPair}>
                        <div className={style.reserveTokenAIcon}>
                            <Image src={"/crypto/uni.svg"} width={20} height={20} />
                        </div>
                        <div className={style.reserveTokensPooledSymbol}>UNI</div>
                    </div>
                </div>
                <div className={style.reserveTokensPooledContainer}>
                    <h1 className={style.reserveTokensPooledAmount}>72.2959</h1>
                    <div className={style.reserveTokensPooledPair}>
                        <div className={style.reserveTokenBIcon}>
                            <Image src={"/crypto/eth.svg"} width={20} height={20} />
                        </div>
                        <div className={style.reserveTokensPooledSymbol}>ETH</div>
                    </div>
                </div>
            </div>
            {/* EARNED SECTION */}
            <div className={style.reserveTokensEarnedTokensContainer}>
                <div className={style.sectionHeader}>Fees Earned</div>
                <div className={style.reserveTokensPooledContainer}>
                    <h1 className={style.reserveTokensPooledAmount}>23.9167</h1>
                    <div className={style.reserveTokensPooledPair}>
                        <div className={style.reserveTokenAIcon}>
                            <Image src={"/crypto/uni.svg"} width={20} height={20} />
                        </div>
                        <div className={style.reserveTokensPooledSymbol}>UNI</div>
                    </div>
                </div>
                <div className={style.reserveTokensPooledContainer}>
                    <h1 className={style.reserveTokensPooledAmount}>5.3287</h1>
                    <div className={style.reserveTokensPooledPair}>
                        <div className={style.reserveTokenBIcon}>
                            <Image src={"/crypto/eth.svg"} width={20} height={20} />
                        </div>
                        <div className={style.reserveTokensPooledSymbol}>ETH</div>
                    </div>
                </div>
                <div className={style.reserveTokensPNLContainer}>
                    <div className={style.reserveTokensProfitsLossesContainer}>
                        <h1 className={style.sectionHeader}>Profits & Losses</h1>
                        <div className={style.profitsLosses}>+38.2983 (6.79%)</div>
                    </div>
                    <div className={style.reserveTokensPNLGraph}>Coming Soon</div>
                </div>
            </div>
        </>
    )
}