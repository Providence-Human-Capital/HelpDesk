// src/App.js or src/Form.js
import React from 'react';
import {
    ChakraProvider,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    Button,
    Container,
    useToast,
    Text,
    Box
} from '@chakra-ui/react';
import { useForm } from "react-hook-form"
import axios from 'axios'
import Loader from './loader';
import { useState } from 'react';


export default function general() {
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    const toast = useToast()
    const [loading, setLoading] = useState(false)

    const onSubmit = (data) => {
        setLoading(true)
        axios.post('http://localhost:8888/general/add', data)
            .then((res) => {
                console.log(res.data)
                toast({
                    title: "Your request has been successfully sent",
                    description: "You will hear from us soon",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                    position: "top-right",
                });

                reset({
                    name: '',
                    department: '',
                    description: '',
                    type: '',
                    anydesk: '',
                })
            })
            .catch((err) => {
                console.log(err)
                toast({
                    title: "Error sending request",
                    description: err.response.data || "There was a problem processing your request, you might need to contact IT",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    position: "top-right",
                });
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Container maxW="1100px" mt={1}>
            <VStack spacing={4} align="stretch">
                <Text fontSize={{ md: "3xl", base: "2xl" }} mt={5}>General Request Form</Text>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl id="name">
                        <FormLabel as='u'>Full Name</FormLabel>
                        <Input type="text"
                            placeholder="Enter your full name"
                            borderColor={'#bdbdbd'}
                            focusBorderColor='lime'
                            {...register('name', { minLength: { value: 4, message: 'Your name is too short' } })}
                            aria-invalid={errors.name ? "true" : "false"}
                            isRequired
                        />
                    </FormControl>
                    <FormControl id="department" mt={4}>
                        <FormLabel as='u'>Department</FormLabel>
                        <Select placeholder="Select your department" borderColor={'#bdbdbd'} focusBorderColor='whatsapp' {...register('department')} isRequired>
                            <option value="Admin">Admin</option>
                            <option value="Driver">Driver</option>
                            <option value="Employee Benefits">Employee Benefits</option>
                            <option value="Filing">Filing</option>
                            <option value="Finance">Finance</option>
                            <option value="General Hand">General Hand</option>
                            <option value="Health & Wellness">Health & Wellness</option>
                            <option value="IT">IT</option>
                            <option value="Learning & development">Learning & Development</option>
                            <option value="Loans">Loans</option>
                            <option value="Logistics">Logistics</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Payroll">Payroll</option>
                            <option value="Pensions">Pensions</option>
                            <option value="Pro canteen">Pro Canteen</option>
                            <option value="Pro kleen">Pro Kleen</option>
                            <option value="Staffing solutions">Staffing Solutions</option>
                            <option value="Other">Other</option>
                        </Select>
                    </FormControl>
                    <FormControl id="request-type" mt={4}>
                        <FormLabel as='u'>Request Type</FormLabel>
                        <Select placeholder="Select request type" borderColor={'#bdbdbd'} focusBorderColor='whatsapp' {...register('type')} isRequired>
                            <option value="network">Network</option>
                            <option value="printer">Printer</option>
                            <option value="scanner">Scanner</option>
                            <option value="email">Office/ Email</option>
                            <option value="other">Other</option>
                        </Select>
                    </FormControl>
                    <FormControl id="description" mt={4}>
                        <FormLabel as='u'>Request Description</FormLabel>
                        <Textarea placeholder="Enter a description"
                            borderColor={'#bdbdbd'}
                            focusBorderColor='lime'
                            {...register('description', { minLength: { value: 10, message: 'Please enter a longer description' } })}
                            aria-invalid={errors.description ? "true" : "false"}
                            isRequired
                        />
                    </FormControl>
                    {/* <FormControl id="anydesk-id" mt={3}>
                        <FormLabel as='u'>Anydesk ID</FormLabel>
                        <Input type="text"
                            placeholder="Enter your Anydesk ID"
                            borderColor={'#bdbdbd'}
                            focusBorderColor='lime'
                            {...register('anydesk')}
                            aria-invalid={errors.anydesk ? "true" : "false"}
                            isRequired

                        />
                    </FormControl> */}

                    <Box mt={5}>
                        {errors.name && <p role="alert" style={{ color: "red" }}>{errors.name.message}</p>}
                        {/* {errors.department && <p role="alert" style={{ color: "red" }}>{errors.department.message}</p>} */}
                        {/* {errors.nationalId && <p role="alert" style={{ color: "red" }}>{errors.nationalId.message}</p>} */}
                        {errors.description && <p role="alert" style={{ color: "red" }}>{errors.description.message}</p>}
                        {errors.anydesk && <p role="alert" style={{ color: "red" }}>Please enter your AnyDesk ID</p>}
                    </Box>

                    {loading ?
                        <Loader />
                        :
                        <Button colorScheme="green" mt={4} mb='10' type="submit">
                            Submit Request
                        </Button>
                    }




                </form>
            </VStack>
        </Container>
    );
}
