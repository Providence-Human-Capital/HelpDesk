import React, { useEffect, useState, useRef } from "react";
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
  Center,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useToast,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { CheckIcon } from "@chakra-ui/icons";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Unfinished({ request }) {
  // const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedRow, setSelectedRow] = useState("");
  const cancelRef = useRef();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const username = useAuthStore((state) => state.auth);
  const displayName = username.user.username;
  const adminRole = useAuthStore((state) => state.auth.user.role);
  const logoutAuthUser = useAuthStore((state) => state.logoutAuthUser);

  const { data: data, error } = useQuery({
    queryKey: ["unfinished"],
    queryFn: () =>
      axios
        .get(`http://localhost:8888/${request}/unfinished`, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((err) => {
          if (err.response.status === 401) {
            logoutAuthUser();
            navigate("/admin");
            return;
          }
          toast({
            title: "Error",
            description: err.response.data,
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top-right",
          });
        }),
  });

  // if (error)
  //   return toast({
  //     title: "Error fetching database data",
  //     description: "more text",
  //     status: "error",
  //     duration: 4000,
  //     isClosable: true,
  //     position: "top-right",
  //   });

  const onOpen = (ticket) => {
    setSelectedTicket(ticket);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setSelectedTicket(null);
  };

  const handleRowClick = (id) => {
    setSelectedRow(id);

    if (selectedRow === id) {
      setSelectedRow("");
    }
  };

  const fetchMutation = useMutation({
    mutationFn: (update) => {
      return axios.put(
        `http://localhost:8888/${request}/unfinished/update`,
        update,
        { withCredentials: true }
      );
      // .then((res) => {
      //   toast({
      //     title: "You have now taken ownership of the ticket",
      //     description: "Ticket is now in progress",
      //     status: "success",
      //     duration: 4000,
      //     isClosable: true,
      //     position: "top-right",
      //   });
      // })
      // .catch((err) => {
      //   toast({
      //     title: "Error",
      //     description: err.response.data,
      //     status: "error",
      //     duration: 4000,
      //     isClosable: true,
      //     position: "top-right",
      //   });
      // })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unfinished"] });
      toast({
        title: "You have now finished the ticket",
        description: "Ticket is now finished",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      // queryClient.refetchQueries({ queryKey: ["pending"] });
    },
    onError: (err) => {
      if (err.response.status === 401) {
        logoutAuthUser();
        navigate("/admin");
        return;
      }
      toast({
        title: "Error",
        description: err.response.data || "Failed to update the ticket",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    },
  });

  const handleUpdate = () => {
    onClose();

    fetchMutation.mutate({
      id: selectedTicket.id,
      officer: displayName,
    });
  };

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

  return (
    <>
      <Box mt={4}>
        <Text textAlign={"right"}>
          {data == 0
            ? "No Tickets to display"
            : data
            ? "Count: " + data.length
            : null}
        </Text>

        <TableContainer border={"1px solid #4c4c4c"} mt={2}>
          <Table>
            <Thead>
              {request === "transport" ? (
                <Tr>
                  {/* <Th>ID</Th> */}
                  <Th>Firstname</Th>
                  <Th>Lastname</Th>
                  <Th>Department</Th>
                  <Th>Date</Th>
                  <Th>Start</Th>
                  <Th>Destination</Th>
                  <Th>Purpose</Th>
                  <Th>Cargo</Th>
                  <Th>Passengers</Th>
                  <Th>Comments</Th>
                </Tr>
              ) : (
                <Tr>
                  {/* <Th>ID</Th> */}
                  <Th>Name</Th>
                  <Th>Department</Th>
                  <Th>Date</Th>
                  <Th>Description</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th>It Officer</Th>
                  <Th>Finish</Th>
                </Tr>
              )}
            </Thead>

            {data?.map((info) => (
              <Tbody className="row" onClick={() => handleRowClick(info.id)}>
                {request === "transport" ? (
                  <Tr
                    key={info.id}
                    style={{
                      backgroundColor: selectedRow === info.id ? "#0006cf" : "",
                    }}
                    className={selectedRow === info.id ? "row" : ""}
                  >
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
                    <Td>{info.additional}</Td>
                  </Tr>
                ) : (
                  <Tr
                    key={info.id}
                    style={{
                      backgroundColor: selectedRow === info.id ? "#0006cf" : "",
                    }}
                    className={selectedRow === info.id ? "row" : ""}
                  >
                    <Td>{info.name}</Td>
                    <Td>{info.department}</Td>
                    <Td>
                      {new Date(info.date).toLocaleDateString("en-GB", options)}
                    </Td>
                    <Td>{info.description}</Td>
                    <Td>{info.request_type}</Td>
                    <Td>{info.status}</Td>
                    <Td>{info.it_officer}</Td>
                    {adminRole === "admin" ? (
                      <Td
                        onClick={() => onOpen(info)}
                        _hover={{ backgroundColor: "green" }}
                        style={{ width: "1%" }}
                      >
                        <Center>
                          <CheckIcon />
                        </Center>
                      </Td>
                    ) : null}
                  </Tr>
                )}
              </Tbody>
            ))}
            <AlertDialog
              motionPreset="slideInBottom"
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />

              <AlertDialogContent
                bg={"#101010"}
                border={"1px solid white"}
                color={"white"}
              >
                <AlertDialogHeader>Complete Ticket?</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  {selectedTicket ? (
                    <>
                      Are you sure that{" "}
                      <Text as={"b"}>{selectedTicket.name}'s</Text> ticket is
                      completed??
                    </>
                  ) : (
                    "No ticket selected"
                  )}
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose} colorScheme="red">
                    No
                  </Button>
                  <Button
                    colorScheme="green"
                    ml={3}
                    onClick={() => {
                      handleUpdate();
                    }}
                  >
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
