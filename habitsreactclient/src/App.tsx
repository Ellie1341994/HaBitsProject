import * as React from "react";
import {
    ChakraProvider,
    Box,
    extendTheme,
    Flex,
    Heading,
    Text,
    useColorModeValue,
    Circle

} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import {Helmet} from "react-helmet";
import { mode } from '@chakra-ui/theme-tools';
import { motion } from "framer-motion";
import AuthInterface from "./components/AuthInterface";
import axios from 'axios';

const AnimatedBigTitle: React.FC< any> = motion(Heading);
const AnimatedAppDescription: React.FC<any> = motion(Text);
const AnimatedFlex: React.FC<any> = motion(Flex);

function AnimatedAuthInterface() {
    const lightGradientColor: any = {c1: "#7928CA", c2: "#FF0080"};
    const darkGradientColor: any = {c1: "#788389", c2: "#A77"};
    const gradientColors: any = useColorModeValue(lightGradientColor, darkGradientColor);
    const gradient: string = "linear(to-r," + gradientColors.c1 + "," + gradientColors.c2 + ")";
    console.log(gradient);

    return (<AnimatedFlex
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{ delay: 1, duration: 0.5 }}
        fontWeight="bold"
        direction="column"
        justifyContent="space-evenly"
        align="center"
        w="50%" h="75%" p="0"
        rounded="md"
        backgroundColor="gray.700"
        bgGradient={ gradient }
        textAlign="center"
        boxShadow="dark-lg"
        color="white"
    >
        <AuthInterface/>
    </AnimatedFlex>)
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
        <Helmet>
            <title>HaBits ~ Track & Trace</title>
        </Helmet>
        <Flex w="100%" h="100vh" direction="column">
            <Flex justifyContent="right" w="100%" h="">
                <ColorModeSwitcher mt="1" mr="1"pos="absolute"/>
            </Flex>
            <Flex h="100%" justifyContent="center" alignItems="center">
                <Flex direction="column" align="center" justifyContent="center" w="50%" textAlign="center">
                    <AnimatedBigTitle
                        initial={{y: "-100vh"}}
                        animate={{y: 0}}
                        transition={{ duration: 0.5 }}
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
                    </AnimatedBigTitle >
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
                    <Flex h="100%" color="gray.700" direction="column" justifyContent="center" alignItems="center">
                        <AnimatedAuthInterface/>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    </ChakraProvider>
)
