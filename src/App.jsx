import React from 'react'
import {
  Box,
  Container,
  Text,
  Center,
  SimpleGrid,
  Image
} from '@chakra-ui/react';
import bread from './img/2bread.jpg'
import help from './img/help.jpg'
import transport from './img/IMG_1808.jpg'
import { Link } from 'react-router-dom';
import PHC from './img/PHC_Logo.png'

export default function App() {
  return (
    <>
      <Container maxW='1000px'  >

        <Box mb={{ base: 9, md: 0 }} mt={{ base: 0 }}>
          <Center>
            <Link to={'https://providencehumancapital.com'} target='_blank'>
              <Image
                src={PHC}
                alt="Company Logo"
                boxSize="130px"
                objectFit="contain"
              />
            </Link>
          </Center>

          <Center mb={4}>
            <Text fontSize={'2xl'} fontWeight={'bold'}>
              Welcome!!
            </Text>
          </Center>

          <Center mb={6}>
            <Text fontSize={'xl'} fontWeight={'bold'}>
              What can we help you with today?
            </Text>
          </Center>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 0, md: '60px' }}>

            <Box height={{ base: '370px', md: '450px' }} borderRadius={'25px'} _hover={{ color: '#00bf1e' }}>
              <Link to={'/help-desk'}>
                <Center overflow="hidden" borderRadius={'25px'}>
                  <Image
                    src={help}
                    borderRadius={'25px'}
                    w={{ base: '80%', md: '100%' }}
                    _hover={{ transform: 'scale(1.2)' }}
                    transition="transform 0.5s ease-in-out"
                    objectFit="cover"
                    height={{ base: '300px', md: '300px' }}
                  />
                </Center>
              </Link>

              <Center mt={1}>
                <Link to={'/help-desk'}>
                  <Text fontSize={'xl'} >IT Help Desk</Text>
                </Link>
              </Center>
            </Box>

            <Box borderRadius={'25px'} height={{ base: '370px', md: '450px' }} _hover={{ color: '#00bf1e' }}>
              <Link to={'/transport'}>
                <Center overflow="hidden" borderRadius={'25px'}>
                  <Image
                    src={transport}
                    borderRadius={'25px'}
                    w={{ base: '80%', md: '100%' }}
                    _hover={{ transform: 'scale(1.2)' }}
                    transition="transform 0.5s ease-in-out"
                    objectFit="cover"
                    height={{ base: '300px', md: '300px' }}
                  />
                </Center>
              </Link>

              <Center mt={1}>
                <Link to={'/order-bread'}>
                  <Text fontSize={'xl'}>Transport Request</Text>
                </Link>
              </Center>
            </Box>

            <Box borderRadius={'25px'} height={{ base: '370px', md: '450px' }} _hover={{ color: '#00bf1e' }}>
              <Link to={'/order-bread'}>
                <Center overflow="hidden" borderRadius={'25px'}>
                  <Image
                    src={bread}
                    borderRadius={'25px'}
                    w={{ base: '80%', md: '100%' }}
                    _hover={{ transform: 'scale(1.2)' }}
                    transition="transform 0.5s ease-in-out"
                    objectFit="cover"
                    height={{ base: '300px', md: '300px' }}
                  />
                </Center>
              </Link>

              <Center mt={1}>
                <Link to={'/order-bread'}>
                  <Text fontSize={'xl'}>Order Bread</Text>
                </Link>
              </Center>
            </Box>
          </SimpleGrid>

        </Box>
      </Container >
    </>
  )
}