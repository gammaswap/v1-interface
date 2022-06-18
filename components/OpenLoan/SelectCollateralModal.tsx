import * as React from 'react';
import { Token } from '../SelectToken/Token';
import { CollateralType } from './CollateralType';

import {
    Box,
    Container,
    FormControl,
    Heading,
    List,
    ListItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';

interface SelectCollateralProps {
    token0: Token;
    token1: Token;
    handleCollateralSelected: (type: CollateralType) => any;
    isOpen: boolean;
    onClose: () => void;
}

const SelectCollateralModal: React.FC<SelectCollateralProps> = (props) => {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent  borderRadius={'2xl'} bg={'#1d2c52'} boxShadow='dark-lg'>
                <ModalHeader color={'#e2e8f0'} >Select Collateral Type</ModalHeader>
                <ModalCloseButton color={'#e2e8f0'} />
                <ModalBody>
                        <FormControl>
                            <List color={'#e2e8f0'} fontSize={'md'} fontWeight={'semibold'} cursor="pointer"
                            >
                                <ListItem key={CollateralType.LPToken} display='flex' p={1} onClick={() => props.handleCollateralSelected(CollateralType.LPToken)}> 
                                    Liquidity Pool Tokens
                                </ListItem>
                                <ListItem key={CollateralType.Token0} display='flex' p={1} onClick={() => props.handleCollateralSelected(CollateralType.Token0)}> 
                                    {props.token0.symbol} Token
                                </ListItem>
                                <ListItem key={CollateralType.Token1} display='flex' p={1} onClick={() => props.handleCollateralSelected(CollateralType.Token1)}> 
                                    {props.token1.symbol} Token
                                </ListItem>
                                <ListItem key={CollateralType.Both} display='flex' p={1} onClick={() => props.handleCollateralSelected(CollateralType.Both)}> 
                                    Both Tokens
                                </ListItem>

                            </List>
                        </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default SelectCollateralModal