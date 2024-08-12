import { Box, Center } from '@chakra-ui/react'
import React from 'react'

export default function NotFound() {
    return (
        <Box bg={'#000018'} minH={'100vh'}>
            <Center>
                <Box mt={'30vh'} fontSize={'4xl'} as='kbd' color={'white'}>404 Page not Found</Box>
            </Center>
        </Box>
    )
}
