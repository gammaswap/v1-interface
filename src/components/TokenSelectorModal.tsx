import React, { Dispatch, SetStateAction, ReactElement, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/solid'
import Tokens, { Token } from './Tokens'
import { notifyError } from '../hooks/useNotification'

const style = {
  modalWrapper: 'relative z-50',
  modalOverlay: 'fixed inset-0 bg-black/50 flex items-center justify-center p-4',
  modal: 'bg-gray-800 rounded-xl max-w-sm max-h-sm p-8 flex flex-col text-white drop-shadow-lg',
  headingContainer: 'flex',
  closeIcon: 'w-7 h-7 ml-auto cursor-pointer',
  modalTitle: 'font-semibold text-xl',
  headingBreak: 'mt-2 opacity-10',
  tokensContainer: 'mt-4 space-y-1 w-64',
  tokenContainer: 'flex text-md hover:bg-gray-700 rounded-lg p-3 cursor-pointer',
  tokenImg: 'w-7 h-7',
  tokenSymbol: 'ml-3 font-semibold',
  tokenBalance: 'ml-auto',
  modalButton: 'border-black border-solid border rounded mx-2 mt-8 py-1 px-2',
}

type ModalProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  setTokenSelected: Dispatch<SetStateAction<Token>>
  otherToken: Token
}

const TokenSelectorModal = ({ isOpen, setIsOpen, setTokenSelected, otherToken }: ModalProps): ReactElement => {
  // headlessUI requires at LEAST one focusable element
  const closeIconRef = useRef(null)

  /** checks for selected token inside modal
   * bubbles up selected token state to parent component
   */
  const handleSelectedToken = (tokenSelected: Token) => {
    if (otherToken.address !== tokenSelected.address) {
      setTokenSelected(tokenSelected)
      setIsOpen(false)
    } else {
      notifyError('Please select a different token')
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as={'div'} onClose={() => setIsOpen(false)} className={style.modalWrapper} initialFocus={closeIconRef}>
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
                <Dialog.Title className={style.modalTitle}>Select a Token</Dialog.Title>
                <XIcon className={style.closeIcon} onClick={() => setIsOpen(false)} ref={closeIconRef} />
              </div>
              <hr className={style.headingBreak}></hr>
              <div className={style.tokensContainer}>
                {Tokens.map((token, index) => {
                  return (
                    <div key={index} className={style.tokenContainer} onClick={() => handleSelectedToken(token)}>
                      <img src={token.imgPath} className={style.tokenImg} />
                      <div className={style.tokenSymbol}>{token.symbol}</div>
                      <div className={style.tokenBalance}>0</div>
                    </div>
                  )
                })}
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default TokenSelectorModal
