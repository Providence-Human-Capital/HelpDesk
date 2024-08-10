import React, { useEffect, useState, useRef } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Center,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useToast,
    Text,
    Button,
    Flex
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { CheckIcon } from '@chakra-ui/icons'
import '../../src/App.css'

export default function Pending() {

    const [data, setData] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [selectedRow, setSelectedRow] = useState('')
    const [, setRefresh] = useState(false);
    const cancelRef = useRef()
    const toast = useToast()

    useEffect(() => {
        axios.get('http://localhost:8800/general/pending')
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
                toast({
                    title: "Error fetching database data",
                    description: "more text",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    position: "top-right",
                });
            })
    }, [])

    const onOpen = (ticket) => {
        setSelectedTicket(ticket);
        setIsOpen(true);
    };

    const onClose = () => {
        setIsOpen(false);
        setSelectedTicket(null);
    };

    const refreshPage = () => {
        // Toggle the state to force a re-render
        setRefresh({});
    };

    const handleRowClick = (id) => {
        setSelectedRow(id);

        if (selectedRow === id) {
            setSelectedRow('')
        }
    };

    const handleUpdate = () => {
        onClose();

        const update = {
            id: selectedTicket.id,
            officer: 'mafaro',
        }

        axios.put('http://localhost:8800/general/pending/update', update)
            .then((res) => {
                console.log(res.data)
                toast({
                    title: "You have now taken ownership of the ticket",
                    description: "Ticket is now in progress",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                    position: "top-right",
                });
            })
            .catch((err) => {
                console.log(err)
                toast({
                    title: "Error sending request",
                    description: "more text",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    position: "top-right",
                });
            })
            .finally(() => {
                refreshPage()
            })
    }

    const options = {
        year: '2-digit',
        month: 'short',
        day: '2-digit',
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
        hour12: false
    }

    return (
        <>
            <Box mt={4}>

                <TableContainer border={'1px solid #4c4c4c'} >
                    <Table >
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Department</Th>
                                <Th>Date of Applicaton</Th>
                                <Th>Description</Th>
                                <Th>Type</Th>
                                <Th>Status</Th>
                                <Th>Own</Th>
                            </Tr>
                        </Thead>
                        {data.length == [] ?

                            <Center mt={4}>There are no new tickets</Center>
                            :
                            data.map(info => (
                                <Tbody className='row' onClick={() => handleRowClick(info.id)} >
                                    <Tr style={{ backgroundColor: selectedRow === info.id ? '#c00000' : '' }} className={selectedRow === info.id ? 'row' : ''}>
                                        <Td>{info.name}</Td>
                                        <Td>{info.department}</Td>
                                        <Td>{new Date(info.date).toLocaleDateString('en-GB', options)}</Td>
                                        <Td>{info.description}</Td>
                                        <Td>{info.request_type}</Td>
                                        <Td>{info.status}</Td>
                                        <Td onClick={() => onOpen(info)} _hover={{ backgroundColor: 'green' }} style={{ width: '1%' }}><Center><CheckIcon /></Center></Td>

                                    </Tr>

                                </Tbody>

                            ))}
                        <AlertDialog
                            motionPreset='slideInBottom'
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                            isOpen={isOpen}
                            isCentered

                        >
                            <AlertDialogOverlay />

                            <AlertDialogContent bg={'#101010'} border={'1px solid white'} color={'white'}>
                                <AlertDialogHeader>Take Ownership?</AlertDialogHeader>
                                <AlertDialogCloseButton />
                                <AlertDialogBody >
                                    {selectedTicket ? (
                                        <>
                                            Are you sure you want to take ownership of <Text as={'b'} >{selectedTicket.name}' s</Text> request??
                                        </>
                                    ) : (
                                        'No ticket selected'
                                    )}
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose} colorScheme='red'>
                                        No
                                    </Button>
                                    <Button colorScheme='green' ml={3} onClick={() => {
                                        handleUpdate()

                                    }}>
                                        Yes
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Table>
                </TableContainer>
            </Box >
        </>
    )
}
