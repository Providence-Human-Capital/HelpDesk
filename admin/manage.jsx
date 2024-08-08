import React from 'react'
import Navbar from './navbar'
import { Box, Center, Container, HStack, Text, VStack, Button, Input, useToast, } from '@chakra-ui/react';
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Manage() {

    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    const toast = useToast()
    const navigate = useNavigate();


    const onSubmit = (data) => {
        axios.post('http://localhost:8800/admin/add', data)
            .then((res) => {
                console.log(res.data)
                toast({
                    title: "New admin added",
                    description: ".",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                    position: "top-right",
                });

                reset()

                navigate('/admin/dash')
            })
            .catch((err) => {
                console.log(err)
                toast({
                    title: "Error ",
                    description: "more text",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    position: "top-right",
                });
            })
    }

    return (
        <>
            <Navbar />
            <Box bg={'black'} color={'white'} minH={'93vh'}>
                <Container maxW={'2xl'} pt={10}>
                    <Center>
                        <Text fontSize={'xl'}>Admin Management</Text>
                    </Center>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VStack spacing={3} mt={6}>
                            <Input
                                placeholder='enter username'
                                {...register('username')}
                            />
                            <Input
                                placeholder='enter email'
                                {...register('email')}
                            />
                            <Input
                                placeholder='enter password'
                                {...register('password')}
                                type='password'
                            />
                            <Button bg={'red'} color={'white'} type='submit' mt={3}>
                                Add New Admin
                            </Button>
                        </VStack>
                    </form>
                </Container>

            </Box>
        </>
    )
}
