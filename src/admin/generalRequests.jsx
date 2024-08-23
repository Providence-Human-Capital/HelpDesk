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
import All from './components/all'
import Finished from './components/finished'
import Unfinished from './components/unfinished'
import Pending from './components/pending'
import Progress from './components/progress'
import { useParams, useLocation, useNavigate } from "react-router-dom";
import '../App.css'

export default function General() {

    const [showPage, setShowPage] = useState('pending')
    const { request } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (request !== 'general' && request !== 'hardware') {
            navigate('/404')
            return
        }

    }, [])

    //capitalizing the first letter of the params 
    const capitalizedRequest = request.charAt(0).toUpperCase() + request.slice(1)


    let x = 'red'

    return (
        <>
            <Navbar />
            <Box bg={'black'} minH={'93vh'} color={'white'} >
                <Container pt={8} maxW='95vw'>
                    <Center>
                        <Text fontSize={'lg'} as={'u'}>{capitalizedRequest} Requests</Text>
                    </Center>

                    <Flex mt='5' h='7' className='req' fontSize={'sm'}>

                        <Center
                            style={{ width: '100%', borderRight: '2px solid #4c4c4c', borderBottom: `2px solid ${showPage === 'all' ? x : '#4c4c4c'}` }}
                            onClick={() => setShowPage('all')}
                            className='general'

                            p={4}
                        >
                            All</Center>
                        <Center
                            style={{ width: '100%', borderRight: '2px solid #4c4c4c', borderBottom: `2px solid ${showPage === 'pending' ? x : '#4c4c4c'}` }}
                            onClick={() => setShowPage('pending')}
                            className='general'
                            p={4}
                        >
                            Pending</Center>
                        <Center
                            style={{ width: '100%', borderRight: '2px solid #4c4c4c', borderBottom: `2px solid ${showPage === 'progress' ? x : '#4c4c4c'}` }}
                            onClick={() => setShowPage('progress')}
                            className='general'
                            p={4}
                        >
                            In-Progress</Center>
                        <Center
                            style={{ width: '100%', borderRight: '2px solid #4c4c4c', borderBottom: `2px solid ${showPage === 'unfinished' ? x : '#4c4c4c'}` }}
                            onClick={() => setShowPage('unfinished')}
                            className='general'
                            p={4}
                        >
                            Unfinished</Center>
                        <Center
                            style={{ width: '100%', borderBottom: `2px solid ${showPage === 'finished' ? x : '#4c4c4c'}` }}
                            onClick={() => setShowPage('finished')}
                            className='general'
                            p={4}
                        >
                            Finished</Center>

                    </Flex>

                    <Box mt={4} >

                    </Box>

                    {showPage === 'all' ? <All request={request} /> : ''}
                    {showPage === 'pending' ? <Pending request={request} /> : ''}
                    {showPage === 'progress' ? <Progress request={request} /> : ''}
                    {showPage === 'unfinished' ? <Unfinished request={request} /> : ''}
                    {showPage === 'finished' ? <Finished request={request} /> : ''}

                    <Box> .</Box>
                </Container>
            </Box>
        </>
    )
}
