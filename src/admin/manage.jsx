import React, { useEffect } from "react";
import Navbar from "./navbar";
import {
  Box,
  Center,
  Container,
  Select,
  Text,
  VStack,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import handleLogout from "./navbar";

export default function Manage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const toast = useToast();
  const navigate = useNavigate();
  const displayName = useAuthStore((state) => state.auth.user.username);
  const adminRole = useAuthStore((state) => state.auth.user.role);

  useEffect(() => {
    if (adminRole !== "admin") {
      navigate("/admin/dash");
      toast({
        title: "This page is for the real admins",
        description: "Stay away",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, []);

  const onSubmit = (data) => {
    data.created = displayName;
    axios
      .post("http://localhost:8888/admin/add", data)
      .then((res) => {
        console.log(res.data);
        toast({
          title: "New admin added",
          description: ".",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });

        reset();

        // navigate('/admin/dash')
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Error",
          description: err.response.data,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });

        if (err.response.status === 401) {
          handleLogout();
        }
      });
  };

  return (
    <>
      <Navbar />
      <Box bg={"#0d1117"} color={"white"} minH={"93vh"}>
        <Container maxW={"2xl"} pt={8}>
          <Center>
            <Text fontSize={"xl"}>Admin Management</Text>
          </Center>

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={3} mt={6}>
              <Input
                placeholder="enter username"
                {...register("username")}
                isRequired
              />
              <Input
                placeholder="enter email"
                {...register("email")}
                type="email"
                isRequired
              />
              <Input
                placeholder="enter password"
                {...register("password")}
                type="password"
                isRequired
              />
              {/* focusBorderColor='blue' */}
              <Select
                placeholder="Select admin role"
                bg={"black"}
                {...register("role")}
                isRequired
              >
                <option value="admin" style={{ backgroundColor: "black" }}>
                  Admin
                </option>
                <option value="reader" style={{ backgroundColor: "black" }}>
                  Reader
                </option>
              </Select>
              <Button bg={"#0006cf"} color={"white"} type="submit" mt={3}>
                Add New Admin
              </Button>
            </VStack>
          </form>
        </Container>
      </Box>
    </>
  );
}
