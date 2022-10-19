import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const PoolDetails: NextPage = () => {
  const router = useRouter()
  const poolAddress = router.query.poolAddress as string

  return (
    <div>POOL DETAILS: {poolAddress}</div>
  )
}

export default PoolDetails