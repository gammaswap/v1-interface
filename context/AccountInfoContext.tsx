import { useState, createContext, ReactNode, Dispatch, SetStateAction } from 'react'

type AccountInfo = {
    address: string
    balance: string
}

type AccountInfoContextType = {
    accountInfo: AccountInfo | null
    setAccountInfo: Dispatch<SetStateAction<AccountInfo | null>>
}

type AccountInfoProviderProps = {
    children: ReactNode
}

export const AccountInfoContext = createContext({} as AccountInfoContextType)

const AccountInfoProvider = ({ children }: AccountInfoProviderProps) => {
    const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null)

    return (
        <AccountInfoContext.Provider value={{ accountInfo, setAccountInfo }}>
            {children}
        </AccountInfoContext.Provider>
    )
}

export default AccountInfoProvider