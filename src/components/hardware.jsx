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

export default function hardware() {
    const [selectedHardware, setSelectedHardware] = useState([]);
    const [selectedSoftware, setSelectedSoftware] = useState([]);
    const [reason, setReason] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');
    const [errorDiv, setErrorDiv] = useState(false) // error message from frontend validation
    const [errorText, setErrorText] = useState('')  // text based on the error
    const [loading, setLoading] = useState(false) // loading circle when user has submitted their id

    const toast = useToast()

    const handleHardwareChange = (value) => {
        setSelectedHardware(value);
    };

    const handleSoftwareChange = (value) => {
        setSelectedSoftware(value);
    };

    const data = {
        selectedHardware,
        selectedSoftware,
        reason
    }

    // const handleSubmit = () => {
    //     setErrorDiv(false)
    //     setLoading(true)

    //     if (Validation()) {
    //         axios.post('http://localhost:8888/request/hardware', data)
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
    //     if (/script|<|>/i.test(reason) || /script|<|>/i.test(additionalDetails)) {
    //         setErrorDiv(true)
    //         setErrorText('You have entered dangerous scripts')
    //     }
    //     else if (selectedHardware.length === 0 || selectedSoftware.length === 0) {
    //         setErrorDiv(true)
    //         setErrorText('Specify hardware & software')
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
                <Text mb={4} fontSize={{ md: "3xl", base: "2xl" }}>Hardware Requisition Form</Text>

                <FormControl id="name">
                <FormLabel htmlFor='name'>Requested By:</FormLabel>
                <Input id='name' type='name' placeholder="Enter Requester's Full Name"  mb="5" w={"50%"} />

                <FormLabel htmlFor='department'>Department Name:</FormLabel>
                <Input id='department' type='text' placeholder='Enter your Department Name'  mb="5" w={"50%"} />
                </FormControl>
                

                <FormControl id="hardware">
                    <Text as='u' fontSize={{ md: 'xl' }}>Hardware Needed</Text>
                    <CheckboxGroup onChange={handleHardwareChange} value={selectedHardware}>
                        <HStack spacing={4} mt='2' fontSize={{ md: 'xl' }}>
                            <Checkbox value="laptop" borderColor={'#bdbdbd'} colorScheme='green'>Laptop</Checkbox>
                            <Checkbox value="desktop" borderColor={'#bdbdbd'} colorScheme='green'>Desktop</Checkbox>
                            <Checkbox value="printer" borderColor={'#bdbdbd'} colorScheme='green'>Printer</Checkbox>
                            <Checkbox value="mouse" borderColor={'#bdbdbd'} colorScheme='green'>Mouse</Checkbox>
                            <Checkbox value="keyboard" borderColor={'#bdbdbd'} colorScheme='green'>Keyboard</Checkbox>
                            <Checkbox value="adapter" borderColor={'#bdbdbd'} colorScheme='green'>Power Adapter</Checkbox>
                        </HStack>
                    </CheckboxGroup>
                </FormControl>

            {selectedHardware.includes('laptop') || selectedHardware.includes('desktop') ? (
                <FormControl id="software" mt={3}>
                    <Text as='u' fontSize={{ md: 'xl' }}>Software to Install</Text>
                    <CheckboxGroup onChange={handleSoftwareChange} value={selectedSoftware} >
                        <HStack spacing={4} mt='2'>
                            <Checkbox value="Microsoft Office" fontSize={{ md: 'xl' }} borderColor={'#bdbdbd'} colorScheme='green'>Microsoft Office</Checkbox>
                            <Checkbox value="Adobe Acrobat" borderColor={'#bdbdbd'} colorScheme='green'>Adobe Acrobat</Checkbox>
                            <Checkbox value="Google Chrome" borderColor={'#bdbdbd'} colorScheme='green'>Google Chrome</Checkbox>
                            <Checkbox value="Anydesk" borderColor={'#bdbdbd'} colorScheme='green'>Anydesk</Checkbox>
                            <Checkbox value="Printer drivers" borderColor={'#bdbdbd'} colorScheme='green'>Printer drivers</Checkbox>
                            {/* <Checkbox value="Belina" colorScheme='green'>Belina</Checkbox>
                            <Checkbox value="Quick Books" colorScheme='green'>Quick Books</Checkbox>
                            <Checkbox value="Pastel" colorScheme='green'>Pastel</Checkbox> */}
                        </HStack>
                    </CheckboxGroup>
                </FormControl>
            ) : null}

                <FormControl id="reason" mt={6} >
                    <Text as='u' fontSize={{ md: 'xl' }}>Reason for Request</Text>
                    <Textarea
                        placeholder="Enter your reason here..."
                        size="md"
                        onChange={(e) => setReason(e.target.value)}
                        value={reason}
                        borderColor={'#bdbdbd'}
                        focusBorderColor='green'
                        mt='2'
                    />
                </FormControl>

                <FormControl id="additionalDetails" mt={4}>
                    <Text as='u' fontSize={{ md: 'xl' }}>Additional Details</Text>
                    <Textarea
                        placeholder="Any additional details or specifications like quantity..."
                        size="md"
                        onChange={(e) => setAdditionalDetails(e.target.value)}
                        value={additionalDetails}
                        mt='2'
                        borderColor={'#bdbdbd'}
                        focusBorderColor='green'
                    />
                </FormControl>
                {/* {errorMessage} */}

                {/* {loading ? <Loader /> : */}
                {/* onClick={handleSubmit} */}
                <Button colorScheme="green" mt={4} mb='10'>
                    Submit Hardware Requisition
                </Button>
                {/* } */}

            </VStack>
        </>
    )
}
