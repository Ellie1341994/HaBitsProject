import * as React from "react";
import { useState, useEffect } from "react";
import {
    ChakraProvider,
    Box,
    extendTheme,
    Flex,
    Text,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import {Helmet} from "react-helmet";
import { mode } from '@chakra-ui/theme-tools';
import AuthInterface from "./components/AuthInterface"
import {
  Route,
} from "react-router-dom";
//import axios from 'axios';
import {
    AnimatedHeading,
    AnimatedAppDescription,
} from "./components/AnimatedChakraComponents"

function AppTitle() {
    const [hasFallen, setHasFallen] = useState(false);
    const variants = {
        fall: {
            type: "spring",
            y: 0,
            bounce: 1,
            transition:{
                duration: 0.5
            }
        },
        levitate: {
            y: "-10px",
            velocity: 10,
            transition: {
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5,
                duration: 1,
            },
        }}
        useEffect(() => {
            setInterval(setHasFallen, 500, true);
            // <Route exact={true} path="login"></Route>
        },[]);
        return (
            <AnimatedHeading
                initial={{y: "-100vh"}}
                animate={hasFallen ? "levitate" : "fall"}
                variants={variants}
                fontFamily="serif"
                as="h1"
                size="2xl"
                mt="0"
                mb="5"
            >
                HaBits
                <Text
                    as="sub"
                    fontSize="xs"
                >
                    Track & Trace
                </Text>
            </AnimatedHeading >
        )
}
export function App(): any {
    // https://github.com/chakra-ui/chakra-ui/issues/591
    return (
        <Route exact={true} path="/">
            <ChakraProvider theme={extendTheme({
                styles: {
                    global: (props: any) => ({
                        body: {
                            bg: mode('gray.50', 'gray.800')(props),
                        },
                    }),
                },
            })}>
                <Helmet title="HaBits ~ Track & Trace"/>
                <Flex
                    w="100%"
                    h="100vh"
                    direction="column"
                >
                    <Flex
                        justifyContent="right"
                        w="100%"
                    >
                        <ColorModeSwitcher
                            mt="1"
                            mr="1"pos="absolute"
                        />
                    </Flex>
                    <Flex h="100%">
                        <Flex
                            direction="column"
                            align="center"
                            justifyContent="center"
                            w="50%"
                            textAlign="center"
                        >
                            <AppTitle/>
                            <AnimatedAppDescription
                                w="75%"
                                as="em"
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                transition={{ delay: 0.5,duration: 0.5 }}
                                aling="center"
                                noOfLines={4}
                            >
                                <strong>Check your Habits</strong> consistently
                                across time <strong>and how you felt</strong> at precise moments
                                while <strong>doing them</strong>
                            </AnimatedAppDescription>
                        </Flex>
                        <Box w="50%" h="100%">
                            <AuthInterface/>
                        </Box>
                    </Flex>
                </Flex>
            </ChakraProvider>
        </Route>
    )
}
