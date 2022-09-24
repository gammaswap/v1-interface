import * as React from 'react'
import Image from 'next/image'

export const LPTokensTab = () => {
    const style = {
        sectionHeader: 'font-semibold text-neutrals-400 w-full',
        lpTokensPooledContainer: 'flex justify-between',
        lpTokensPooledAmount: 'flex items-center',
        lpTokensPooledPair: 'flex space-x-2',
        lpTokensPooledIcons: 'relative w-[2rem] h-[1.5rem] self-center',
        lpTokenAIcon: 'mt-0.5',
        lpTokenBIcon: 'absolute top-0.5 right-0 -z-10',
        lpTokensPooledSymbol: 'text-lg',
        lpTokensEarnedTokensContainer: 'bg-neutrals-700 drop-shadow-md mt-5 p-4 rounded-lg',
        lpTokensPNLContainer: 'mt-5 flex',
        lpTokensProfitsLossesContainer: '',
        profitsLosses: 'text-secondary-jungleGreen',
        lpTokensPNLGraph: 'w-64 h-32 bg-neutrals-800 rounded-md drop-shadow-md flex justify-center items-center text-neutrals-200/20 ml-auto',
        lpTokensPooledTokensContainer: 'drop-shadow-md p-4 bg-neutrals-700 rounded-lg text-neutrals-100 mt-5',    
    }

    return (
        <>
            {/* POOLED SECTION */}
            <div className={style.lpTokensPooledTokensContainer}>
                <div className={style.sectionHeader}>Pooled</div>
                <div className={style.lpTokensPooledContainer}>
                    <h1 className={style.lpTokensPooledAmount}>322.3422</h1>
                    <div className={style.lpTokensPooledPair}>
                        <div className={style.lpTokensPooledIcons}>
                            <div className={style.lpTokenAIcon}>
                                <Image src={"/crypto/uni.svg"} width={20} height={20} />
                            </div>
                            <div className={style.lpTokenBIcon}>
                                <Image src={"/crypto/eth.svg"} width={20} height={20} />
                            </div>
                        </div>
                        <div className={style.lpTokensPooledSymbol}>UNI / ETH</div>
                    </div>
                </div>
            </div>
            {/* EARNED SECTION */}
            <div className={style.lpTokensEarnedTokensContainer}>
                <div className={style.sectionHeader}>Fees Earned</div>
                <div className={style.lpTokensPooledContainer}>
                    <h1 className={style.lpTokensPooledAmount}>28.3422</h1>
                    <div className={style.lpTokensPooledPair}>
                        <div className={style.lpTokensPooledIcons}>
                            <div className={style.lpTokenAIcon}>
                                <Image src={"/crypto/uni.svg"} width={20} height={20} />
                            </div>
                            <div className={style.lpTokenBIcon}>
                                <Image src={"/crypto/eth.svg"} width={20} height={20} />
                            </div>
                        </div>
                        <div className={style.lpTokensPooledSymbol}>UNI / ETH</div>
                    </div>
                </div>
                <div className={style.lpTokensPNLContainer}>
                    <div className={style.lpTokensProfitsLossesContainer}>
                        <h1 className={style.sectionHeader}>Profits & Losses</h1>
                        <div className={style.profitsLosses}>+38.2983 (6.79%)</div>
                    </div>
                    <div className={style.lpTokensPNLGraph}>Coming Soon</div>
                </div>
            </div>
        </>
    )
}
