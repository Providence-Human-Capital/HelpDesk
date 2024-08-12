import React from 'react'
import Navbar from './navbar';
import { Box, Center, Container, HStack } from '@chakra-ui/react';

export default function Dashboard() {
    return (
        <>
            <Navbar />
            <Box bg={'black'} color={'white'} minH={'90vh'}>
                <Container maxW={'2xl'} pt={10}>
                    <Center>
                        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap="90px" marginTop="28px">
                            <Box bg="tomato" borderRadius={'12px'} p={9}>General Requests</Box>
                            <Box bg="brown" borderRadius={'12px'} p={9}>Email Requests</Box>
                            <Box bg="blue" borderRadius={'12px'} p={9}>Transfer Requests</Box>
                        </Box>
                    </Center>
                </Container>

            </Box>
        </>
    )
}
