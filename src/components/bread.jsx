import React, { useEffect } from 'react'
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
    Box,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Flex,
    HStack,
    Center,
    Image
} from '@chakra-ui/react';
import { useForm } from "react-hook-form"
import axios from 'axios'
import Loader from './loader';
import { useState } from 'react';
import bread from '../img/breads.webp'

export default function Bread() {
    const { register, formState: { errors }, handleSubmit, reset } = useForm()
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [timeLoading, setTimeLoading] = useState(true)
    const [isWithinTimeFrame, setIsWithinTimeFrame] = useState(false);

    useEffect(() => {
        const checkTimeFrame = () => {
            const currentTime = new Date();

            const startTime = new Date(currentTime);
            startTime.setDate(currentTime.getDate() - currentTime.getDay() + 1); // Move to Monday of this week
            startTime.setHours(8, 0, 0, 0); // Set time to 08:00 AM

            const endTime = new Date(currentTime);
            endTime.setDate(currentTime.getDate() - currentTime.getDay() + 4); // Move to Thursday of this week
            endTime.setHours(15, 30, 0, 0); // Set time to 03:30 PM

            if (currentTime >= startTime && currentTime <= endTime) {
                setIsWithinTimeFrame(true);
            } else {
                setIsWithinTimeFrame(false);
            }

            setTimeLoading(false)
        };

        checkTimeFrame();

        const intervalId = setInterval(checkTimeFrame, 60000);

        return () => clearInterval(intervalId);
    }, [])


    const onSubmit = (data) => {
        setLoading(true)
        axios.post('http://localhost:8888/bread/add', data)
            .then((res) => {
                console.log(res.data)
                toast({
                    title: "You have successfully ordered bread",
                    description: "Your bread will be delivered on Friday, Please make sure to collect!!",
                    status: "success",
                    duration: 7000,
                    isClosable: true,
                    position: "top-right",
                });

                reset({
                    name: '',
                    department: '',
                    white: '',
                    brown: '',
                    wholewheat: '',
                })
            })
            .catch((err) => {
                console.log(err)
                toast({
                    title: "Error sending order",
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

    if (timeLoading) {
        return (
            <Center mt={9}>
                <Loader />
            </Center>
        )
    }

    return (
        <>
            <Container maxW="1100px" mt={10}>

                {isWithinTimeFrame ?

                    <Box>
                        <Center>
                            <Text fontSize={'lg'}>Deadline for ordering bread is Thursday @ 3:30pm</Text>
                        </Center>

                        {/* <Center>Always make sure to collect your bread after ordering</Center> */}
                        <VStack c align="stretch">
                            <Text fontSize={{ md: "xl", base: "xl" }}>Order Bread</Text>



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
                                <FormControl id="department" mt={3}>
                                    <FormLabel as='u'>Department</FormLabel>
                                    <Select placeholder="Select your department" borderColor={'#bdbdbd'} focusBorderColor='whatsapp' {...register('department')} isRequired>
                                        <option value="Admin">Admin</option>
                                        <option value="Employee Benefits">Employee Benefits</option>
                                        <option value="Filing">Filing</option>
                                        <option value="Finance">Finance</option>
                                        <option value="Health & Wellness">Health & Wellness</option>
                                        <option value="IT">IT</option>
                                        <option value="Learning & Development">Learning & Development</option>
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

                                <FormControl>
                                    <FormLabel as='u' mt={4}>Select Loaf Quantity</FormLabel>
                                    <HStack spacing={7} >
                                        <Text>White Bread</Text>
                                        <NumberInput defaultValue={0} min={0} max={20} w={'8%'} borderColor={'#bdbdbd'} focusBorderColor='whatsapp' {...register('white')}>
                                            <NumberInputField />
                                            <NumberInputStepper >
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>

                                        <Text ml={7}>Brown Bread</Text>
                                        <NumberInput defaultValue={0} min={0} max={20} w={'8%'} borderColor={'#bdbdbd'} focusBorderColor='whatsapp' {...register('brown')}>
                                            <NumberInputField />
                                            <NumberInputStepper >
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>

                                        <Text ml={7}>Wholewheat Bread</Text>
                                        <NumberInput defaultValue={0} min={0} max={20} w={'8%'} borderColor={'#bdbdbd'} focusBorderColor='whatsapp' {...register('wholewheat')}>
                                            <NumberInputField />
                                            <NumberInputStepper >
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>

                                    </HStack>
                                </FormControl>

                                {loading ?
                                    <Loader />
                                    :
                                    <Button colorScheme="green" mt={8} mb='10' type="submit">
                                        Order Bread
                                    </Button>
                                }
                            </form>
                        </VStack>
                    </Box>
                    :
                    <Box>
                        <Center >
                            <Text fontSize={{ md: "xl", base: "xl" }} mt={9}>
                                The deadline for ordering bread has passed, you will only be able to order again on Monday at 8am
                            </Text>
                        </Center>

                        <Center>
                            <Image src={bread} h={'40%'} w={'40%'} />
                        </Center>
                    </Box>

                }
            </Container>
        </>
    )
}
