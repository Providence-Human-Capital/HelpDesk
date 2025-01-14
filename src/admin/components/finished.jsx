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
  // useDisclosure,
  Button,
  useToast,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { RepeatIcon } from "@chakra-ui/icons";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Finished({ request }) {
  const [dbMessage, setdbMessage] = useState("");
  const [isReverseOpen, setIsReverseOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedRow, setSelectedRow] = useState("");
  const cancelReverseRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const adminRole = useAuthStore((state) => state.auth.user.role);
  const logoutAuthUser = useAuthStore((state) => state.logoutAuthUser);

  const {
    data: data,
    error,
    refetch,
  } = useQuery({
    queryKey: ["completed"],
    queryFn: () =>
      axios
        .get(`http://localhost:8888/${request}/completed`, {
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

  const onReverseOpen = (ticket) => {
    setSelectedTicket(ticket);
    setIsReverseOpen(true);
  };

  const onClose = () => {
    // setIsOpen(false);
    setIsReverseOpen(false);
    setSelectedTicket(null);
  };

  const reversalMutation = useMutation({
    mutationFn: (reverse) => {
      return axios.put(
        `http://localhost:8888/${request}/completed/reverse`,
        reverse,
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["completed"] });
      toast({
        title: "Ticket has been reversed",
        description: "Ticket is now back in progress",
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

  const handleReversal = () => {
    onClose();

    reversalMutation.mutate({
      id: selectedTicket.id,
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

  const handleRowClick = (id) => {
    setSelectedRow(id);

    if (selectedRow === id) {
      setSelectedRow("");
    }
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
                  <Th>Name</Th>
                  <Th>Department</Th>
                  <Th>Date of Applicaton</Th>
                  <Th>Date Completed</Th>
                  <Th>Description</Th>
                  <Th>Type</Th>
                  <Th>Status</Th>
                  <Th>it officer</Th>
                  {adminRole === "admin" ? <Th>Reverse</Th> : null}
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
                    <Td>
                      {new Date(info.action_date).toLocaleDateString(
                        "en-GB",
                        options
                      )}
                    </Td>
                    <Td>{info.description}</Td>
                    <Td>{info.request_type}</Td>
                    <Td>{info.status}</Td>

                    {request === "transport" ? null : (
                      <Td>{info.it_officer}</Td>
                    )}
                    {request === "transport" ? null : adminRole === "admin" ? (
                      <Td
                        onClick={() => onReverseOpen(info)}
                        _hover={{ backgroundColor: "blue" }}
                        style={{ width: "1%" }}
                      >
                        <Center>
                          <RepeatIcon />
                        </Center>
                      </Td>
                    ) : null}
                  </Tr>
                )}
              </Tbody>
            ))}

            <AlertDialog
              motionPreset="slideInBottom"
              leastDestructiveRef={cancelReverseRef}
              onClose={onClose}
              isOpen={isReverseOpen}
              isCentered
            >
              <AlertDialogOverlay />

              <AlertDialogContent
                bg={"#101010"}
                border={"1px solid white"}
                color={"white"}
              >
                <AlertDialogHeader>Ticket Reversal?</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  {selectedTicket ? (
                    <>
                      Are you sure that you want to reverse{" "}
                      <Text as={"b"}>{selectedTicket.name}'s</Text> ticket and
                      send back to in-progress??
                    </>
                  ) : (
                    "No ticket selected"
                  )}
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button
                    ref={cancelReverseRef}
                    onClick={onClose}
                    colorScheme="red"
                  >
                    No
                  </Button>
                  <Button
                    colorScheme="blue"
                    ml={3}
                    onClick={() => {
                      handleReversal();
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
