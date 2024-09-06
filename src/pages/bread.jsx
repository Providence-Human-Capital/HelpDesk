import React, { useEffect } from 'react'
import {
    SimpleGrid,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Grid,
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
    Image,
    Spacer,
    InputRightAddon,
    InputGroup
} from '@chakra-ui/react';
import { useForm } from "react-hook-form"
import axios from 'axios'
import Loader from '../components/loader';
import { useState } from 'react';
import bread from '../img/breads.webp'
import PHC from '../img/PHC_Logo.png'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

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


        // checkBreadPrice()
        return () => clearInterval(intervalId);


    }, [])

    let { data: breadPrice, error } = useQuery({
        queryKey: ['bread'],
        queryFn: () =>
            axios.get('http://localhost:8888/bread/price')
                .then(res => res.data)
                .catch((err) => {
                    toast({
                        title: "Error",
                        description: err.response.data || 'An error occurred',
                        status: "error",
                        duration: 4000,
                        isClosable: true,
                        position: "top-right",
                    });
                })
    })

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
                    empNumber: '',
                    firstname: '',
                    lastname: '',
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
                    description: err.response.data || "There was a problem processing your order",
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

    const handleSort = () => {
        axios.get('http://localhost:8888/bread/month')
            .then((res) => {
                // console.log(res.data)
            })
    }

    return (
        <>
            <Container maxW={"1100px"} mt={5}>

                <Center>
                    <Link to={'https://providencehumancapital.com'} target='_blank'>
                        <Image
                            src={PHC}
                            alt="Company Logo"
                            boxSize="100px"
                            objectFit="contain"
                        />
                    </Link>
                </Center>
                <Center fontSize={'3xl'}>Order Bread</Center>

                {!isWithinTimeFrame ?

                    <Box>
                        <Center>
                            <Text fontSize={'lg'} as={'u'} color='red'>Deadline for ordering bread is Thursday at <b>3:30pm</b></Text>

                        </Center>

                        {/* <Center>Always make sure to collect your bread after ordering</Center> */}
                        {/* {console.log(breadPrice)} */}
                        {breadPrice ?
                            <Center mt={1}>The price for a loaf of bread is {' $' + breadPrice[0].unit_price}</Center>
                            :
                            null}
                        <VStack mt={5} spacing={4} >
                            {/* <Text fontSize={{ md: "xl", base: "xl" }}>Order Bread</Text> */}


                            <form onSubmit={handleSubmit(onSubmit)} >
                                <FormControl id="employeeNumber" >
                                    <FormLabel as='u'>Employee Number</FormLabel>

                                    <Input type="text"
                                        placeholder="Enter your Employee Number"
                                        borderColor={'#bdbdbd'}
                                        focusBorderColor='lime'
                                        {...register('empNumber', { minLength: { value: 4, message: 'Your code is too short' } })}
                                        aria-invalid={errors.name ? "true" : "false"}
                                        w={{ base: '100%', md: '800px' }}
                                        isRequired
                                    />
                                </FormControl>

                                <FormControl id="firstname" mt={5}>
                                    <FormLabel as='u'>First Name</FormLabel>

                                    <Input type="text"
                                        placeholder="Enter your first name"
                                        borderColor={'#bdbdbd'}
                                        focusBorderColor='lime'
                                        {...register('firstname', { minLength: { value: 4, message: 'Your name is too short' } })}
                                        aria-invalid={errors.name ? "true" : "false"}
                                        w={{ base: '100%', md: '800px' }}
                                        isRequired
                                    />
                                </FormControl>

                                <FormControl id="lastname" mt={5}>
                                    <FormLabel as='u'>Last Name</FormLabel>

                                    <Input type="text"
                                        placeholder="Enter your last name"
                                        borderColor={'#bdbdbd'}
                                        focusBorderColor='lime'
                                        {...register('lastname', { minLength: { value: 4, message: 'Your name is too short' } })}
                                        aria-invalid={errors.name ? "true" : "false"}
                                        w={{ base: '100%', md: '800px' }}
                                        isRequired
                                    />
                                </FormControl>

                                <FormControl id="department" mt={5}>
                                    <FormLabel as='u'>Department</FormLabel>
                                    <Select placeholder="Select your department" borderColor={'#bdbdbd'} focusBorderColor='lime' {...register('department')} isRequired>
                                        <option value="Admin">Admin</option>
                                        <option value="Driver">Driver</option>
                                        <option value="Employee Benefits">Employee Benefits</option>
                                        <option value="Filing">Filing</option>
                                        <option value="Finance">Finance</option>
                                        <option value="General Hand">General Hand</option>
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
                                    <FormLabel as='u' mt={5}>Select Loaf Quantity</FormLabel>

                                    {/* <Container justifyContent="start"> */}
                                    <Grid gap={5}>
                                        <Box>
                                            <Flex alignItems={'center'} justifyContent="space-between">
                                                <Text>White Bread</Text>
                                                {/* <Spacer /> */}
                                                <NumberInput defaultValue={0} min={0} max={10} w={{ base: '60%', md: '30%' }} borderColor={'#bdbdbd'} focusBorderColor='lime' {...register('white')}>
                                                    <InputGroup>
                                                        <NumberInputField />
                                                        <InputRightAddon mr={5}>loaves</InputRightAddon>
                                                    </InputGroup>
                                                    <NumberInputStepper >
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Flex>
                                        </Box>

                                        <Box>
                                            <Flex alignItems={'center'} justifyContent="space-between">
                                                <Text ml={0}>Brown Bread</Text>
                                                {/* <Spacer /> */}
                                                <NumberInput defaultValue={0} min={0} max={10} w={{ base: '60%', md: '30%' }} borderColor={'#bdbdbd'} focusBorderColor='lime' {...register('brown')}>
                                                    <InputGroup>
                                                        <NumberInputField />
                                                        <InputRightAddon mr={5}>loaves</InputRightAddon>
                                                    </InputGroup>
                                                    <NumberInputStepper >
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Flex>
                                        </Box>

                                        <Box >
                                            <Flex alignItems={'center'} justifyContent="space-between">
                                                <Text ml={0}>Wholewheat Bread</Text>
                                                {/* <Spacer /> */}
                                                <NumberInput defaultValue={0} min={0} max={10} w={{ base: '60%', md: '30%' }} borderColor={'#bdbdbd'} focusBorderColor='lime' {...register('wholewheat')}>
                                                    <InputGroup>
                                                        <NumberInputField />
                                                        <InputRightAddon mr={5}>loaves</InputRightAddon>
                                                    </InputGroup>
                                                    <NumberInputStepper >
                                                        <NumberIncrementStepper />
                                                        <NumberDecrementStepper />
                                                    </NumberInputStepper>
                                                </NumberInput>
                                            </Flex>
                                        </Box>

                                    </Grid>
                                    {/* </Container> */}
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

                        {/* <Button colorScheme='red' onClick={handleSort}>all</Button> */}
                    </Box>
                    :
                    <Box>
                        <Center >
                            <Text fontSize={{ md: "xl", base: "xl" }} mt={9}>
                                The deadline for ordering bread has passed, you will only be able to order again on <b>Monday at 8am</b>
                            </Text>
                        </Center>

                        <Center>
                            <Image src={bread} h={'40%'} w={{ base: '80%', md: '40%' }} mt={4} />
                        </Center>
                    </Box>

                }
            </Container>
        </>
    )
}
