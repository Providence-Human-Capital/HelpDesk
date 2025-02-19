import React, { useState } from "react";
import { Box, Container, Flex, Center, Image } from "@chakra-ui/react";
import Hardware from "../components/hardware";
import Email from "../components/email";
import General from "../components/general";
import Transfer from "../components/transfer";
import FAQs from "../components/FAQs";
import PHC from "../img/PHC_Logo.png";
import axios from "axios";
import Bread from "./bread";
import { Link } from "react-router-dom";

export default function Help() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [showPage, setShowPage] = useState("general");

  let x = "green";

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    axios
      .get("https://nominatim.openstreetmap.org/reverse", {
        params: {
          lat: location.latitude,
          lon: location.longitude,
          format: "json",
        },
      })
      .then((res) => {
        console.log(res.data.display_name);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // getLocation()

  return (
    <>
      <Container maxW="1000px" pt="4">
        <Box>
          {/* <Center>
                        <Link to={'https://providencehumancapital.com'} target='_blank'>
                            <Image
                                src={PHC}
                                alt="Company Logo"
                                boxSize="100px"
                                objectFit="contain"
                            />
                        </Link>
                    </Center> */}
          <Center fontSize={"3xl"} color={"black"} mt={70}>
            IT Help Desk
          </Center>

          {/* <Alert mt={3} variant={'solid'} >
            <AlertIcon />
            Please note that the entire department is not currently at head office, you can still send your request and we will attend to it when we are back.
            The department is aware of the current network challenges and we are attending to it, there is no need to send a request.

          </Alert> */}

          {/* <Flex >

                        <Center
                            // style={{ width: '50%', borderRight: '2px solid #bdbdbd', borderBottom: `2px solid ${showPage === 'hardware' ? x : '#bdbdbd'}` }}
                            style={{ width: '100%', borderRight: '2px solid #bdbdbd', borderBottom: `2px solid ${showPage === 'general' ? x : '#bdbdbd'}` }}
                            onClick={() => setShowPage('general')}
                            className='user'
                            p={2}
                        >
                            General Request</Center>
                        <Center
                            style={{ width: '100%', borderRight: '2px solid #bdbdbd', borderBottom: `2px solid ${showPage === 'hardware' ? x : '#bdbdbd'}` }}
                            onClick={() => setShowPage('hardware')}
                            className='user'
                            p={2}
                        >
                            Hardware</Center>
                        <Center
                            style={{ width: '100%', borderRight: '2px solid #bdbdbd', borderBottom: `2px solid ${showPage === 'email' ? x : '#bdbdbd'}` }}
                            onClick={() => setShowPage('email')}
                            className='user'
                            p={2}
                        >
                            Email</Center>
                        <Center
                            style={{ width: '100%', borderRight: '2px solid #bdbdbd', borderBottom: `2px solid ${showPage === 'transfer' ? x : '#bdbdbd'}` }}
                            onClick={() => setShowPage('transfer')}
                            className='user'
                            p={2}
                        >
                            Transfer</Center>
                        <Center
                            style={{ width: '100%', borderBottom: `2px solid ${showPage === 'faqs' ? x : '#bdbdbd'}` }}
                            onClick={() => setShowPage('faqs')}
                            className='user'
                            p={2}
                        >
                            FAQs</Center>

                    </Flex> */}
        </Box>

        {showPage === "hardware" ? <Hardware /> : ""}
        {showPage === "email" ? <Email /> : ""}
        {showPage === "general" ? <General /> : ""}
        {showPage === "transfer" ? <Transfer /> : ""}
        {showPage === "faqs" ? <FAQs /> : ""}
        {showPage === "bread" ? <Bread /> : ""}
      </Container>
    </>
  );
}
