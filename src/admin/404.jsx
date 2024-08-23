import { Box, Text, Button, VStack, Image } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            backgroundColor="black"
            color="white"
            position="relative"
            overflow="hidden"
        >
            <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                backgroundImage="url('/admin/img/404.png')"
                backgroundSize="cover"
                opacity="0.5"
            />
            <VStack zIndex="1" spacing={4}>
                <Text fontSize="10rem" fontWeight="bold" color="red.500">
                    404
                </Text>
                <Text fontSize="2xl" textAlign="center">
                    OOPS PAGE NOT FOUND
                </Text>
                <Link to={'/'}>
                    <Button colorScheme="red" size="lg" >
                        HOME
                    </Button>
                </Link>
            </VStack>
        </Box>
    )
}
