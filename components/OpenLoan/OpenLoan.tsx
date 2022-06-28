import * as React from 'react'
import { useState, useEffect, useContext } from 'react'
import Tokens, { Token } from '../Tokens'
import { CollateralType } from './CollateralType'
import SelectTokenModal from '../SelectToken/SelectTokenModal'
import SelectCollateralModal from './SelectCollateralModal'
import { useDisclosure } from "@chakra-ui/hooks"
import { WalletContext } from '../../context/WalletContext'
// import Factory from '../../abis/Factory.json'
import PositionMgr from '../../abis/PositionManager.json'
import IUniswapV2Pair from '../../abis/IUniswapV2Pair.json'
import { ethers, Contract, BigNumber, constants } from 'ethers'
import { useForm } from 'react-hook-form'
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
    Image,
    NumberInput,
    NumberInputField,
} from '@chakra-ui/react'
import {
    FaInfoCircle,
} from 'react-icons/fa'
import {
    ChevronDownIcon
} from '@chakra-ui/icons'

const OpenLoan = () => {
    const { provider, accountInfo } = useContext(WalletContext)
    const [token0, setToken0] = useState<Token>(Tokens[0])
    const [token1, setToken1] = useState<Token>(Tokens[0])
    const [tokenNumber, setTokenNumber] = useState<number>(0)
    const [collateralType, setCollateralType] = useState<CollateralType>(CollateralType.None)
    const [collateralButtonText, setCollateralButtonText] = useState<string>("Select collateral type")
    const [token0Text, setToken0Text] = useState<string>("Select token")
    const [token0Icon, setToken0Icon] = useState<React.ReactElement>(<Image h='25px'/>)
    const [token1Text, setToken1Text] = useState<string>("Select token")
    const [token1Icon, setToken1Icon] = useState<React.ReactElement>(<Image h='25px'/>)
    const [confirmVariant, setConfirmVariant] = useState<string>("confirmGrey")
    const [loanAmt, setLoanAmt] = useState<number>(0)
    const [collateralAmt0, setCollateralAmt0] = useState<number>(0)
    const [collateralAmt1, setCollateralAmt1] = useState<number>(0)
    const [showToken1, setShowToken1] = useState<boolean>(false)
    const [posManager, setPosManager] = useState<Contract | null>(null)
    const { register, handleSubmit } = useForm()
    const [posId, setPosId] = useState("")
    const [pos, setPos] = useState({})
    const [uniPrice, setUniPrice] = useState<string>("0")
    const [ balInTokB, setBalInTokB] = useState<string>("0")
    
    useEffect(() => {
        if (!provider) {
            console.log("Please connect wallet.")
            return
        }
        
        var signer = provider.getSigner()
        console.log("provider set and seen in openloan:", provider, accountInfo?.address)
        console.log("signer set and seen in openloan:", signer, accountInfo?.address)
    }, [provider])

    function sqrt(y: any){
        let z
        if (y.gt(3)) {
            z = y
            let x = (y.div(2)).add(1)
            while (x.lt(z)) {
                z = x
                x = ((y.div(x)).add(x)).div(2)
            }
        } else if (!y.isZero()) {
            z = BigNumber.from(1)
        }
        return z
    }

    useEffect(() => {
        async function fetchData() {
            console.log("Borrow.fetchData() >>")
            console.log(posManager)
            if (!posManager) {
                return
            }

            const positionCount = await posManager.positionCountByOwner(accountInfo?.address)
            console.log("positionCount >>")
            console.log(positionCount)
            console.log(posManager)
            const positions = await posManager.getPositionsByOwner(accountInfo?.address)
            console.log("positions >>")
            console.log(positions)
            if(positionCount <= 0) {
                return
            }
            
            const position = await posManager.positions(positionCount)
            console.log("position() >>")
            console.log(position)
            setPos(position)
            setPosId(positionCount.toString())
            const uniPair = position.uniPair
            console.log("uniPair >> ")
            console.log(uniPair)
            if (!provider) {
                return
            }

            const uniPairContract = new ethers.Contract(uniPair, IUniswapV2Pair.abi, provider)
            const reserves = await uniPairContract.getReserves()
            console.log("reserves >>")
            console.log(reserves.reserve0)
            console.log(reserves.reserve1)
            const price = BigNumber.from(reserves.reserve1).mul(BigNumber.from(10).pow(18)).div(reserves.reserve0)
            console.log("Borrow.price >>")
            console.log(price.toString())
            setUniPrice(price.toString())
            const _uniPrice = BigNumber.from(price.toString())

            if(_uniPrice.lte(constants.Zero)){
                return
            }
            console.log('set balance in tokB')
            const ONE = BigNumber.from(10).pow(18)
            console.log("herer xxx0")
            const squarePrice = sqrt(_uniPrice.mul(ONE))
            console.log("herer xxx1")
            const squarePrice2 = BigNumber.from(squarePrice.toString())
            console.log("herer xxx2")
            const posLiquidity = BigNumber.from(position.liquidity.toString())
            const bal = (squarePrice2.mul(posLiquidity).div(ONE)).mul(2)
            console.log("herer xxx3")
            console.log("bal >> " + bal.toString())
            setBalInTokB(ethers.utils.formatEther(bal))
            console.log("herer xxx4")
        }
        fetchData()
    }, [posManager])

    useEffect(() => {
        resetCollateralType()
        console.log("before validate", token0, token1)
        validate()
        lookupPairAddress()
    }, [token0, token1])

    const { 
        isOpen: isOpenSelectToken, 
        onOpen: onOpenSelectToken, 
        onClose: onCloseSelectToken 
    } = useDisclosure()
    const { 
        isOpen: isOpenSelectCollateral, 
        onOpen: onOpenSelectCollateral, 
        onClose: onCloseSelectCollateral
    } = useDisclosure()

    const handleTokenSelected = (token: Token, tokenNumber: number) => {
        console.log("selected token", tokenNumber, token.symbol)
        if (tokenNumber==0) {
            setToken0(token)
            setToken0Text(token.symbol)
            setToken0Icon(<Image mr="5px" boxSize='25px' src={token.imgPath}  />)
        } else {
            setToken1(token)
            setToken1Text(token.symbol)
            setToken1Icon(<Image mr="5px" boxSize='25px' src={token.imgPath} />)
        }
        onCloseSelectToken()
    }

    const handleCollateralSelected = (type: CollateralType) => {
        console.log("selected collateral type", CollateralType[type])
        setCollateralType(type)
        setCollateralButtonText(getCollateralTypeButtonText(type))
        setShowToken1(type == CollateralType.Both)
        onCloseSelectCollateral()
        validate()
    }

    function onOpenToken0() {
        setTokenNumber(0)
        onOpenSelectToken()
    }

    function onOpenToken1() {
        setTokenNumber(1)
        onOpenSelectToken()
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

    function handleConfirmClick(data: any) {
        if (!validate()) {
            console.log("invalid inputs")
            return
        }

        console.log(token0, token1, data)
    }

    function validate() {
        if (token0 == token1) {
            console.log("Tokens must be different.", token0, token1)
            setConfirmVariant("confirmGrey")
            return false
        }
        if (token0Text == "Select token" || token1Text == "Select token" ) {
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
        // if (!depositPool) {
        //     console.log("deposit pool not set")
        //     setConfirmVariant("confirmGrey")
        //     return false
        // }
        console.log("Valid inputs.")
        setConfirmVariant("confirmGreen")
        return true
    }

    function loanAmtChanged(valString: string, valNum: number) {
        setLoanAmt(valNum)
        validate()
    }

    function lookupPairAddress() {
        if (token0 != token1 && token0Text != "Select token" && token1Text != "Select token") {
            var address = "0xC6CB7f8c046756Bd33ad6b322a3b88B0CA9ceC1b"

            //TODO: when the factory is available need to call it to get the pair's pool address to set

            if (provider) {
                setPosManager(new ethers.Contract(address, PositionMgr.abi, provider))
            } else {
                console.log("Please connect wallet")
            }
        }
    }

    function collateralAmt0Changed(valString: string, valNum: number) {
        setCollateralAmt0(valNum)
        validate()
    }

    function collateralAmt1Changed(valString: string, valNum: number) {
        setCollateralAmt1(valNum)
        validate()
    }

    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <Container>
            <Box m='auto' borderRadius={'2xl'} bg={'#1d2c52'} maxW='420px' boxShadow='dark-lg'>
                <form onSubmit={handleSubmit(handleConfirmClick)}>
                    <FormControl p='10px 15px 0px 15px' boxShadow='lg'>
                        <VStack>
                            <Heading color={'#e2e8f0'} marginBottom={'25px'}>Open Your Loan</Heading>
                            <FormLabel variant='openLoan'>Select a Token Pair</FormLabel>
                            <Container display='inline-block'>
                                <Container w='50%' display='inline-grid' >
                                    <Button id='token0' variant='select' onClick={onOpenToken0} rightIcon={<ChevronDownIcon />} leftIcon={token0Icon} >
                                        {token0Text}
                                    </Button>
                                </Container>
                                <Container w='50%' display='inline-grid' >
                                    <Button id='token1' variant='select' onClick={onOpenToken1} rightIcon={<ChevronDownIcon />} leftIcon={token1Icon} >
                                        {token1Text}
                                    </Button>
                                </Container>
                                <SelectTokenModal handleTokenSelected={handleTokenSelected} isOpen={isOpenSelectToken} onClose={onCloseSelectToken} tokenNumber={tokenNumber}></SelectTokenModal>
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
    )
}

export default OpenLoan