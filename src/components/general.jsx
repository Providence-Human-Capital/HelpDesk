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
    Text
} from '@chakra-ui/react';
import { useForm } from "react-hook-form"


export default function general() {
    const { register, formState: { errors }, handleSubmit } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <Container maxW="1100px" mt={10}>
            <VStack spacing={4} align="stretch">
                <Text fontSize={{ md: "2xl", base: "xl" }}>General Request Form</Text>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl id="name">
                        <FormLabel as='u'>Name</FormLabel>
                        <Input type="text" placeholder="Enter your name" borderColor={'#bdbdbd'} focusBorderColor='green' {...register('name')} />
                    </FormControl>
                    <FormControl id="department" mt={3}>
                        <FormLabel as='u'>Department</FormLabel>
                        <Input type="text" placeholder="Enter your department" borderColor={'#bdbdbd'} focusBorderColor='green'{...register('department')} />
                    </FormControl>
                    <FormControl id="request-type" mt={3}>
                        <FormLabel as='u'>Request Type</FormLabel>
                        <Select placeholder="Select request type" borderColor={'#bdbdbd'} focusBorderColor='green' {...register('type')}>
                            <option value="network">Network</option>
                            <option value="printer">Printer</option>
                            <option value="scanner">Scanner</option>
                            <option value="email">Office/ Email</option>
                            <option value="other">Other</option>
                        </Select>
                    </FormControl>
                    <FormControl id="description" mt={3}>
                        <FormLabel as='u'>Request Description</FormLabel>
                        <Textarea placeholder="Enter a description" borderColor={'#bdbdbd'} focusBorderColor='green' {...register('description')} />
                    </FormControl>
                    <FormControl id="anydesk-id" mt={3}>
                        <FormLabel as='u'>Anydesk ID</FormLabel>
                        <Input type="text" placeholder="Enter your Anydesk ID" borderColor={'#bdbdbd'} focusBorderColor='green' {...register('anydesk')} />
                    </FormControl>

                    <Button colorScheme="green" mt={4} mb='10' w={'20%'} type="submit">
                        Submit Request
                    </Button>
                </form>
            </VStack>
        </Container>
    );
}
