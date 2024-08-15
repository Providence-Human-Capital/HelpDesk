import React from 'react'
import { Spinner } from '@chakra-ui/react'

export default function Loader() {
    return (
        <>
            <Spinner
                thickness='4px'
                speed='0.75s'
                // emptyColor='gray.200'
                color='green'
                size='xl'
            />
        </>
    )
}
