import { ReactNode } from "react"
import Link from "next/link"
import { usePoolsData } from '../context/PoolsDataContext'
import { PoolData } from '../../.graphclient'

interface LinkWrapperProps {
  children?: ReactNode,
  pathName: string,
  poolData: PoolData
}

export const LinkWrapper = ({ children, pathName, poolData }: LinkWrapperProps) => {
  const { setSelectedPoolData } = usePoolsData()

  const handleSelectedPool = () => {
    setSelectedPoolData(poolData)
  }

  return (
    <Link
      passHref
      href={{
        pathname: pathName,
        query: { poolAddress: poolData.address }
      }}
    >
      <a onClick={handleSelectedPool}>
        {children}
      </a>
    </Link>
  )
}
