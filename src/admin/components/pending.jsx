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
import { useAuthStore } from '../../store/authStore';


export default function Pending({ request }) {
  // const [data, setData] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedRow, setSelectedRow] = useState("");
  const cancelRef = useRef();
  const toast = useToast();
  const queryClient = useQueryClient();

  const username = useAuthStore((state) => state.auth)
  const displayName = username.user.username
  const adminRole = useAuthStore((state) => state.auth.user.role)


  const { data: data, error } = useQuery({
    queryKey: ["pending"],
    queryFn: () =>
      axios
        .get(`http://192.168.10.172:8800/${request}/pending`)
        .then((res) => res.data)
        .catch((err) => {
          toast({
            title: "Error",
            description: err.response.data,
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top-right",
          });
        })
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
      return axios.put(`http://192.168.10.172:8800/${request}/pending/update`, update)
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
      queryClient.invalidateQueries({ queryKey: ["pending"] });
      toast({
        title: "You have now taken ownership of the ticket",
        description: "Ticket is now in progress",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
      // queryClient.refetchQueries({ queryKey: ["pending"] });
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: err.response.data || "Failed to update the ticket",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top-right",
      });
    }
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
        <Text textAlign={'right'}>{data == 0 ? 'No Tickets to display' : data ? 'Count: ' + data.length : null}</Text>

        <TableContainer border={"1px solid #4c4c4c"} mt={2}>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Department</Th>
                <Th>Date of Applicaton</Th>
                <Th>Description</Th>
                <Th>Type</Th>
                <Th>Status</Th>
                {adminRole === 'admin' ?
                  <Th>Own</Th>
                  :
                  null}
              </Tr>
            </Thead>

            {
              data?.map((info) => (
                <Tbody className="row" onClick={() => handleRowClick(info.id)}>
                  <Tr
                    key={info.id}
                    style={{
                      backgroundColor: selectedRow === info.id ? "#c00000" : "",
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
                    {adminRole === 'admin' ?
                      <Td
                        onClick={() => onOpen(info)}
                        _hover={{ backgroundColor: "green" }}
                        style={{ width: "1%" }}
                      >
                        <Center>
                          <CheckIcon />
                        </Center>
                      </Td>
                      :
                      null}
                  </Tr>
                </Tbody>
              ))
            }
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
                <AlertDialogHeader>Take Ownership?</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  {selectedTicket ? (
                    <>
                      Are you sure you want to take ownership of{" "}
                      <Text as={"b"}>{selectedTicket.name}' s</Text> request??
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
