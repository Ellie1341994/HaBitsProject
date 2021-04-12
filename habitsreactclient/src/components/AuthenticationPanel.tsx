import {
    useColorModeValue,
} from '@chakra-ui/react';
import {
    AnimatedFlex,
} from "./AnimatedChakraComponents"
import { useState} from "react";
import React from "react";
import AuthenticationForm from "./AuthenticationForm"
export default function AuthenticationPanel(_props: {}) {
    const lightGradientColor: any = {c1: "#7928CA", c2: "#FF0080"};
    const darkGradientColor: any = {c1: "#788389", c2: "#A77"};
    const gradientColors: any = useColorModeValue(lightGradientColor, darkGradientColor);
    const gradient: string = "linear(to-r," + gradientColors.c1 + "," + gradientColors.c2 + ")";
    const shadowType: any = {s1: "0 2px 1px 2px #000", s2: "0 2px 1px 2px #744"};
    const shadow: string = useColorModeValue(shadowType.s2, shadowType.s1);
    const variants: any = {
        intro: {
            opacity: 1,
            transition: {
                delay: 1,
                duration: 0.5,
            },
        },
        outro: {
            opacity: 0,
            transition: {
                duration: 0.5,
            },
        }
    }
    const [isMounted, setMountState] = useState(true);
    return (
        <AnimatedFlex
            initial={{opacity: 0}}
            animate={isMounted ? "intro" : "outro"}
            variants={variants}
            fontWeight="bold"
            direction="column"
            justifyContent="space-evenly"
            align="center"
            w={{base: "75%", md: "50%"}}
            h={{base: "90%", md: "75%"}}
            p="0"
            rounded="md"
            backgroundColor="gray.700"
            bgGradient={ gradient }
            textAlign="center"
            boxShadow={shadow}
            color="white"
        >
            <AuthenticationForm

                setMountState={setMountState}
            />
        </AnimatedFlex>
    )
}
