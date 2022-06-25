import type { ComponentStyleConfig } from '@chakra-ui/theme'
import { theme } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
    sizes: {
        tiny: {
            fontSize: '8px',
            px: 1, // <-- px is short for paddingLeft and paddingRight
            py: 1, // <-- py is short for paddingTop and paddingBottom
        }
    },
    variants: {
        loanInfo: {
            bg: '#004346',  
            color: '#e2e8f0'
        },
        confirmGrey: {
            w: '100%',
            borderRadius: '2xl',
            bg: '#274060',  
            color: '#6B7280'
        },
        insuffBal: {
            w: '100%',
            borderRadius: '2xl',
            bg: '#FF6663',  
            color: '#e2e8f0'
        },
        confirmGreen: {
            w: '100%',
            borderRadius: '2xl',
            bg: '#69DC9E',  
            color: '#e2e8f0'
        },
        select: {
            bg: '#274060',  
            color: '#e2e8f0'
        },
    },
}

export const FormLabel: ComponentStyleConfig = {
    variants: {
        openLoan: {
            w:'100%',
            color:'#e2e8f0'
        },
        openLoanRight: {
            w:'100%',
            color:'#e2e8f0',
            float: 'right'
        },
        openLoanFit: {
            color:'#e2e8f0'
        }
      },
}

export const Text: ComponentStyleConfig = {
    variants: {
        loanInfoRight: {
            color: '#e2e8f0',
            display: 'inline-block',
            textAlign: 'right'
        }
    },
}

export const NumberInput: ComponentStyleConfig = {
    variants: {
        openLoan: (props) => ({
            ...theme.components.NumberInput.variants.outline(props),
            field: {
                ...theme.components.NumberInput.variants.outline(props).field,
                color:'#e2e8f0',
              },
          })
    }
}