import React from 'react'
 import { Box, FormControl, FormLabel, Input, Checkbox, Button, Textarea, Grid, GridItem, Heading,VStack } from '@chakra-ui/react';

export default function transfer() {
  return (
    <Box p={5} borderWidth={1} borderRadius="md" boxShadow="md" colorScheme="green">
      <Heading mb={4}>Computer Disposal/Transfer Form</Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input placeholder="Enter your name" />
          </FormControl>
        </GridItem>
        <GridItem>
          {/* <FormControl> */}
            {/* <FormLabel>Date</FormLabel> */}
            {/* <Input type="date" /> */}
          {/* </FormControl> */}
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Department</FormLabel>
            <Input placeholder="Enter your department" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Location</FormLabel>
            <Input placeholder="Enter location" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>From</FormLabel>
            <Input placeholder="From" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>To</FormLabel>
            <Input placeholder="To" />
          </FormControl>
        </GridItem>
      </Grid>

      <Heading size="md" mt={6} spacing={3}>Request Type</Heading>
      <VStack spacing={3} mt={4} alignItems="flex-start">
      <Checkbox>Disposal</Checkbox>
      <Checkbox>Transfer</Checkbox>
      <Checkbox>Donation</Checkbox>
      <Checkbox>Employee Purchase/Donation</Checkbox>
      </VStack>

      <Heading size="md" mt={6}>Equipment</Heading>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem><FormLabel>IT Tag</FormLabel><Input /></GridItem>
        <GridItem><FormLabel>Manufacturer</FormLabel><Input /></GridItem>
        <GridItem><FormLabel>Model</FormLabel><Input /></GridItem>
        <GridItem><FormLabel>Operating Software</FormLabel><Input /></GridItem>
        <GridItem><FormLabel>Serial Number</FormLabel><Input /></GridItem>
      </Grid>

      <Heading size="md" mt={6}>Reason for Disposal (check all that apply)</Heading>
    {/* <Box ml={-690}> Adjust the value of ml as needed */}
      <VStack spacing={3} mt={4} alignItems="flex-start">
      <Checkbox>Device no longer functional</Checkbox>
      <Checkbox>Donating equipment (other than to employee)</Checkbox>
      <Checkbox>Transferring equipment to another department</Checkbox>
      <Checkbox>Giving computer to employee or employee purchase</Checkbox>
      <Checkbox>Computer antiquated, no longer useful</Checkbox>
      <Checkbox>Stolen</Checkbox>
      <Checkbox>Damaged beyond repair</Checkbox>
      </VStack>
      {/* </Box> */}
      <FormControl mt={2}>
        <FormLabel>Other</FormLabel>
        <Textarea placeholder="Specify other reason" />
      </FormControl>

      {/* <FormControl mt={6}> */}
        {/* <FormLabel> */}
          {/* I, ________________________, acknowledge receipt of the above-mentioned hardware transfer, I confirm that the hardware has been received in good condition. */}
        {/* </FormLabel> */}
      {/* </FormControl> */}

      <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4}>
        <GridItem>
          <FormControl>
            <FormLabel>Employee Signature</FormLabel>
            <Input placeholder="Signature" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Supervisor Signature</FormLabel>
            <Input placeholder="Signature" />
          </FormControl>
        </GridItem>
      </Grid>

      {/* <Heading size="md" mt={6}>FOR IT USE ONLY:</Heading> */}
      {/* <Grid templateColumns="repeat(2, 1fr)" gap={4}> */}
        <GridItem>
          {/* <FormControl> */}
            {/* <FormLabel>HOD Approval</FormLabel> */}
            {/* <Input placeholder="Approval" /> */}
          {/* </FormControl> */}
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Date Transfered</FormLabel>
            <Input type="date" />
          </FormControl>
        </GridItem>
      {/* </Grid> */}

      <FormControl mt={4}>
        <FormLabel>Was the asset securely erased and/or reformatted?</FormLabel>
        <Checkbox>Yes</Checkbox>
        <Checkbox>No</Checkbox>
      </FormControl>

      <Button colorScheme="green" mt={4} mb='10'>Submit</Button>
    </Box>
  )
}

