import * as React from 'react';
import { Token, Tokens } from './Token';

import {
    Container,
    FormControl,
    List,
    ListItem,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';

interface Props {
    handleTokenSelected: (token: Token, tokenNumber: number) => any;
    isOpen: boolean;
    onClose: () => void;
    tokenNumber: number;
}

const SelectTokenModal: React.FC<Props> = (props) => {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent  borderRadius={'2xl'} bg={'#1d2c52'} boxShadow='dark-lg'>
                <ModalHeader color={'#e2e8f0'} >Select a token</ModalHeader>
                <ModalCloseButton color={'#e2e8f0'} />
                <ModalBody>
                    <FormControl >
                        <List color={'#e2e8f0'} fontSize={'md'} fontWeight={'semibold'} >
                            {Tokens.map((token) => (
                                <ListItem cursor="pointer" key={token.symbol} display='flex' p={1} onClick={() => props.handleTokenSelected(token, props.tokenNumber)}> 
                                    <Container p={0} w='80px'><img src={token.iconPath} /></Container>
                                    <Container >{token.symbol}</Container> 
                                    <Container textAlign='right'>0</Container> 
                                </ListItem>
                            ))}
                        </List>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default SelectTokenModal