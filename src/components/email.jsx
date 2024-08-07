import React, { useState } from 'react'
import {
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
                <Text mb={4} fontSize={{ md: "3xl", base: "2xl" }}>Email Requisition Form</Text>

                
                <FormControl id="name">
                <FormLabel htmlFor='name'>Requested By:</FormLabel>
                <Input id='name' type='name' placeholder="Enter Requester's Full Name"  mb="5" w={"50%"} />

                <FormLabel htmlFor='department'>Department Name:</FormLabel>
                <Input id='department' type='text' placeholder='Enter your Department Name'  mb="5" w={"50%"} />
                <Stack spacing={4} />

                <FormLabel htmlFor='email'>Personal Email Address:</FormLabel>
                <Input id='email' type='text' placeholder='Enter your Personal Email Address'  mb="5" w={"50%"} />
                <Stack spacing={4} />

                    <Text mt={"5"} as='u' fontSize={{ md: 'xl' }} >Select Domain</Text>
                    <RadioGroup onChange={DomainChoice} value={domain}>
                        <VStack spacing={1} mt='2' align='left'>
                            <Radio colorScheme='green' borderColor={'#bdbdbd'} value="providencehumancapital.com">providencehumancapital.com</Radio>
                            <Radio colorScheme='green' borderColor={'#bdbdbd'} value="providencehealth.co.zw">providencehealth.com</Radio>
                            <Radio colorScheme='green' borderColor={'#bdbdbd'} value="staffingsolutions.co.zw">staffingsolutions.com</Radio>
                        </VStack>
                    </RadioGroup>
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
