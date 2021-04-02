import {
    AnimatedHeading,
    AnimatedText,
} from "./AnimatedChakraComponents"
import * as React from "react";
import { useState, useEffect } from "react";
import {
    Text,
    Flex,
    useColorModeValue,
} from "@chakra-ui/react"

function AppHeading() {
    const [hasFallen, setHasFallen] = useState(false);
    const variants: any = {
        fall: {
            y: 0,
            transition:{
                duration: 1,
                ease: "easeOut",

            }
        },
        levitate: {
            y: "-10px",
            velocity: 10,
            transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
            },
        }}
        useEffect(() => {
            setInterval(setHasFallen, 1000, true);
            // <Route exact={true} path="login"></Route>
        },[]);
        return (
            <AnimatedHeading
                initial={{y: "-100vh"}}
                animate={hasFallen ? "levitate" : "fall"}
                variants={variants}
                fontFamily="serif"
                as="h1"
                mt="0"
                mb="5"
                fontSize={{base: "18px", md: "36px"}}
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

function AppTitle() {
    const colors: any = {lc: "gray.50", dc: "gray.700"}
    const textColor: string = useColorModeValue(colors.dc, colors.lc);
    return (
        <Flex
            direction="column"
            align="center"
            justify={{base: "end", md: "center"}}
            w={{base: "100%", md: "50%"}}
            h={{base: "25%", md: "100%"}}
            textAlign="center"
            color={textColor}
            style={{userSelect: "none"}}
        >
            <AppHeading/>
            <AnimatedText
                fontSize={{base: "10px", md: "14px"}}
                w="75%"
                as="em"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{ delay: 0.5, duration: 0.5 }}
                noOfLines={4}
            >
                <strong>Check your Habits</strong> consistently
                across time <strong>and how you felt</strong> at precise moments
                while <strong>doing them</strong>
            </AnimatedText>
        </Flex>
    )
}

export default AppTitle;
