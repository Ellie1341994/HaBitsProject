import {
    AnimatedHeading,
    AnimatedText,
} from "./AnimatedChakraComponents"
import * as React from "react";
import { useState, useEffect } from "react";
import {
    Text,
    useColorModeValue,
} from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"

function AppHeading() {
    const [hasFallen, setHasFallen] = useState(false);
    const variants: any = {
        fall: {
            y: "0",
            transition:{
                duration: 1,
                ease: "easeOut",
            }
        },
        levitate: {
            y: "-5vh",
            transition: {
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1,
            },
        }}
        useEffect(() => {
            setTimeout(setHasFallen, 1000, true);
            console.log("should be levitating")
        },[]);
        return (
            <AnimatedHeading
                initial={{y: "-50vh"}}
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
interface ATProps {
    titleOnly?: boolean;
}
/**
 * Stateless Component
 * @Properties titleOnly?: boolean
 * @Example
 * ```
 * <AppTitle titleOnly={true}/> will not display description under title
 * ```
 */
function AppTitle(props?: ATProps | undefined | null) {
    const colors: any = {lc: "gray.50", dc: "gray.700"}
    const textColor: string = useColorModeValue(colors.dc, colors.lc);
    const variants: any = {
        intro: {
            opacity: 1,
            transition:{
                duration: 1,
                ease: "easeOut",

            }
        },
        outro: {
            opacity: 0,
            transition:{
                duration: 1,
                ease: "easeOut",

            },
        },
    };
    return (
        <>
            <AppHeading/>
            <AnimatePresence>
                { ! props?.titleOnly &&
                <AnimatedText
                    color={textColor}
                    fontSize={{base: "10px", md: "14px"}}
                    w="75%"
                    as="em"
                    initial={{opacity: 0}}
                    animate={variants.intro}
                    exit={variants.outro}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    noOfLines={4}
                >
                    <strong>Check your Habits</strong> consistently
                    across time <strong>and how you felt</strong> at precise moments
                    while <strong>doing them</strong>
                </AnimatedText>
                }
            </AnimatePresence>
        </>
    )
}
export default AppTitle;
