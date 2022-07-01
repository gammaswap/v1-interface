import * as React from 'react'
import { useState, useEffect,  Dispatch } from 'react'
import { Token } from '../Tokens'
import { CollateralType } from './CollateralType'
import SelectCollateralModal from './SelectCollateralModal'
import { useDisclosure } from "@chakra-ui/hooks"
import { FieldValues, useForm } from 'react-hook-form'
import TokenSelectorModal from '../../components/TokenSelectorModal'
import Image from 'next/image'
import {
    Box,
    Container,
    FormControl,
    Heading,
    FormLabel,
    Button,
    ButtonGroup,
    Text,
    VStack,
    NumberInput,
    NumberInputField,
} from '@chakra-ui/react'
import {
    FaInfoCircle,
} from 'react-icons/fa'
import {
    ChevronDownIcon
} from '@chakra-ui/icons'

const style = {
    wrapper: "w-screen flex justify-center items-center",
    content: "bg-gray-900 w-[40rem] rounded-2xl p-4",
    formHeader: "px-2 flex justify-between items-center font-semibold text-xl text-gray-200",
    tokenContainer: "bg-gray-800 my-3 rounded-2xl p-6 text-3xl border-2 border-gray-800 hover:border-gray-600 flex justify-between",
    tokenInput: "bg-transparent placeholder:text-gray-600 outline-none mb-6 w-full text-4xl text-gray-300 mt-4",
    nonSelectedTokenContainer: "flex items-center text-gray-200",
    nonSelectedTokenContent: "w-full h-min flex justify-center items-center bg-blue-500 rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:shadow-blue-600/30",
    tokenSelectorContainer: "flex items-center text-gray-200",
    tokenSelectorContent: "w-full h-min flex justify-between items-center bg-gray-700 rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem] shadow-lg shadow-gray-700/30 hover:bg-gray-900 hover:shadow-gray-900/30",
    tokenSelectorIcon: "flex items-center",
    tokenSelectorTicker: "mx-2",
    dropdownArrow: "w-12 h-8",
    invalidatedButton: "disabled my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center text-gray-600 mt-8 border-2 border-gray-700",
    confirmButton: "bg-blue-400 my-2 rounded-2xl py-4 px-6 text-xl font-semibold flex justify-center items-center cursor-pointer text-white mt-8 border-2 border-blue-400 hover:border-blue-300"
}

type OpenLoanProps = {
    openLoanHandler: (data: FieldValues) => Promise<void>
    token0: Token
    token1: Token
    setToken0: Dispatch<React.SetStateAction<Token>>
    setToken1: Dispatch<React.SetStateAction<Token>>
}

const OpenLoanView = ({openLoanHandler, token0, token1, setToken0, setToken1}: OpenLoanProps) => {
    const [tokenNumber, setTokenNumber] = useState<number>(0)
    const [collateralType, setCollateralType] = useState<CollateralType>(CollateralType.None)
    const [collateralButtonText, setCollateralButtonText] = useState<string>("Select collateral type")
    const [confirmVariant, setConfirmVariant] = useState<string>("confirmGrey")
    const [loanAmt, setLoanAmt] = useState<number>(0)
    const [collateralAmt0, setCollateralAmt0] = useState<number>(0)
    const [collateralAmt1, setCollateralAmt1] = useState<number>(0)
    const [showToken1, setShowToken1] = useState<boolean>(false)
    const { register, handleSubmit } = useForm()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    
    useEffect(() => {
        resetCollateralType()
        console.log("before validate", token0, token1)
        validate()
    }, [token0, token1])

    const { 
        isOpen: isOpenSelectCollateral, 
        onOpen: onOpenSelectCollateral, 
        onClose: onCloseSelectCollateral
    } = useDisclosure()

    const handleCollateralSelected = (type: CollateralType) => {
        console.log("selected collateral type", CollateralType[type])
        setCollateralType(type)
        setCollateralButtonText(getCollateralTypeButtonText(type))
        setShowToken1(type == CollateralType.Both)
        onCloseSelectCollateral()
        validate()
    }

    function onOpenToken(tokenNumber: number) {
        setTokenNumber(tokenNumber)
        setIsOpen(true)
    }

    function getCollateralTypeButtonText(collateralType: CollateralType) {
        switch(collateralType) {
            case CollateralType.None:
                return "Select collateral type"
            case CollateralType.LPToken:
                return "Liquidity pool tokens"
            case CollateralType.Token0:
                return token0.symbol
            case CollateralType.Token1:
                return token1.symbol
            case CollateralType.Both:
                return "Both"
            default:
                return "Select collateral type"
        }
        return ""
    }

    function resetCollateralType() {
        setCollateralType(CollateralType.None)
        setCollateralButtonText(getCollateralTypeButtonText(CollateralType.None))
        setConfirmVariant("confirmGrey")
        setShowToken1(false)
        setCollateralAmt1(0)
    }

    function validate() {
        if (token0 == token1) {
            console.log("Tokens must be different.", token0, token1)
            setConfirmVariant("confirmGrey")
            return false
        }
        if (isTokenEmpty(token1)) {
            console.log("Token must be selected.")
            setConfirmVariant("confirmGrey")
            return false
        }
        if (collateralType == CollateralType.None) {
            console.log("Collateral must be selected")
            setConfirmVariant("confirmGrey")
            return false
        }
        if (loanAmt <= 0) {
            console.log("Loan amount must be positive.")
            setConfirmVariant("confirmGrey")
            return false
        }
        if (collateralAmt0 <= 0) {
            console.log(token0.symbol, "collateral amount must be positive.")
            setConfirmVariant("confirmGrey")
            return false
        }
        if (collateralType == CollateralType.Both && collateralAmt1 <= 0) {
            console.log(token1.symbol, "collateral amount must be positive.")
            setConfirmVariant("confirmGrey")
            return false
        }
        console.log("Valid inputs.")
        setConfirmVariant("confirmGreen")
        return true
    }

    function loanAmtChanged(valString: string, valNum: number) {
        setLoanAmt(valNum)
        validate()
    }

    function collateralAmt0Changed(valString: string, valNum: number) {
        setCollateralAmt0(valNum)
        validate()
    }

    function collateralAmt1Changed(valString: string, valNum: number) {
        setCollateralAmt1(valNum)
        validate()
    }

    function isTokenEmpty(tokenToCheck: Token): boolean {
        return Object.values(tokenToCheck).every(tokenProp => tokenProp === "")
    }

    async function validateBeforeSubmit(data: FieldValues):Promise<void> {
        if (!validate()) {
            return 
        }
        return openLoanHandler(data)
    }

    return (
        <>
            <Container>
                <Box m='auto' borderRadius={'2xl'} bg={'#1d2c52'} maxW='420px' boxShadow='dark-lg'>
                    <form onSubmit={handleSubmit(validateBeforeSubmit)}>
                        <FormControl p='10px 15px 0px 15px' boxShadow='lg'>
                            <VStack>
                                <Heading color={'#e2e8f0'} marginBottom={'25px'}>Open Your Loan</Heading>
                                <FormLabel variant='openLoan'>Select a Token Pair</FormLabel>
                                <Container display='inline-block'>
                                    <Container w='50%' display='inline-grid' >
                                        <div className={style.tokenSelectorContainer}>
                                            <div className={style.tokenSelectorContent} onClick={() => onOpenToken(0)} >
                                                <div className={style.tokenSelectorIcon}>
                                                    <Image src={token0.imgPath} alt="token logo" width={32} height={32}/>
                                                </div>
                                                <div className={style.tokenSelectorTicker}>{token0.symbol}</div>
                                                <ChevronDownIcon className={style.dropdownArrow}/>
                                            </div>
                                        </div>
                                    </Container>
                                    <Container w='50%' display='inline-grid' >
                                        {isTokenEmpty(token1) 
                                            ? (
                                                <div className={style.nonSelectedTokenContainer}>
                                                    <div className={style.nonSelectedTokenContent} onClick={() => onOpenToken(1)} >
                                                        <div className={style.tokenSelectorIcon}>
                                                            <Image src={token0.imgPath} width={0} height={32}/>
                                                        </div>
                                                        Select Token
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className={style.tokenSelectorContainer}>
                                                    <div className={style.tokenSelectorContent} onClick={() => onOpenToken(1)} >
                                                        <div className={style.tokenSelectorIcon}>
                                                            <Image src={token1.imgPath} alt="token logo" width={32} height={32}/>
                                                        </div>
                                                        <div className={style.tokenSelectorTicker}>{token1.symbol}</div>
                                                        <ChevronDownIcon className={style.dropdownArrow}/>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </Container>
                                </Container>
                                <Container textAlign='center'>
                                    <ButtonGroup variant='loanInfo' display='inline-block' size='tiny' >
                                        <Button leftIcon={<FaInfoCircle />}>
                                            <Text pr='5px'>MaxLTV</Text>
                                            <Text >--%</Text>
                                        </Button>
                                        <Button leftIcon={<FaInfoCircle />}>
                                            <Text pr='5px'>Liquidation Threshold</Text>
                                            <Text >--%</Text>
                                        </Button>
                                        <Button leftIcon={<FaInfoCircle />}>
                                        <Text pr='5px'>Liquidation Penalty</Text>
                                            <Text >--%</Text>
                                        </Button>
                                    </ButtonGroup>
                                </Container>
                                <FormLabel variant='openLoan'>Your Loan Amount</FormLabel>
                                <NumberInput 
                                    variant='openLoan' 
                                    w='100%' 
                                    defaultValue={0} 
                                    min={0} 
                                    clampValueOnBlur={true} 
                                    keepWithinRange={true}
                                    onChange={loanAmtChanged}
                                    value={loanAmt}>
                                    <NumberInputField {...register('loanAmt')}/>
                                </NumberInput>
                                <Container display='inline-flex' p='0' m='0'>
                                    <FormLabel variant='openLoanFit' pr='20px' m='0'>Your Collateral</FormLabel>
                                    <Button variant='select' size='tiny' h='20px' rightIcon={<ChevronDownIcon />} onClick={onOpenSelectCollateral}>
                                        <Text ml='4px'>{collateralButtonText}</Text>
                                    </Button>
                                    <SelectCollateralModal 
                                        token0={token0} 
                                        token1={token1} 
                                        handleCollateralSelected={handleCollateralSelected} 
                                        isOpen={isOpenSelectCollateral} 
                                        onClose={onCloseSelectCollateral}
                                    />
                                </Container>
                                <NumberInput 
                                    variant='openLoan' 
                                    w='100%' 
                                    defaultValue={0} 
                                    min={0} 
                                    clampValueOnBlur={true} 
                                    keepWithinRange={true}
                                    onChange={collateralAmt0Changed}
                                    value={collateralAmt0}>
                                    <NumberInputField {...register('collateralAmt0')} />
                                </NumberInput>
                                { showToken1 ? 
                                <NumberInput 
                                    variant='openLoan' 
                                    w='100%' 
                                    defaultValue={0} 
                                    min={0} 
                                    clampValueOnBlur={true} 
                                    keepWithinRange={true}
                                    onChange={collateralAmt1Changed}
                                    value={collateralAmt1}>
                                    <NumberInputField {...register('collateralAmt1')} />
                                </NumberInput> : null }
                                <Container p='20px' />
                                <Container textAlign='right'>
                                    <Text variant='loanInfoRight' pr='5px'>Interest Rate</Text>
                                    <Text variant='loanInfoRight' >--%</Text>
                                </Container>
                                <Container p='0 0 5px 0'>
                                    <Button variant={confirmVariant} type="submit" >Confirm</Button>
                                </Container>
                            </VStack>
                        </FormControl>
                    </form>
                </Box >
            </Container>
            <TokenSelectorModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setTokenSelected={
                tokenNumber === 0
                ? setToken0
                : setToken1
                }
            />
        </>
    )
}

export default OpenLoanView