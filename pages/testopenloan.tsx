import type { NextPage } from 'next'
import OpenLoan from '../components/OpenLoan/OpenLoan'
import { ChakraProvider } from '@chakra-ui/react'

const Testopenloan: NextPage = () => {
    return (
        <ChakraProvider>
            <OpenLoan />
        </ChakraProvider>
    )
}

export default Testopenloan