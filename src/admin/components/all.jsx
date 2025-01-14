import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  useToast,
  Tag,
  Text,
  Radio,
  HStack,
  RadioGroup,
  Button,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { CheckIcon } from "@chakra-ui/icons";
import { useQuery, QueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authStore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function All({ request }) {
  const [filterData, setFilterData] = useState(null);
  const [selectedRow, setSelectedRow] = useState("");
  const toast = useToast();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const navigate = useNavigate();

  const adminRole = useAuthStore((state) => state.auth.user.role);
  const logoutAuthUser = useAuthStore((state) => state.logoutAuthUser);
  const queryClient = new QueryClient({});

  // console.log(adminRole)

  let { data: data, error } = useQuery({
    queryKey: ["all"],
    queryFn: () =>
      axios
        .get(`http://localhost:8888/${request}/all`, { withCredentials: true })
        .then((res) => res.data)
        .catch((err) => {
          if (err.response.status === 401) {
            logoutAuthUser();
            navigate("/admin");
            return;
          }
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

  const options = {
    year: "2-digit",
    month: "short",
    day: "2-digit",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    // second: '2-digit',
    hour12: false,
  };

  const handleRowClick = (id) => {
    setSelectedRow(id);

    if (selectedRow === id) {
      setSelectedRow("");
    }
  };

  const filterChoice = (value) => {
    setFilter(value);
  };

  const onSubmit = (date) => {
    // console.log(date)

    axios
      .post(`http://localhost:8888/${request}/filter`, date, {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data)
        setFilterData(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          logoutAuthUser();
          navigate("/admin");
          return;
        }
        toast({
          title: "Error",
          description: err.response?.data || "An error occurred",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      });
  };

  const clearFilter = () => {
    setFilterData(null);
    queryClient.invalidateQueries({ queryKey: ["all"] });
    reset();
  };

  const displayData = filterData || data;

  return (
    <>
      <Box mt={4}>
        <Text textAlign={"right"}>
          {displayData == 0
            ? "No Tickets to display"
            : data
            ? "Count: " + displayData.length
            : null}
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack spacing={5}>
            <Input
              type="date"
              w={"16%"}
              h={"28px"}
              {...register("startDate")}
            />
            <Input type="date" w={"16%"} h={"28px"} {...register("endDate")} />
            <Button h={"28px"} bg={"violet"} type="submit">
              Apply filter
            </Button>
            <Button h={"28px"} bg={"aqua"} onClick={clearFilter}>
              Reset
            </Button>
          </HStack>
        </form>

        <TableContainer border={"1px solid #4c4c4c"} mt={2}>
          <Table size={"sm"}>
            <Thead>
              {request === "transport" ? (
                <Tr>
                  <Th>ID</Th>
                  <Th>Firstname</Th>
                  <Th>Lastname</Th>
                  <Th>Department</Th>
                  <Th>Date</Th>
                  <Th>Start</Th>
                  <Th>Destination</Th>
                  <Th>Purpose</Th>
                  <Th>Cargo</Th>
                  <Th>Passengers</Th>
                  <Th>Status</Th>
                  {/* <Th>Action</Th> */}
                </Tr>
              ) : (
                <Tr>
                  <Th>ID</Th>
                  <Th>Name</Th>
                  <Th>Department</Th>
                  <Th>Date</Th>
                  <Th>Description</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  {/* <Th>Action</Th> */}
                </Tr>
              )}
            </Thead>
            {displayData?.map((info) => (
              <Tbody className="row" onClick={() => handleRowClick(info.id)}>
                {request === "transport" ? (
                  <Tr
                    style={{
                      backgroundColor: selectedRow === info.id ? "#0006cf" : "",
                    }}
                    className={selectedRow === info.id ? "row" : ""}
                  >
                    <Td>{info.id}</Td>
                    <Td>{info.firstname}</Td>
                    <Td>{info.lastname}</Td>
                    <Td>{info.department}</Td>
                    <Td>
                      {new Date(info.date).toLocaleDateString("en-GB", options)}
                    </Td>
                    <Td>{info.start}</Td>
                    <Td>{info.destination}</Td>
                    <Td>{info.purpose}</Td>
                    <Td>{info.cargo}</Td>
                    <Td>{info.passengers}</Td>
                    <Td>
                      <Tag
                        variant={"solid"}
                        p={2}
                        colorScheme={
                          info.status === "pending"
                            ? "gray"
                            : info.status === "in-progress"
                            ? "orange"
                            : info.status === "completed" ||
                              info.status === "approved"
                            ? "green"
                            : info.status === "rejected"
                            ? "red"
                            : "yellow"
                        }
                      >
                        {info.status}
                      </Tag>
                    </Td>
                  </Tr>
                ) : (
                  <Tr
                    style={{
                      backgroundColor: selectedRow === info.id ? "#0006cf" : "",
                    }}
                    className={selectedRow === info.id ? "row" : ""}
                  >
                    <Td>{info.id}</Td>
                    <Td>{info.name}</Td>
                    <Td>{info.department}</Td>
                    <Td>
                      {new Date(info.date).toLocaleDateString("en-GB", options)}
                    </Td>
                    <Td>{info.description}</Td>
                    <Td>{info.request_type}</Td>
                    <Td>
                      <Tag
                        variant={"solid"}
                        colorScheme={
                          info.status === "pending"
                            ? "gray"
                            : info.status === "in-progress"
                            ? "orange"
                            : info.status === "completed"
                            ? "green"
                            : "yellow"
                        }
                      >
                        {info.status}
                      </Tag>
                    </Td>
                  </Tr>
                )}
              </Tbody>
            ))}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
