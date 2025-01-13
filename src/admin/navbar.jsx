import { React, useEffect, useRef } from "react";
import {
  Box,
  Flex,
  Text,
  Avatar,
  Drawer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Image,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Drawerr from "./drawer";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logout from "./components/logout";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();

  const isAuth = useAuthStore((state) => state.auth.user.isAuth);

  // const test = useAuthStore((state) => state.auth)

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/admin");
  //     toast({
  //       title: "This is for Admins!!",
  //       description: "Sign in first",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "top-right",
  //     });
  //   }
  // }, []);

  const displayName = useAuthStore((state) => state.auth.user.username);
  const email = useAuthStore((state) => state.auth.user.email);
  const logoutAuthUser = useAuthStore((state) => state.logoutAuthUser);

  // console.log(username.user.username)

  const handleLogout = () => {
    // logout();
    axios
      .post("http://localhost:8888/admin/logout", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        logoutAuthUser();
        navigate("/admin");

        toast({
          title: "You have now logged out",
          description: "See you soon",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "This is for Admins!!",
          description: err.response.data || "Sign in first",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  return (
    <Box bg={"#58a6cf"} px={9}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Drawerr />
        </Box>
        <Menu>
          <MenuButton>
            <Flex alignItems={"center"} cursor={"pointer"}>
              {displayName ? <Avatar name={displayName} /> : <Avatar />}
            </Flex>
          </MenuButton>
          <MenuList bg={"#000020"}>
            <Box p="3" color="grey">
              <Text fontSize="xs" as="b">
                {displayName}
              </Text>
              <Text fontSize="xs">{email}</Text>
            </Box>
            <MenuDivider />
            <MenuItem
              onClick={onOpen}
              bg={"#000020"}
              color={"white"}
              _hover={{ backgroundColor: "red" }}
            >
              Log Out
            </MenuItem>

            <AlertDialog
              motionPreset="slideInBottom"
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />

              <AlertDialogContent
                bg={"#101111"}
                color={"white"}
                border={"1px solid grey"}
              >
                <AlertDialogHeader>Log Out?</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  Are you sure you want to log out?
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button
                    variant="outline"
                    colorScheme="whatsapp"
                    ref={cancelRef}
                    onClick={onClose}
                  >
                    No
                  </Button>
                  <Button colorScheme="red" ml={3} onClick={handleLogout}>
                    Log Out
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}
