import type { NextPage } from 'next'
import Image from 'next/image'
import { FiSettings } from 'react-icons/fi'
import { MdOutlineSwapVert } from 'react-icons/md'
import { BsChevronDown } from 'react-icons/bs'
import TokenSelectorModal from '../../src/components/TokenSelectorModal'
import { useRebalanceHandler } from '../../src/hooks/useRebalanceHandler'
import { SlippageModal } from '../../src/components/Positions/SlippageModal'

const Rebalance: NextPage = () => {
  const {
    tokenAInputVal,
    setTokenAInputVal,
    tokenBInputVal,
    setTokenBInputVal,
    handleTokenInput,
    tokenASelected,
    setTokenASelected,
    tokenBSelected,
    setTokenBSelected,
    isOpen,
    setIsOpen,
    tokenSelected,
    handleTokenSelector,
    isTokenEmpty,
    accountInfo,
    connectWallet,
    isSlippageOpen,
    openSlippage,
    swapTokenInputs,
    rebalance,
  } = useRebalanceHandler()
  const style = {
    wrapper: 'w-screen flex justify-center items-center',
    content: 'bg-textV1-6 w-[30rem] rounded-2xl p-4',
    topBar: 'flex justify-between pb-4',
    topBarHeading: 'text-white',
    swapHeading: 'text-xl',
    topBarSettings: 'text-white text-xl',
    settingSVG: 'cursor-pointer',
    middleBar: 'flex flex-col',
    firstInputBox:
      'bg-primaryV3-2 my-3 rounded-2xl p-6 text-3xl border-2 border-primaryV3-2 hover:border-primaryV3-3 flex justify-between',
    firstInput: 'bg-transparent placeholder:text-textV1-4 outline-none mb-6 w-full text-4xl text-gray-300 mt-4',
    swapIconBox: 'flex justify-center items-center',
    swapIcon: 'text-white text-center text-2xl cursor-pointer',
    secondInputBox:
      'bg-primaryV3-2 my-3 rounded-2xl p-6 text-3xl border-2 border-primaryV3-2 hover:border-primaryV3-3 flex justify-between',
    secondInput: 'bg-transparent placeholder:text-textV1-4 outline-none mb-6 w-full text-4xl text-gray-300 mt-4',
    tokenSelectorContainer: 'items-center w-1/ text-gray-200',
    tokenSelectorContent:
      'w-full h-min flex justify-between items-center bg-gray-700 rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-gray-700/30 hover:bg-gray-900 hover:shadow-gray-900/30',
    tokenSelectorIcon: 'flex items-center',
    tokenSelectorTicker: 'mx-2',
    dropdownArrow: 'w-12 h-8',
    tokenBalance: 'self-end mt-2 text-sm text-gray-300 opacity-50 text-right',
    nonSelectedTokenContainer: 'flex items-center w-2/3 text-gray-200',
    nonSelectedTokenContent:
      'w-full h-min flex justify-center items-center bg-blue-500 rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-blue-600/30',
    bottomBar: 'flex justify-center items-center mt-4',
    swapBtn:
      'w-full rounded-2xl text-white bg-primaryV2-1 py-4 px-6 text-xl font-semibold flex justify-center items-center cursor-pointer border-2 border-blue-400 hover:border-primaryV2-2',
    confirmButton:
      'w-full rounded-2xl text-white bg-primaryV1-7 py-4 px-6 text-xl font-semibold flex justify-center items-center cursor-pointer border-2 border-green-400 hover:border-green-300',
  }
  return (
    <>
      {isSlippageOpen ? <SlippageModal openSlippage={openSlippage} /> : null}
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className={style.topBar}>
            <div className={style.topBarHeading}>
              <p className={style.swapHeading}>Rebalance</p>
            </div>
            <div className={style.topBarSettings}>
              <FiSettings className={style.settingSVG} onClick={openSlippage} />
            </div>
          </div>
          <div className={style.middleBar}>
            <div className={style.firstInputBox}>
              <input
                type="text"
                onChange={(e) => handleTokenInput(e, setTokenAInputVal, setTokenBInputVal)}
                value={tokenAInputVal}
                placeholder="0.0"
                className={style.firstInput}
              />

              {isTokenEmpty(tokenASelected) ? (
                <div className={style.nonSelectedTokenContainer} onClick={() => handleTokenSelector('tokenA')}>
                  <div className={style.nonSelectedTokenContent}>Select Token</div>
                </div>
              ) : (
                <div className={style.tokenSelectorContainer}>
                  <div className={style.tokenSelectorContent} onClick={() => handleTokenSelector('tokenA')}>
                    <div className={style.tokenSelectorIcon}>
                      <Image src={tokenASelected.imgPath} width={32} height={32} />
                    </div>
                    <div className={style.tokenSelectorTicker}>{tokenASelected.symbol}</div>
                    <MdOutlineSwapVert className={style.dropdownArrow} />
                  </div>
                  <div className={style.tokenBalance}>Balance: {0}</div>
                </div>
              )}
            </div>
            <div className={style.swapIconBox}>
              <MdOutlineSwapVert onClick={swapTokenInputs} className={style.swapIcon} />
            </div>
            <div className={style.secondInputBox}>
              <input
                type="text"
                onChange={(e) => handleTokenInput(e, setTokenBInputVal, setTokenAInputVal)}
                value={tokenBInputVal}
                placeholder="0.0"
                className={style.secondInput}
              />
              {isTokenEmpty(tokenBSelected) ? (
                <div className={style.nonSelectedTokenContainer} onClick={() => handleTokenSelector('tokenB')}>
                  <div className={style.nonSelectedTokenContent}>Select Token</div>
                </div>
              ) : (
                <div className={style.tokenSelectorContainer}>
                  <div className={style.tokenSelectorContent} onClick={() => handleTokenSelector('tokenB')}>
                    <div className={style.tokenSelectorIcon}>
                      <Image src={tokenBSelected.imgPath} width={32} height={32} />
                    </div>
                    <div className={style.tokenSelectorTicker}>{tokenBSelected.symbol}</div>
                    <MdOutlineSwapVert className={style.dropdownArrow} />
                  </div>
                  <div className={style.tokenBalance}>Balance: {0}</div>
                </div>
              )}
            </div>
          </div>

          <div className={style.bottomBar}>
            {accountInfo?.address ? (
              <button className={style.confirmButton} onClick={() => rebalance()}>
                Rebalance
              </button>
            ) : (
              <button className={style.swapBtn} onClick={() => connectWallet()}>
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>

      <TokenSelectorModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setTokenSelected={tokenSelected === 'tokenA' ? setTokenASelected : setTokenBSelected}
        secondToken={tokenSelected === 'tokenA' ? tokenBSelected : tokenASelected}
      />
    </>
  )
}

export default Rebalance
