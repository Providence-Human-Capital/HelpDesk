import React from 'react'
import {
    Box,
    Flex,
    Text,
    Avatar,
    Drawer,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons'
import Drawerr from './drawer';

export default function Navbar() {
    return (
        <Box bg={'red'} px={9} >
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <Box>
                    <Drawerr />
                </Box>
                <Flex alignItems={'center'} >
                    <Avatar name='mafa' />
                </Flex>
            </Flex>
        </Box>
    )
}
