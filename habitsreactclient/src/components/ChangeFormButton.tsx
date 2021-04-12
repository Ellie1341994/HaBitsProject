import {
    TypingAnimation,
} from "./AnimatedChakraComponents"
import React from "react";
export default function ChangeFormButton(props: any) {
    return (
        <TypingAnimation 
            text={( props.formType === "Register" ? "Log In" : "Sign Up" ) + " instead" }
            durationInMS={500}
            as="a"
            width="100%"
            fontSize={{base: "8px", md: "12px"}}
            textAlign="left"
            _hover={{ textDecoration: "underline",
                cursor: "pointer",
            }}
            onClick={props.switchFormType}
        />
    )
}
