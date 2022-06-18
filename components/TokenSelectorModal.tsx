import React, { Dispatch, SetStateAction, ReactElement } from 'react'
import { Dialog } from '@headlessui/react'

const style = {
    modalWrapper: "relative z-50",
    modalOverlay: "fixed inset-0 bg-black/40 flex items-center justify-center p-4",
    modal: "bg-white rounded max-w-sm max-h-sm p-8",
    modalButton: "border-black border-solid border rounded mx-2 mt-8 py-1 px-2",
}

type ModalProps = {
    isOpen: boolean
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const TokenSelectorModal = ({ isOpen, setIsOpen }: ModalProps): ReactElement => {
    return (
        <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={style.modalWrapper}
        >
            <div className={style.modalOverlay}>
                <Dialog.Panel className={style.modal}>
                    <Dialog.Title>Select a Token</Dialog.Title>
                    <Dialog.Description>
                        Description of dialog contents.
                    </Dialog.Description>
                    <button
                    onClick={() => setIsOpen(false)}
                    className={style.modalButton}
                    >
                        Cancel
                    </button>
                    <button
                    onClick={() => setIsOpen(false)}
                    className={style.modalButton}
                    >
                        Confirm
                    </button>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}

export default TokenSelectorModal