import { HamburgerIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
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
    { name: "Transport Requests", link: "/admin/transport" },
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
        cursor={"pointer"}
        _hover={{
          // backgroundColor: "black",
          // padding: "4px",
          // borderRadius: "3px",
          color: "navy",
        }}
        // className="admin-drawer"
      />

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          bg="#0d1117"
          color="white"
          borderRight={"1px solid #58a6cf"}
        >
          <DrawerCloseButton _hover={{ color: "#0096cf" }} />
          {/* <DrawerHeader>v2.0.0</DrawerHeader> */}

          <DrawerBody>
            <Box>
              <Box mt={10}>
                {LinkItems.map((link) => (
                  <Link to={link.link}>
                    <Box
                      h=""
                      alignItems="center"
                      mx=""
                      p="2"
                      mt={1}
                      // className="sidebar"
                      _hover={{
                        backgroundColor: "#0006cf",
                        borderRadius: "11px",
                      }}
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
          <DrawerFooter justifyContent={"left"}>
            <Text as={"i"}>v2.0.0</Text>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
