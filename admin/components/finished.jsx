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
    Center
} from '@chakra-ui/react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import '../../src/App.css'

export default function Finished() {

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8800/general/completed')
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
        hour12: false
    }

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
                                <Th>Pending</Th>
                            </Tr>
                        </Thead>
                        {data.length == [] ?

                            <Center mt={4}>There are no finished tickets</Center>
                            :
                            data.map(info => (
                                <Tbody className='row'>
                                    <Tr>
                                        <Td>{info.name}</Td>
                                        <Td>{info.department}</Td>
                                        <Td>{new Date(info.date).toLocaleDateString('en-GB', options)}</Td>
                                        <Td>{new Date(info.action_date).toLocaleDateString('en-GB', options)}</Td>
                                        <Td>{info.description}</Td>
                                        <Td>{info.request_type}</Td>
                                        <Td>{info.status}</Td>
                                    </Tr>
                                </Tbody>
                            ))}
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}
