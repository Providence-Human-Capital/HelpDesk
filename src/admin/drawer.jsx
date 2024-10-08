import { HamburgerIcon } from "@chakra-ui/icons";
import {
    useDisclosure,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Drawer,
    DrawerBody,
    //DrawerFooter,
    DrawerHeader,
    //Input,
    //Button,
    Box,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Drawerr() {
    const btnRef = React.useRef();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const LinkItems = [
        { name: "Admin Dashboard", link: "/admin/dash" },
        { name: "General Requests", link: "/admin/general" },
        { name: "Hardware Requests", link: "/admin/hardware" },
        { name: "Transport Requests", link: '/admin/transport' },
        { name: "Email Requests", link: "/admin/dash" },
        { name: "Transfer Requests", link: "/admin/dash" },
        { name: "Bread Price", link: "/admin/bread" },
        { name: "Admin management", link: "/admin/management" },
    ];

    return (
        <>
            <HamburgerIcon
                aria-label={"Open Menu"}
                boxSize={7}
                color={"white"}
                ref={btnRef}
                onClick={onOpen}
                cursor={'pointer'}
                _hover={{ backgroundColor: 'black', padding: '4px' }}
            // className="admin-drawer"
            />

            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}

            >
                <DrawerOverlay />
                <DrawerContent bg="black" color='white' borderRight={'1px solid red'}>
                    <DrawerCloseButton />
                    <DrawerHeader>v2.0.0</DrawerHeader>

                    <DrawerBody>
                        <Box>
                            <Box>
                                {LinkItems.map((link) => (
                                    <Link to={link.link}>
                                        <Box
                                            h=""
                                            alignItems="center"
                                            mx=""
                                            p="2"
                                            mt={1}
                                            // className="sidebar"
                                            _hover={{ backgroundColor: 'red', borderRadius: '11px' }}
                                        >
                                            <Text fontSize="16" onClose={onClose}>
                                                {link.name}
                                            </Text>
                                        </Box>
                                    </Link>
                                ))}
                            </Box>
                        </Box>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
