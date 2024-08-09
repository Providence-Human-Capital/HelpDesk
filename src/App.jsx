import React, { useState } from 'react'
// import Navbar from '../components/Navbar'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  Stack,
  Radio,
  CheckboxGroup,
  Checkbox,
  Textarea,
  Button,
  Input,
  Heading,
  Box,
  VStack,
  HStack,
  Container,
  Text,
  Flex,
  Center,
  Divider,
} from '@chakra-ui/react';
import Hardware from './components/hardware';
import Email from './components/email';
import General from './components/general';
import Transfer from './components/transfer';
import FAQs from './components/FAQs';

export default function Requisition() {

  const [showPage, setShowPage] = useState('general')

  let x = 'green'

  return (
    <>
      {/* <Navbar /> */}
      <Container maxW='1100px' pt='4' >
        <Box>
          <Flex bg='' h='7' className='req' >

            <Center
              // style={{ width: '50%', borderRight: '2px solid #ebeef0', borderBottom: `2px solid ${showPage === 'hardware' ? x : '#ebeef0'}` }}
              style={{ width: '25%', borderRight: '2px solid #ebeef0', borderBottom: `2px solid ${showPage === 'general' ? x : '#ebeef0'}` }}
              onClick={() => setShowPage('general')}
              p={4}
            >
              General Request</Center>
            <Center
              style={{ width: '25%', borderRight: '2px solid #ebeef0', borderBottom: `2px solid ${showPage === 'hardware' ? x : '#ebeef0'}` }}
              onClick={() => setShowPage('hardware')}
              p={4}
            >
              Hardware</Center>
            <Center
              style={{ width: '25%', borderRight: '2px solid #ebeef0', borderBottom: `2px solid ${showPage === 'email' ? x : '#ebeef0'}` }}
              onClick={() => setShowPage('email')}
              p={4}
            >
              Email</Center>
            <Center
              style={{ width: '25%', borderRight: '2px solid #ebeef0', borderBottom: `2px solid ${showPage === 'transfer' ? x : '#ebeef0'}` }}
              onClick={() => setShowPage('transfer')}
              p={4}
            >
              Transfer</Center>
              <Center
              style={{ width: '25%', borderRight: '2px solid #ebeef0', borderBottom: `2px solid ${showPage === 'faqs' ? x : '#ebeef0'}` }}
              onClick={() => setShowPage('faqs')}
              p={4}
            >
              FAQs</Center>

          </Flex>
        </Box>

        {showPage === 'hardware' ? <Hardware /> : ''}
        {showPage === 'email' ? <Email /> : ''}
        {showPage === 'general' ? <General /> : ''}
        {showPage === 'transfer' ? <Transfer /> : ''}
        {showPage === 'faqs' ? <FAQs /> : ''}


      </Container>
    </>
  )
}
