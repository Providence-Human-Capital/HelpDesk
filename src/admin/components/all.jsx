import React, { useEffect, useState } from 'react'
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
    useToast,
    Tag,
    Text,
    Radio,
    HStack,
    RadioGroup,
    Button
} from '@chakra-ui/react'
import axios from 'axios'
import { CheckIcon } from '@chakra-ui/icons'
import { useQuery, QueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore';
import { useForm } from "react-hook-form"

export default function All({ request }) {
    const [filter, setFilter] = useState([])
    const [selectedRow, setSelectedRow] = useState('')
    const toast = useToast()
    const { register, formState: { errors }, handleSubmit } = useForm()
    const adminRole = useAuthStore((state) => state.auth.user.role)
    const queryClient = new QueryClient({});

    // console.log(adminRole)

    const { data: data, error } = useQuery({
        queryKey: ['all'],
        queryFn: () =>
            axios.get(`http://192.168.10.172:8800/${request}/all`)
                .then(res => res.data)
                .catch((err) => {
                    toast({
                        title: "Error",
                        description: err.response.data,
                        status: "error",
                        duration: 4000,
                        isClosable: true,
                        position: "top-right",
                    });
                })
    })

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

    const filterChoice = (value) => {
        setFilter(value)
    }

    const onSubmit = (data) => {
        // console.log(data)
        console.log(filter)
    }

    const clearFilter = () => {
        queryClient.invalidateQueries({ queryKey: ['all'] })
    }

    return (
        <>
            <Box mt={4}>
                <Text textAlign={'right'}>{data == 0 ? 'No Tickets to display' : data ? 'Count: ' + data.length : null}</Text>

                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                {/* <RadioGroup onChange={filterChoice} value={filter}>
                    <HStack spacing={7}  >
                        <Radio value='hours'>Sort by last 24 hours</Radio>
                        <Radio value='days'>Sort by last 7 days</Radio>
                        <Radio value='month'>Sort by last 30 days</Radio>
                        <Button h={'28px'} bg={'violet'} onClick={onSubmit}>Apply filter</Button>
                        <Button h={'28px'} bg={'aqua'} onClick={clearFilter}>Reset</Button>
                    </HStack>
                </RadioGroup> */}
                {/* </form> */}

                <TableContainer border={'1px solid #4c4c4c'} mt={2} >
                    <Table size={'sm'}>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Name</Th>
                                <Th>Department</Th>
                                <Th>Date</Th>
                                <Th>Description</Th>
                                <Th>Type</Th>
                                <Th>Status</Th>
                                {/* <Th>Action</Th> */}
                            </Tr>
                        </Thead>
                        {" "}
                        {
                            // data.length == [] ?

                            //     <Center mt={4}>There are no tickets.</Center>
                            //     :
                            data?.map(info => (
                                <Tbody className='row' onClick={() => handleRowClick(info.id)} >
                                    <Tr style={{ backgroundColor: selectedRow === info.id ? '#c00000' : '' }} className={selectedRow === info.id ? 'row' : ''}>
                                        <Td>{info.id}</Td>
                                        <Td>{info.name}</Td>
                                        <Td>{info.department}</Td>
                                        <Td>{new Date(info.date).toLocaleDateString('en-GB', options)}</Td>
                                        <Td>{info.description}</Td>
                                        <Td>{info.request_type}</Td>
                                        <Td><Tag variant={'solid'}
                                            colorScheme={info.status === 'pending' ? 'gray' : info.status === 'in-progress' ? 'orange' : 'green'}>
                                            {info.status}
                                        </Tag></Td>
                                    </Tr>
                                </Tbody>
                            ))}
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}
