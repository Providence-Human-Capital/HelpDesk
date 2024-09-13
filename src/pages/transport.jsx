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
    InputGroup,
} from '@chakra-ui/react';
import PHC from '../img/PHC_Logo.png'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function Transport() {
    const { register, formState: { errors }, handleSubmit, reset } = useForm()

    return (
        <>
            <Container maxW={"1100px"} mt={5} color={'black'}>
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


                <Box>
                    <Center fontSize={'3xl'}>Request Transport</Center>
                </Box>
                <VStack mt={5} spacing={4} >


                    <form  >

                        <FormControl id="firstname">
                            <FormLabel as='u' color={errors.firstname ? 'red' : 'black'}>First Name</FormLabel>

                            <Input type="text"
                                placeholder="Enter your first name"
                                borderColor={errors.firstname ? 'red' : '#bdbdbd'}
                                focusBorderColor='lime'
                                {...register('firstname', { minLength: { value: 4, message: 'Your first name is too short' } })}
                                aria-invalid={errors.firstname ? "true" : "false"}
                                w={{ base: '100%', md: '800px' }}
                                isRequired
                            />
                        </FormControl>

                        <FormControl id="lastname" mt={5}>
                            <FormLabel as='u' color={errors.lastname ? 'red' : 'black'}>Last Name</FormLabel>

                            <Input type="text"
                                placeholder="Enter your last name"
                                borderColor={errors.lastname ? 'red' : '#bdbdbd'}
                                focusBorderColor='lime'
                                {...register('lastname', { minLength: { value: 4, message: 'Your last name is too short' } })}
                                aria-invalid={errors.lastname ? "true" : "false"}
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

                        <FormControl id="route" mt={5}>
                            <FormLabel as='u' color={errors.route ? 'red' : 'black'}>Route</FormLabel>

                            <Flex w={'63%'} flexDirection={{ base: 'column', md: 'row' }}>
                                <Box>From:</Box>
                                <Spacer />
                                <Box>To:</Box>
                            </Flex>

                            <Flex flexDirection={{ base: 'column', md: 'row' }}>

                                <Input type="text"
                                    placeholder="Enter your Employee Number"
                                    borderColor={errors.route ? 'red' : '#bdbdbd'}
                                    focusBorderColor='lime'
                                    {...register('route', { minLength: { value: 3, message: 'Your route is too short' } })}
                                    aria-invalid={errors.route ? "true" : "false"}
                                    w={{ base: '100%', md: '320px' }}
                                    isRequired
                                />
                                <Spacer />

                                <Input type="text"
                                    placeholder="Enter your Employee Number"
                                    borderColor={errors.route ? 'red' : '#bdbdbd'}
                                    focusBorderColor='lime'
                                    {...register('route', { minLength: { value: 3, message: 'Your route is too short' } })}
                                    aria-invalid={errors.route ? "true" : "false"}
                                    w={{ base: '100%', md: '320px' }}
                                    isRequired
                                />
                            </Flex>
                        </FormControl>

                        <FormControl id="purpose" mt={5}>
                            <FormLabel as='u' color={errors.route ? 'red' : 'black'}>Purpose</FormLabel>

                            <Input type="text"
                                placeholder="Enter your Employee Number"
                                borderColor={errors.purpose ? 'red' : '#bdbdbd'}
                                focusBorderColor='lime'
                                {...register('purpose', { minLength: { value: 4, message: 'Your purpose is too short' } })}
                                aria-invalid={errors.purpose ? "true" : "false"}
                                w={{ base: '100%', md: '800px' }}
                                isRequired
                            />
                        </FormControl>

                        <FormControl id="cargo" mt={5}>
                            <FormLabel as='u' color={errors.cargo ? 'red' : 'black'}>Cargo Carried</FormLabel>

                            <Input type="text"
                                placeholder="Enter your Employee Number"
                                borderColor={errors.cargo ? 'red' : '#bdbdbd'}
                                focusBorderColor='lime'
                                {...register('cargo')}
                                aria-invalid={errors.cargo ? "true" : "false"}
                                w={{ base: '100%', md: '800px' }}
                                isRequired
                            />
                        </FormControl>

                        <Box mt={5}>
                            <Flex alignItems={'center'} justifyContent="space-between">
                                <Text>Number of passengers</Text>
                                {/* <Spacer /> */}
                                <NumberInput defaultValue={0} min={0} max={10} w={{ base: '60%', md: '30%' }} borderColor={'#bdbdbd'} focusBorderColor='lime' {...register('white')}>
                                    <InputGroup>
                                        <NumberInputField />
                                        <InputRightAddon mr={5}>passengers</InputRightAddon>
                                    </InputGroup>
                                    <NumberInputStepper >
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>
                        </Box>

                        <Box mt={3}>
                            {errors.empNumber && <p role="alert" style={{ color: "red", fontWeight: 700 }}>{errors.empNumber.message}</p>}
                            {errors.firstname && <p role="alert" style={{ color: "red", fontWeight: 700 }} >{errors.firstname.message}</p>}
                            {errors.lastname && <p role="alert" style={{ color: "red", fontWeight: 700 }} >{errors.lastname.message}</p>}
                        </Box>

                        {/* {loading ? */}
                        {/* // <Loader /> */}
                        {/* : */}
                        <Button colorScheme="green" mt={8} mb='10' type="submit">
                            Submit Request
                        </Button>
                        {/* } */}
                    </form>
                </VStack>
            </Container>
        </>
    )
}
