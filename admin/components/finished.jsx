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
    // useDisclosure,
    Button,
    useToast,
    Text,
    Flex
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { RepeatIcon } from '@chakra-ui/icons'
import '../../src/App.css'

export default function Finished() {

    const [data, setData] = useState([])
    const [isReverseOpen, setIsReverseOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [selectedRow, setSelectedRow] = useState('')
    const cancelReverseRef = useRef()
    const toast = useToast()

    useEffect(() => {
        axios.get('http://localhost:8800/general/completed')
            .then((res) => {
                // console.log(res.data)
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

    const onReverseOpen = (ticket) => {
        setSelectedTicket(ticket);
        setIsReverseOpen(true);
    };

    const onClose = () => {
        // setIsOpen(false);
        setIsReverseOpen(false)
        setSelectedTicket(null);
    };

    const handleReversal = () => {
        onClose();

        const update = {
            id: selectedTicket.id,
        }

        axios.put('http://localhost:8800/general/completed/reverse', update)
            .then((res) => {
                // console.log(res.data)
                toast({
                    title: "Ticket has been reversed",
                    description: "Ticket is now back in in-progress",
                    status: "info",
                    duration: 4000,
                    isClosable: true,
                    position: "top-right",
                });
                refresh()
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

    const handleRowClick = (id) => {
        setSelectedRow(id);

        if (selectedRow === id) {
            setSelectedRow('')
        }
    };

    return (
        <>
            <Box mt={4} >

                <TableContainer border={'1px solid #4c4c4c'}>
                    <Table >
                        <Thead >
                            <Tr>
                                <Th >Name</Th>
                                <Th>Department</Th>
                                <Th>Date of Applicaton</Th>
                                <Th>Date Completed</Th>
                                <Th>Description</Th>
                                <Th>Type</Th>
                                <Th>Status</Th>
                                <Th>IT officer</Th>
                                <Th>Reverse</Th>
                            </Tr>
                        </Thead>
                        {data.length == [] ?

                            <Center mt={4}>There are no finished tickets</Center>
                            :
                            data.map(info => (
                                <Tbody className='row' onClick={() => handleRowClick(info.id)} >
                                    <Tr style={{ backgroundColor: selectedRow === info.id ? '#c00000' : '' }} className={selectedRow === info.id ? 'row' : ''}>
                                        <Td>{info.name}</Td>
                                        <Td>{info.department}</Td>
                                        <Td>{new Date(info.date).toLocaleDateString('en-GB', options)}</Td>
                                        <Td>{new Date(info.action_date).toLocaleDateString('en-GB', options)}</Td>
                                        <Td>{info.description}</Td>
                                        <Td>{info.request_type}</Td>
                                        <Td>{info.status}</Td>
                                        <Td>{info.it_officer}</Td>
                                        <Td onClick={() => onReverseOpen(info)} _hover={{ backgroundColor: 'blue' }} style={{ width: '1%' }}><Center><RepeatIcon /></Center></Td>
                                    </Tr>
                                </Tbody>
                            ))}

                        <AlertDialog
                            motionPreset='slideInBottom'
                            leastDestructiveRef={cancelReverseRef}
                            onClose={onClose}
                            isOpen={isReverseOpen}
                            isCentered

                        >
                            <AlertDialogOverlay />

                            <AlertDialogContent bg={'#101010'} border={'1px solid white'} color={'white'}>
                                <AlertDialogHeader>Ticket Reversal?</AlertDialogHeader>
                                <AlertDialogCloseButton />
                                <AlertDialogBody >
                                    {selectedTicket ? (
                                        <>
                                            Are you sure that you want to reverse <Text as={'b'}>{selectedTicket.name}'s</Text> ticket and send back to in-progress??
                                        </>
                                    ) : (
                                        'No ticket selected'
                                    )}
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button ref={cancelReverseRef} onClick={onClose} colorScheme='red'>
                                        No
                                    </Button>
                                    <Button colorScheme='blue' ml={3} onClick={() => {
                                        handleReversal()

                                    }}>
                                        Yes
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}
