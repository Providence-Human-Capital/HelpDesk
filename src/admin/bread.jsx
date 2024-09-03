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
} from '@chakra-ui/react'

export default function Bread() {
    return (
        <>
            <Navbar />
            <Box bg={'black'} minH={'93vh'} color={'white'} >
                <Container pt={8} maxW='95vw'>
                    <Center>
                        <Text fontSize={'lg'} as={'u'}>Bread Orders</Text>
                    </Center>

                    gfd
                </Container>
            </Box>
        </>
    )
}
