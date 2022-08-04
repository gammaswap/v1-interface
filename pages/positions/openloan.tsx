import type {NextPage} from 'next'
import SelectCollateralModal from '../../src/components/OpenLoan/SelectCollateralModal'
import {FaInfoCircle} from 'react-icons/fa'
import {ChevronDownIcon} from '@heroicons/react/solid'
import PairsSelector from '../../src/components/PairsSelector'
import {useOpenLoanHandler} from '../../src/hooks/useOpenLoanHandler'
import {OpenLoanStyles} from '../../styles/OpenLoanStyles'

const style = OpenLoanStyles()

const OpenLoanPage: NextPage = () => {
  const {
    token0,
    token1,
    setToken0,
    setToken1,
    validateBeforeSubmit,
    handleNumberInput,
    handleSubmit,
    register,
    setIsOpen,
    loanAmtStr,
    setLoanAmtStr,
    setLoanAmt,
    collateralButtonText,
    isOpen,
    setCollateralType,
    collateralAmt0Str,
    setCollateralAmt0Str,
    setCollateralAmt0,
    collateral1Class,
    collateralAmt1Str,
    setCollateralAmt1Str,
    setCollateralAmt1,
    confirmStyle,
    buttonText,
  } = useOpenLoanHandler()

  return (
    <div className={style.wrapper}>
      <form className={style.formContent} onSubmit={handleSubmit(validateBeforeSubmit)}>
        <div className={style.vStack}>
          <div className={style.formHeader}>Open Your Loan</div>
          <div className={style.vStackItem}>
            <PairsSelector token0={token0} token1={token1} setToken0={setToken0} setToken1={setToken1} />
          </div>
          <div className={style.vStackItem}>
            <div className={style.infoGroup}>
              <div className={style.loanInfoButton} onClick={() => setIsOpen(true)}>
                <div className={style.infoIcon}>
                  <FaInfoCircle />
                </div>
                MaxLTV --%
              </div>
              <div className={style.loanInfoButton} onClick={() => setIsOpen(true)}>
                <div className={style.infoIcon}>
                  <FaInfoCircle />
                </div>
                Liquidation Threshold --%
              </div>
              <div className={style.loanInfoButton} onClick={() => setIsOpen(true)}>
                <div className={style.infoIcon}>
                  <FaInfoCircle />
                </div>
                Liquidation Penalty --%
              </div>
            </div>
          </div>
          <div className={style.vStackItem}>
            <div className={style.sectionHeader}>Your Loan Amount</div>
          </div>
          <div className={style.vStackItem}>
            <div className={style.numberInputContainer}>
              <input
                type="text"
                value={loanAmtStr}
                placeholder="0.0"
                className={style.numberInput}
                {...register('loanAmt', {
                  onChange: (e) => handleNumberInput(e, setLoanAmtStr, setLoanAmt),
                })}
              />
            </div>
          </div>
          <div className={style.vStackItem}>
            <div className={style.collateralHeader}>
              <div className={style.collateralHeaderText}>Your Collateral</div>
              <div className={style.selectCollateralButton} onClick={() => setIsOpen(true)}>
                {collateralButtonText}
                <ChevronDownIcon className={style.dropdownArrow} />
              </div>
              <SelectCollateralModal token0={token0} token1={token1} isOpen={isOpen} setIsOpen={setIsOpen} setCollateralType={setCollateralType} />
            </div>
          </div>
          <div className={style.vStackItem}>
            <div className={style.numberInputContainer}>
              <input
                type="text"
                value={collateralAmt0Str}
                placeholder="0.0"
                className={style.numberInput}
                {...register('collateralAmt0', {
                  onChange: (e) => handleNumberInput(e, setCollateralAmt0Str, setCollateralAmt0),
                })}
              />
            </div>
          </div>
          <div className={style.vStackItem}>
            <div className={collateral1Class}>
              <input
                type="text"
                value={collateralAmt1Str}
                placeholder="0.0"
                className={style.numberInput}
                {...register('collateralAmt1', {
                  onChange: (e) => handleNumberInput(e, setCollateralAmt1Str, setCollateralAmt1),
                })}
              />
            </div>
          </div>
          <div className={style.vStackItem}>
            <div className={style.interestRateText}>Interest Rate --%</div>
          </div>
          <div className={style.vStackItem}>
            <button className={confirmStyle} type="submit">
              {buttonText}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default OpenLoanPage
