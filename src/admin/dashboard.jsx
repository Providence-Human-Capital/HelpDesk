import React from "react";
import Navbar from "./navbar";
import {
  Box,
  Center,
  Container,
  HStack,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const toast = useToast();

  const handleSession = () => {
    axios
      .get("http://localhost:8888/admin/test", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
        toast({
          title: "session available",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "no session",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  return (
    <>
      <Navbar />
      <Box bg={"#0d1117"} color={"white"} minH={"94vh"}>
        <Container maxW={"5xl"} pt={10}>
          {/* <Center>
            <Box
              display="grid"
              gridTemplateColumns="repeat(4, 1fr)"
              gap="90px"
              marginTop="28px"
            >
              <Link to={"/admin/general"}>
                <Box
                  bg="#48a6cf"
                  borderRadius={"12px"}
                  p={"20%"}
                  _hover={{ backgroundColor: "#0006cf", cursor: "pointer" }}
                >
                  General Requests
                </Box>
              </Link>
              <Box
                bg="#5366cf"
                borderRadius={"12px"}
                p={"20%"}
                _hover={{ backgroundColor: "#0006cf", cursor: "pointer" }}
              >
                Hardware Requests
              </Box>
              <Link to={"/admin/bread"}>
                <Box
                  bg="#02a9cf"
                  borderRadius={"12px"}
                  p={"20%"}
                  _hover={{ backgroundColor: "#0006cf", cursor: "pointer" }}
                >
                  Bread Orders
                </Box>
              </Link>
              <Box
                bg="#48a6fe"
                borderRadius={"12px"}
                p={"20%"}
                _hover={{ backgroundColor: "#0006cf", cursor: "pointer" }}
              >
                Transfer Requests
              </Box>
            </Box>
          </Center> */}

          <Box pl={{ base: 9, md: 1 }} mt={9}>
            <Text fontSize="2xl">
              With great power comes great responsibility
            </Text>

            <Button mt={8} onClick={handleSession}>
              session test
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}
