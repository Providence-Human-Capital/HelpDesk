import React, { useState } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    FormControl,
    FormLabel,
    RadioGroup,
    Stack,
    Radio,
    CheckboxGroup,
    Checkbox,
    Textarea,
    Button,
    Input,
    Heading,
    Box,
    VStack,
    HStack,
    Container,
    Text,
    Flex,
    Center,
    Divider,
    Spinner,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import axios from "axios";
// import Loader from './Loader';

export default function email() {

    const [domain, setDomain] = useState([]);
    const [reason, setReason] = useState('');
    const [errorDiv, setErrorDiv] = useState(false) // error message from frontend validation
    const [errorText, setErrorText] = useState('')  // text based on the error
    const [loading, setLoading] = useState(false) // loading circle when user has submitted their id

    const toast = useToast()

    const DomainChoice = (value) => {
        setDomain(value);
    };

    // const data = {
    //     domain,
    //     reason
    // }

    // const handleSubmit = () => {
    //     setErrorDiv(false)
    //     setLoading(true)

    //     if (Validation()) {
    //         axios.post('http://localhost:8888/request/email', data)
    //             .then((res) => {
    //                 toast({
    //                     title: 'Your request has been sent',
    //                     description: 'Looks good',
    //                     status: 'success',
    //                     duration: 4000,
    //                     isClosable: true,
    //                     position: 'top-right'
    //                 })
    //                 console.log(res.data)
    //             })
    //             .catch((err) => {
    //                 toast({
    //                     title: 'Error sending request',
    //                     description: 'Looks good',
    //                     status: 'error',
    //                     duration: 4000,
    //                     isClosable: true,
    //                     position: 'top-right'
    //                 })
    //                 console.log(err)
    //             })
    //             .finally(() => {
    //                 setLoading(false)
    //             })
    //     }
    // };

    // const Validation = () => {
    //     if (/script|<|>/i.test(reason)) {
    //         setErrorDiv(true)
    //         setErrorText('You have entered dangerous scripts')
    //     }
    //     else if (domain.length === 0) {
    //         setErrorDiv(true)
    //         setErrorText('Please select a domain')
    //     }
    //     else if (!reason.trim()) {
    //         setErrorDiv(true)
    //         setErrorText('You have not specified your reason')
    //     }
    //     else {
    //         return true
    //     }
    // }

    const errorMessage = errorDiv ?
        <div style={{ color: "red", fontSize: "18px" }}>{errorText}</div>
        : '';

    return (
        <>
            <VStack align="start" mt='6'>
                <Text mb={4} fontSize={{ md: "3xl", base: "2xl" }}>Frequently Asked Questions</Text>

                
                <FormControl id="name">
                <FormLabel htmlFor='name'>Search FAQs:</FormLabel>
                <Input id='name' type='name' placeholder="Search Here"  mb="5" w={"50%"} />
                <Stack spacing={4} />
                      
                    <Text mt={"5"} as='u' fontSize={{ md: 'xl' }} >Scanner configuration</Text>
                    <Text>
                        1. Find the IP address of the scanner you want to use <br />
                        2.
                    </Text>

                    
                </FormControl>

                <FormControl isRequired id="reason" mt={6}>
                    <Text as='u' fontSize={{ md: 'xl' }}>Purpose for Email</Text>
                    <Textarea
                        placeholder="Enter your reason here..."
                        size="md"
                        onChange={(e) => setReason(e.target.value)}
                        // value={reason}
                        focusBorderColor='green'
                        borderColor={'#bdbdbd'}
                        mt='2'
                    />
                </FormControl>
                {/* {errorMessage} */}

                {/* {loading ? <Loader /> : */}
                <Button colorScheme="green" mt={4} mb='10'>
                    Submit Email Requisition
                </Button>
                {/* } */}
            </VStack>
        </>
    )
}
