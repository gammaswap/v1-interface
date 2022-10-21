import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'
import { notifyError } from '../hooks/useNotification'
import { PoolData } from '../../.graphclient'

interface IPoolsDataContext {
  latestPoolsData: PoolData[]
  setLatestPoolsData: Dispatch<SetStateAction<PoolData[]>>
  selectedPoolData: PoolData,
  setSelectedPoolData: Dispatch<SetStateAction<PoolData>>
}

type PoolsDataProviderProps = {
  children?: ReactNode
}

const PoolsDataContext = createContext<IPoolsDataContext>({} as IPoolsDataContext)

const persistSelectedPoolData = (key: string, value: PoolData) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    let message
    if (error instanceof Error) message = error.message
    else message = String(error)

    notifyError(message)
  }
}

const getLatestSelectedPoolData = (key: string, initialValue: PoolData) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : initialValue
  } catch (error) {
    return initialValue
  }
}

const PoolsDataProvider = ({ children }: PoolsDataProviderProps) => {
  const [latestPoolsData, setLatestPoolsData]  = useState<Array<PoolData>>([])
  const [selectedPoolData, setSelectedPoolData] = useState<PoolData>(() => (
    getLatestSelectedPoolData("selectedPoolData", {} as PoolData
  )))

  useEffect(() => {
    persistSelectedPoolData("selectedPoolData", selectedPoolData)
  }, [selectedPoolData])

  const value = {
    latestPoolsData,
    setLatestPoolsData,
    selectedPoolData,
    setSelectedPoolData
  }

  return (
    <PoolsDataContext.Provider value={value}>
      {children}
    </PoolsDataContext.Provider>
  )

}

export default PoolsDataProvider
export const usePoolsData = () => useContext(PoolsDataContext)