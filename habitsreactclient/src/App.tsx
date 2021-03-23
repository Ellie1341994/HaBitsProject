import * as React from "react";
import {
    ChakraProvider,
    Box,
    extendTheme,
    Flex,
    Heading,

} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import {Helmet} from "react-helmet";
import { mode } from '@chakra-ui/theme-tools';
import { motion } from "framer-motion";
import Registrator from "./components/registerInterface";
import axios from 'axios';

const AnimatedBigTitle: React.FC< any> = motion(Heading);

function ProbandoAxios(): any {
    const URL: string = "http://127.0.0.1:8000";
    axios.get(URL)
    .then( r => { console.log(r); return <p>{r}</p> })
    .catch( e => {console.log(e); return <p>{e}</p> });
    return <p>something is wrong</p>
}
export const App = () => (
    // https://github.com/chakra-ui/chakra-ui/issues/591
    <ChakraProvider theme={extendTheme({
        styles: {
            global: (props: any) => ({
                body: {
                    bg: mode('gray.50', 'gray.800')(props),
                },
            }),
        },
    })}>
        <ProbandoAxios />
        <Helmet>
            <title>HaBits ~ Track & Trace</title>
        </Helmet>
        <Flex w="100%" h="100vh" direction="column">
            <Flex justifyContent="right" w="100%" h="">
                <ColorModeSwitcher />
            </Flex>
            <Flex h="100%" justifyContent="center" alignItems="center">
                <Box w="50%" textAlign="center">
                    <AnimatedBigTitle
                        initial={{y: "-100vh"}}
                        animate={{y: 0}}
                        transition={{ duration: 0.5 }}
                        fontFamily="serif"
                        as="h1"
                        size="4xl"
                    >
                        HaBits
                    </AnimatedBigTitle>
                </Box>
                <Box w="50%" h="100%">
                    <Flex h="100%" color="gray.700" fontWeight="bold" justifyContent="center" alignItems="center">
                        <Flex
                            justifyContent="center"
                            align="center"
                            w="75%" h="75%" p="5"
                            rounded="md"
                            backgroundColor="gray.700"
                            bgGradient="linear(to-r, #7928CA, #FF0080)"
                            textAlign="center"
                            boxShadow="dark-lg"
                        >
                            <Registrator/>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    </ChakraProvider>
)
