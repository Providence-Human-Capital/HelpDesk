import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import {
  Box,
  Center,
  Container,
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { WarningTwoIcon } from "@chakra-ui/icons";
import Loader from "../components/loader";

export default function AdminBread() {
  const [disabled, setDisabled] = useState(true);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  let { data: breadPrice, error } = useQuery({
    queryKey: ["bread"],
    queryFn: () =>
      axios
        .get("http://localhost:8888/bread/price")
        .then((res) => res.data)
        .catch((err) => {
          toast({
            title: "Error",
            description: err.response.data || "An error occurred",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top-right",
          });
        }),
  });

  useEffect(() => {
    onOpen();
  }, []);

  const onSubmit = (data) => {
    axios
      .put("http://localhost:8888/bread/price/change", data)
      .then((res) => {
        toast({
          title: "You have updated the bread price",
          description:
            "Future orders are now going to be calculated with the new price",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top-right",
        });
      })
      .catch((err) => {
        toast({
          title: "Error updating ",
          description:
            err.response.data || "There was a problem updating bread price",
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top-right",
        });
      })
      .finally(() => {
        setLoading(false);
        setDisabled(true);
      });
  };

  return (
    <>
      <Navbar />

      <Modal isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bg={"#101010"} border={"1px solid white"} color={"white"}>
          <ModalHeader>
            <WarningTwoIcon color={"orangered"} />
            WARNING!!!!
            <WarningTwoIcon color={"orangered"} />
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            This page is responsible for changing the unit price of bread, which
            affects bread orders and payroll deductions.
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="orange" onClick={onClose} mr={3}>
              Continue
            </Button>
            <Button colorScheme="red" onClick={() => navigate(-1)}>
              Go Back!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box bg={"#0d1117"} minH={"93vh"} color={"white"}>
        <Container pt={8} maxW="95vw">
          <Center>
            <Text fontSize={"lg"} as={"u"}>
              Bread Orders{" "}
            </Text>
          </Center>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex p={9}>
              <Box mt={2} mr={3}>
                Current Bread Price ($):
              </Box>
              {breadPrice ? (
                <Input
                  w={"13%"}
                  // type='number'
                  {...register("breadPrice")}
                  defaultValue={breadPrice[0].unit_price}
                  focusBorderColor="#FF0000"
                  disabled={disabled ? "disabled" : null}
                  borderColor={disabled ? "black" : "white"}
                />
              ) : null}
            </Flex>

            <Box pl={9}>
              <Button
                onClick={() => setDisabled(!disabled)}
                colorScheme={disabled ? "orange" : "red"}
              >
                {disabled ? "Change Price" : "Cancel"}
              </Button>

              {disabled ? null : loading ? (
                <Loader />
              ) : (
                <Box mt={2}>
                  <Button colorScheme="blue" type="submit">
                    Update Price
                  </Button>
                </Box>
              )}
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
}
