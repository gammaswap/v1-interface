import type { NextPage } from 'next'
import OpenLoan from '../../components/OpenLoan/OpenLoan'
import { ChakraProvider } from '@chakra-ui/react'
import { 
    extendTheme,
} from '@chakra-ui/react';
import { Button, FormLabel, Text, NumberInput } from '../../components/OpenLoan/OpenLoanStyle'

const theme = extendTheme({
    components: {
        Button,
        FormLabel,
        Text,
        NumberInput
    },
})

const OpenLoanPage: NextPage = () => {
    return (
        <ChakraProvider theme={theme}>
            <OpenLoan />
        </ChakraProvider>
    )
}

export default OpenLoanPage