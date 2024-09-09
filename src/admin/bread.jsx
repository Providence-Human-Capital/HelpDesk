import React, { useState, useEffect } from 'react'
import Navbar from './navbar'
import {
    Box, Center, Container, Text, Flex, Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from "react-hook-form"

export default function AdminBread() {
    const [disabled, setDisabled] = useState(true)
    const { register, formState: { errors }, handleSubmit } = useForm()
    const { isOpen, onOpen, onClose } = useDisclosure()
    let { data: breadPrice, error } = useQuery({
        queryKey: ['bread'],
        queryFn: () =>
            axios.get('http://localhost:8888/bread/price')
                .then(res => res.data)
                .catch((err) => {
                    toast({
                        title: "Error",
                        description: err.response.data || 'An error occurred',
                        status: "error",
                        duration: 4000,
                        isClosable: true,
                        position: "top-right",
                    });
                })
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <>
            <Navbar />
            <Box bg={'black'} minH={'93vh'} color={'white'} >
                <Container pt={8} maxW='95vw'>
                    <Center>
                        <Text fontSize={'lg'} as={'u'}>Bread Orders </Text>
                    </Center>


                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Flex p={9}>
                            <Box mt={2} mr={3}>Current Bread Price ($):</Box>
                            {breadPrice ?
                                <Input w={'10%'}
                                    type='number'
                                    {...register('breadPrice')}
                                    defaultValue={breadPrice[0].unit_price}
                                    focusBorderColor='#FF0000'
                                    disabled={disabled ? 'disabled' : null}
                                />
                                :
                                null
                            }
                        </Flex>

                        <Box pl={9}>
                            <Button onClick={() => setDisabled(!disabled)} colorScheme={disabled ? 'orange' : 'red'}>
                                {disabled ? 'Change Price' : 'Cancel'}
                            </Button>

                            {disabled ? null :
                                <Box mt={2}>
                                    <Button colorScheme='blue' onClick={onOpen}>Update Price</Button>
                                </Box>
                            }
                        </Box>

                        <Modal isOpen={isOpen} onClose={onClose} isCentered >
                            <ModalOverlay />
                            <ModalContent bg={"#101010"} border={"1px solid white"}
                                color={"white"}>
                                <ModalHeader>NOTICE!!!!</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    You are about to change the unit price of bread, this is going to affect orders and deductions
                                </ModalBody>

                                <ModalFooter>
                                    <Button colorScheme='blue' type="submit" mr={3}>Update Price</Button>
                                    <Button colorScheme='red' onClick={onClose}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </form>
                </Container>
            </Box>
        </>
    )
}
