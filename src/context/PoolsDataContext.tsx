import {
  useState,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction
} from 'react'
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

const PoolsDataProvider = ({ children }: PoolsDataProviderProps) => {
  const [latestPoolsData, setLatestPoolsData]  = useState<Array<PoolData>>([])
  const [selectedPoolData, setSelectedPoolData] = useState<PoolData>({} as PoolData)

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