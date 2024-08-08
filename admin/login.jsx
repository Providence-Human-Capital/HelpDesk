import React from 'react';
import {
    Box,
    Flex,
    Text,
    Avatar,
    Container,
    Center,
    Input,
    VStack,
    Button,
    Img,
    useToast,
} from '@chakra-ui/react';
import WLR from './img/wlr.jpg'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const toast = useToast()
    const navigate = useNavigate();


    const onSubmit = (data) => {
        axios.post('http://localhost:8800/admin/login', data)
            .then((res) => {
                console.log(res.data)
                toast({
                    title: "Welcome Admin!!",
                    description: "This is the way",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                    position: "top-right",
                });
                navigate('/admin/dash')
            })
            .catch((err) => {
                console.log(err)
                toast({
                    title: "Error ",
                    description: "You are not an admin go elsewhere",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    position: "top-right",
                });
            })
    }

    return (
        <>
            <Box bg={'black'} minH={'100vh'} color={'white'}>
                <Container >
                    <Box paddingTop={'30vh'}>

                    </Box>
                    <Center mt={4}>
                        <Text fontSize={'2xl'}>Admin Login</Text>
                    </Center>
                    <Center mt={7}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <VStack spacing={3}>
                                <Input
                                    placeholder='enter username'
                                    {...register('username')}
                                />
                                <Input
                                    placeholder='enter password'
                                    {...register('password')}
                                    type='password'
                                />
                                <Button bg={'red'} color={'white'} type='submit'>
                                    Login
                                </Button>
                            </VStack>
                        </form>
                    </Center>
                </Container>
                <Box textAlign={'right'} marginTop={'27vh'} bottom="0" right="0" position="fixed">
                    <Img src={WLR} h={'64px'} ml="auto" />
                </Box>
            </Box>
        </>
    )
}
