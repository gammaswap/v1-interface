import { Dispatch, SetStateAction, ReactElement, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import { CollateralType } from './CollateralType'
import { Token } from '../Tokens'

const style = {
  modalWrapper: "relative z-50",
  modalOverlay: "fixed inset-0 bg-black/50 flex items-center justify-center p-4",
  modal: "bg-gray-800 rounded-xl max-w-sm max-h-sm p-8 flex flex-col text-white drop-shadow-lg",
  headingContainer: "flex",
  closeIcon: "w-7 h-7 ml-auto cursor-pointer",
  modalTitle: "font-semibold text-xl",
  headingBreak: "mt-2 opacity-10",
  tokensContainer: "mt-4 space-y-1 w-64",
  tokenContainer: "flex text-md hover:bg-gray-700 rounded-lg p-3 cursor-pointer",
  tokenImg: "w-7 h-7",
  tokenSymbol: "ml-3 font-semibold",
  tokenBalance: "ml-auto",
  modalButton: "border-black border-solid border rounded mx-2 mt-8 py-1 px-2",
}

type ModalProps = {
  token0: Token
  token1: Token
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setCollateralType: Dispatch<SetStateAction<CollateralType>>
}

const SelectCollateralModal = ({ 
  token0, 
  token1, 
  isOpen, 
  setIsOpen, 
  setCollateralType }: ModalProps): ReactElement => {
  // headlessUI requires at LEAST one focusable element
  const closeIconRef = useRef(null)

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as={"div"} onClose={() => setIsOpen(false)}
      className={style.modalWrapper}
      initialFocus={closeIconRef}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          >
          <div className={style.modalOverlay}>
            <Dialog.Panel className={style.modal}>
              <div className={style.headingContainer}>
                <Dialog.Title className={style.modalTitle}>
                  Select Collateral Type
                </Dialog.Title>
                <XIcon
                  className={style.closeIcon}
                  onClick={() => setIsOpen(false)}
                  ref={closeIconRef}
                  />
              </div>
              <hr className={style.headingBreak}></hr>
              <div className={style.tokensContainer}>
                <div
                  className={style.tokenContainer}
                  onClick={() => setCollateralType(CollateralType.LPToken)}
                  > Liquidity Pool Tokens
                </div>
                <div
                  className={style.tokenContainer}
                  onClick={() => setCollateralType(CollateralType.Token0)}
                  > {token0.symbol} Token
                </div>
                <div
                  className={style.tokenContainer}
                  onClick={() => setCollateralType(CollateralType.Token1)}
                  > {token1.symbol} Token
                </div>
                <div
                  className={style.tokenContainer}
                  onClick={() => setCollateralType(CollateralType.Both)}
                  > Both Tokens
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default SelectCollateralModal