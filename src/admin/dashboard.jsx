import React from 'react'
import Navbar from './navbar';
import { Box, Center, Container, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <Box bg={'black'} color={'white'} minH={'94vh'}>
                <Container maxW={'5xl'} pt={10}>
                    <Center>
                        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap="90px" marginTop="28px">
                            <Link to={'/admin/general'}>
                                <Box bg="#5c0101" borderRadius={'12px'} p={'20%'} _hover={{ backgroundColor: 'red', cursor: 'pointer' }}>General Requests</Box></Link>
                            <Box bg="#510101" borderRadius={'12px'} p={'20%'} _hover={{ backgroundColor: 'red', cursor: 'pointer' }}>Hardware Requests</Box>
                            <Link to={'/admin/bread'}>
                                <Box bg="#7b0a0a" borderRadius={'12px'} p={'20%'} _hover={{ backgroundColor: 'red', cursor: 'pointer' }}>Bread Orders</Box>
                            </Link>
                            <Box bg="#a31212" borderRadius={'12px'} p={'20%'} _hover={{ backgroundColor: 'red', cursor: 'pointer' }}>Transfer Requests</Box>
                        </Box>
                    </Center>
                </Container>

            </Box>
        </>
    )
}
