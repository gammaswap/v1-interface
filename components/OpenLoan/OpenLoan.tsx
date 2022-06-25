import * as React from 'react';
import Tokens, { Token } from '../Tokens'
import { CollateralType } from './CollateralType';
import SelectTokenModal from '../SelectToken/SelectTokenModal';
import SelectCollateralModal from './SelectCollateralModal';
import { useDisclosure } from "@chakra-ui/hooks"
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
} from '@chakra-ui/react';
import {
    FaInfoCircle,
} from 'react-icons/fa';
import {
    ChevronDownIcon
} from '@chakra-ui/icons';

interface OpenLoanProps {
}

const OpenLoan: React.FC<OpenLoanProps> = (props) => {
    const [token0, setToken0] = React.useState<Token>(Tokens[0]);
    const [token1, setToken1] = React.useState<Token>(Tokens[0]);
    const [tokenNumber, setTokenNumber] = React.useState(0);
    const [collateralType, setCollateralType] = React.useState<CollateralType>(CollateralType.None);
    const [collateralButtonText, setCollateralButtonText] = React.useState("Select collateral type");
    const [token0Text, setToken0Text] = React.useState("Select token");
    const [token0Icon, setToken0Icon] = React.useState<React.ReactElement>(<Image h='25px'/>);
    const [token1Text, setToken1Text] = React.useState("Select token");
    const [token1Icon, setToken1Icon] = React.useState<React.ReactElement>(<Image h='25px'/>);
    const [confirmVariant, setConfirmVariant] = React.useState("confirmGrey");
    const [loanAmt, setLoanAmt] = React.useState(0);
    const [collateralAmt0, setCollateralAmt0] = React.useState(0);
    const [collateralAmt1, setCollateralAmt1] = React.useState(0);
    const [showToken1, setShowToken1] = React.useState(false);
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
        console.log("selected token", tokenNumber, token.symbol);
        if (tokenNumber==0) {
            setToken0(token);
            setToken0Text(token.symbol);
            setToken0Icon(<Image mr="5px" boxSize='25px' src={token.imgPath}  />)
        } else {
            setToken1(token);
            setToken1Text(token.symbol);
            setToken1Icon(<Image mr="5px" boxSize='25px' src={token.imgPath} />)
        }
        onCloseSelectToken();
        resetCollateralType();
        validate();
    }

    const handleCollateralSelected = (type: CollateralType) => {
        console.log("selected collateral type", CollateralType[type]);
        setCollateralType(type);
        setCollateralButtonText(getCollateralTypeButtonText(type));
        setShowToken1(type == CollateralType.Both);
        onCloseSelectCollateral();
        validate();
    }

    function onOpenToken0() {
        setTokenNumber(0);
        onOpenSelectToken();
    }

    function onOpenToken1() {
        setTokenNumber(1);
        onOpenSelectToken();
    }

    function getCollateralTypeButtonText(collateralType: CollateralType) {
        switch(collateralType) {
            case CollateralType.None:
                return "Select collateral type";
            case CollateralType.LPToken:
                return "Liquidity pool tokens";
            case CollateralType.Token0:
                return token0.symbol;
            case CollateralType.Token1:
                return token1.symbol;
            case CollateralType.Both:
                return "Both";
            default:
                return "Select collateral type";
        }
        return "";
    }

    function resetCollateralType() {
        setCollateralType(CollateralType.None);
        setCollateralButtonText(getCollateralTypeButtonText(CollateralType.None));
        setConfirmVariant("confirmGrey");
        setShowToken1(false);
        setCollateralAmt1(0);
    }

    function handleConfirmClick() {
        if (!validate()) {
            console.log("invalid inputs");
            return;
        }
        console.log("Confirm values:", token0.symbol, token1.symbol, loanAmt, getCollateralTypeButtonText(collateralType), collateralAmt0, collateralAmt1);
    }

    function validate() {
        if (token0 == token1) {
            console.log("Tokens must be different.");
            setConfirmVariant("confirmGrey");
            return false;
        }
        if (token0Text == "Select token" || token1Text == "Select token" ) {
            console.log("Token must be selected.");
            setConfirmVariant("confirmGrey");
            return false;
        }
        if (collateralType == CollateralType.None) {
            console.log("Collateral must be selected");
            setConfirmVariant("confirmGrey");
            return false;
        }
        if (loanAmt <= 0) {
            console.log("Loan amount must be positive.");
            setConfirmVariant("confirmGrey");
            return false;
        }
        if (collateralAmt0 <= 0) {
            console.log(token0.symbol, "collateral amount must be positive.");
            setConfirmVariant("confirmGrey");
            return false;
        }
        if (collateralType == CollateralType.Both && collateralAmt1 <= 0) {
            console.log(token1.symbol, "collateral amount must be positive.");
            setConfirmVariant("confirmGrey");
            return false;
        }
        console.log("Valid inputs.");
        setConfirmVariant("confirmGreen");
        return true;
    }

    function loanAmtChanged(valString: string, valNum: number) {
        setLoanAmt(valNum);
        validate();
    }
    
    function collateralAmt0Changed(valString: string, valNum: number) {
        setCollateralAmt0(valNum);
        validate();
    }

    function collateralAmt1Changed(valString: string, valNum: number) {
        setCollateralAmt1(valNum);
        validate();
    }

    return (
        <Container>
            <Box m='auto' borderRadius={'2xl'} bg={'#1d2c52'} maxW='420px' boxShadow='dark-lg'>
                <FormControl p='10px 15px 0px 15px' boxShadow='lg'>
                    <VStack>
                        <Heading color={'#e2e8f0'} marginBottom={'25px'}>Open Your Loan</Heading>
                        <FormLabel variant='openLoan'>Select a Token Pair</FormLabel>
                        <Container display='inline-block'>
                            <Container w='50%' display='inline-grid' >
                                <Button id='token0' variant='select' onClick={onOpenToken0} rightIcon={<ChevronDownIcon />} leftIcon={token0Icon}>
                                    {token0Text}
                                </Button>
                            </Container>
                            <Container w='50%' display='inline-grid' >
                                <Button id='token1' variant='select' onClick={onOpenToken1} rightIcon={<ChevronDownIcon />} leftIcon={token1Icon}>
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
                            <NumberInputField/>
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
                            <NumberInputField  />
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
                            <NumberInputField  /> 
                        </NumberInput> : null }
                        <Container p='20px' />
                        <Container textAlign='right'>
                            <Text variant='loanInfoRight' pr='5px'>Interest Rate</Text>
                            <Text variant='loanInfoRight' >--%</Text>
                        </Container>
                        <Container p='0 0 5px 0'>
                            <Button variant={confirmVariant} onClick={handleConfirmClick}>Confirm</Button>
                        </Container>
                    </VStack>
                </FormControl>
            </Box >
        </Container>
    )
}

export default OpenLoan