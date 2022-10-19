import type { NextPage } from 'next'
import Image from 'next/image'
import { ArrowUpIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'

// testing purposes
import Tokens from '../../src/components/Tokens'

const PoolDetails: NextPage = () => {
  const router = useRouter()
  const poolAddress = router.query.poolAddress as string

  const style = {
    wrapper: "w-full h-full flex justify-center",
    container: "mt-20 w-[75rem] text-neutrals-100",
    poolDetailsHeaderContainer: "flex space-x-4 w-1/3 py-1",
    poolDetailsHeaderTokenIcons: "flex space-x-2 items-center",
    poolDetailsHeaderTokenIcon: "flex items-center",
    poolDetailsHeader: "text-3xl",
    tokensUnitConversionContainer: "flex space-x-4 mt-2",
    tokensUnitConversionContent: "flex p-2 space-x-2 bg-neutrals-700 bg-opacity-50 rounded-md drop-shadow-md",
    tokensUnitConversionTokenIcon: "flex items-center",
    tokensUnitConversion: "",
    poolDetailsGridContainer: "grid grid-cols-10 grid-rows-5 gap-4 mt-5",
    poolDetailsGridHeaderContainer: "flex justify-around px-2 py-4 row-span-1 col-span-7 bg-neutrals-700 rounded-md drop-shadow-md",
    poolDetailsGridMainMetricContainer: "space-y-1",
    poolDetailsGridMainMetricTitle: "text-xl",
    poolDetailsGridMainMetricContents: "flex space-x-1",
    poolDetailsGridMainMetricValue: "text-md",
    poolDetailsGridMainMetricChange: "flex items-center text-secondary-jungleGreen",
    poolDetailsChangeArrow: "",
    arrow: "w-4 h-4",
    poolDetailsGridMainMetricChangeNumber: "text-sm",
    poolDetailsGridActionsContainer: "flex flex-col px-2 py-3 row-span-4 col-span-3 bg-neutrals-700 rounded-md drop-shadow-md",
    poolDetailsGridActionsMetricsContainer: "flex flex-col space-y-4",
    poolDetailsGridActionsLoanInfoContainer: "",
    poolDetailsGridActionsMetricsHeader: "text-lg",
    divisionLine: "w-full h-[0.10rem] bg-neutrals-600 bg-opacity-40 mt-1",
    poolDetailsGridActionsMetricsGroup: "flex justify-evenly mt-4",
    poolDetailsGridActionsMetricContainer: "flex flex-col p-2 justify-center items-center bg-neutrals-800 rounded-md drop-shadow-md",
    poolDetailsGridActionsMetricTitle: "text-center text-xxs",
    poolDetailsGridActionsMetricValue: "",
    poolDetailsGridActionsRatesInfoContainer: "",
    poolDetailsGridGraphsContainer: "p-2 row-span-5 col-span-7 bg-neutrals-700 rounded-md drop-shadow-md flex justify-center items-center",
    poolDetailsGridFAQContainer: "p-2 row-span-2 col-span-3 bg-neutrals-700 rounded-md drop-shadow-md flex justify-center items-center",
    comingSoonPoster: "bg-neutrals-900 w-full h-full rounded-md flex justify-center items-center text-neutrals-200/20 text-xl",
    actionButtonsContainer: "flex justify-around mt-auto",
    actionButton: "bg-primary-blue text-center p-2 rounded-lg cursor-pointer",
  }

  const poolDetails = [
    {
      title: "TVL",
      value: "$1.32m",
      change: "1.223%"
    },
    {
      title: "Total Borrowed",
      value: "$1.2m",
      change: "1.234%"
    },
    {
      title: "Total Collateral",
      value: "$1.2m",
      change: "1.223%"
    },
    {
      title: "Utilization Ratio",
      value: "0.05%",
      change: "",
    },
  ]

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        
        <div className={style.poolDetailsHeaderContainer}>
          
          <div className={style.poolDetailsHeaderTokenIcons}>
            <div className={style.poolDetailsHeaderTokenIcon}>
              {/* will change */}
              <Image src={Tokens[4].imgPath} width={32} height={32}/>
            </div>
            <div className={style.poolDetailsHeaderTokenIcon}>
              {/* will change */}
              <Image src={Tokens[0].imgPath} width={32} height={32}/>
            </div>
          </div>
          
          <div className={style.poolDetailsHeader}>USDC / ETH</div>
        
        </div>
        
        <div className={style.tokensUnitConversionContainer}>
          
          <div className={style.tokensUnitConversionContent}>
            <div className={style.tokensUnitConversionTokenIcon}>
              <Image src={Tokens[4].imgPath} width={16} height={16} />
            </div>
            <div className={style.tokensUnitConversion}>1 USDC = &lt;0.001 ETH</div>
          </div>

          <div className={style.tokensUnitConversionContent}>
            <div className={style.tokensUnitConversionTokenIcon}>
              <Image src={Tokens[0].imgPath} width={16} height={16} />
            </div>
            <div className={style.tokensUnitConversion}>1 ETH = 1300 USDC</div>
          </div>

        </div>

        <div className={style.poolDetailsGridContainer}>
          <div className={style.poolDetailsGridHeaderContainer}>
            {poolDetails.map(poolDetail => {
              return (
                <div className={style.poolDetailsGridMainMetricContainer}>
                  <h1 className={style.poolDetailsGridMainMetricTitle}>{poolDetail.title}</h1>
                  <div className={style.poolDetailsGridMainMetricContents}>
                    <h1 className={style.poolDetailsGridMainMetricValue}>{poolDetail.value}</h1>
                    {poolDetail.title != "Utilization Ratio" && (
                      <div className={style.poolDetailsGridMainMetricChange}>
                        <div className={style.poolDetailsChangeArrow}>
                          <ArrowUpIcon className={style.arrow} />
                        </div>
                        <p className={style.poolDetailsGridMainMetricChangeNumber}>{poolDetail.change}</p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

          </div>
          <div className={style.poolDetailsGridActionsContainer}>
            <div className={style.poolDetailsGridActionsMetricsContainer}>
              
              <div className={style.poolDetailsGridActionsLoanInfoContainer}>
                <h1 className={style.poolDetailsGridActionsMetricsHeader}>Loan Info</h1>
                <div className={style.divisionLine}></div>
                
                <div className={style.poolDetailsGridActionsMetricsGroup}>

                  <div className={style.poolDetailsGridActionsMetricContainer}>
                    <h1 className={style.poolDetailsGridActionsMetricTitle}>Max LTV</h1>
                    <h2 className={style.poolDetailsGridActionsMetricValue}>80%</h2>
                  </div>

                  <div className={style.poolDetailsGridActionsMetricContainer}>
                    <h1 className={style.poolDetailsGridActionsMetricTitle}>Liq. Threshold</h1>
                    <h2 className={style.poolDetailsGridActionsMetricValue}>90%</h2>
                  </div>

                  <div className={style.poolDetailsGridActionsMetricContainer}>
                    <h1 className={style.poolDetailsGridActionsMetricTitle}>Liq. Penalty</h1>
                    <h2 className={style.poolDetailsGridActionsMetricValue}>5%</h2>
                  </div>

                </div>

              </div>

              <div className={style.poolDetailsGridActionsRatesInfoContainer}>
                <h1 className={style.poolDetailsGridActionsMetricsHeader}>Rates Info</h1>
                <div className={style.divisionLine}></div>

                <div className={style.poolDetailsGridActionsMetricsGroup}>

                  <div className={style.poolDetailsGridActionsMetricContainer}>
                    <h1 className={style.poolDetailsGridActionsMetricTitle}>Borrow APY</h1>
                    <h2 className={style.poolDetailsGridActionsMetricValue}>3.32%</h2>
                  </div>

                  <div className={style.poolDetailsGridActionsMetricContainer}>
                    <h1 className={style.poolDetailsGridActionsMetricTitle}>Supply APY</h1>
                    <h2 className={style.poolDetailsGridActionsMetricValue}>2.54%</h2>
                  </div>

                </div>

              </div>
            </div>
            <div className={style.actionButtonsContainer}>
              <div className={style.actionButton}>Provide Liquidity</div>
              <div  className={style.actionButton}>Short Liquidity</div>
            </div>
          </div>
          <div className={style.poolDetailsGridGraphsContainer}>
            <div className={style.comingSoonPoster}>Graphs Coming Soon</div>
          </div>
          <div className={style.poolDetailsGridFAQContainer}>
            <div className={style.comingSoonPoster}>FAQs Coming Soon</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PoolDetails