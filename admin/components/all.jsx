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
    Center,
} from '@chakra-ui/react'
import axios from 'axios'
import { CheckIcon } from '@chakra-ui/icons'
import '../../src/App.css'

export default function All() {
    const [data, setData] = useState([])
    const [selectedRow, setSelectedRow] = useState('')

    console.log(selectedRow)
    useEffect(() => {
        axios.get('http://localhost:8800/general/all')
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

    const handleRowClick = (id) => {
        setSelectedRow(id);
    };

    return (
        <>
            <Box mt={4} >

                <TableContainer border={'1px solid #4c4c4c'}>
                    <Table >
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Name</Th>
                                <Th>Department</Th>
                                <Th>Date</Th>
                                <Th>Description</Th>
                                <Th>Type</Th>
                                <Th>Pending</Th>
                                {/* <Th>Action</Th> */}
                            </Tr>
                        </Thead>
                        {data.length == [] ?

                            <Center mt={4}>There are no tickets.</Center>
                            :
                            data.map(info => (
                                <Tbody className='row' onClick={() => handleRowClick(info.id)} >
                                    <Tr style={{ backgroundColor: selectedRow === info.id ? '#c00000' : '' }} className={selectedRow === info.id ? 'row' : ''}>
                                        <Td>{info.id}</Td>
                                        <Td>{info.name}</Td>
                                        <Td>{info.department}</Td>
                                        <Td>{new Date(info.date).toLocaleDateString('en-GB', options)}</Td>
                                        <Td>{info.description}</Td>
                                        <Td>{info.request_type}</Td>
                                        <Td>{info.status}</Td>
                                        {/* <Td><CheckIcon /></Td> */}
                                    </Tr>
                                </Tbody>
                            ))}
                    </Table>
                </TableContainer>
            </Box>
        </>
    )
}
