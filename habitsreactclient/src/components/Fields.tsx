import {
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
} from '@chakra-ui/react';
import {
    FadingInput,
    TransitioningInput,
} from "./AnimatedChakraComponents"
import React from "react";
export default function Fields(props: any) {
    // props.fields = ["email", "username", "password"]
    const fields: any = [];
    for (const field of props.fields) {
        let inputControl: any = 
            <FormControl 
                w="75%" 
                mt="0" 
                mb="2" 
            >
                <FormLabel 
                    fontSize={{base: "10px", md: "14px"}}
                    mr="0" 
                    textAlign="left" 
                    fontWeight="bold"
                >
                    {field.replace(/^\w/, (c: string) => c.toUpperCase())}
                </FormLabel>
                <Input backgroundColor="white"
                    color="gray.700"
                    isRequired={true}
                    name={field === "e-mail" ? "email" : field === "username" ? field : "password1"}
                    type={field === "e-mail" ? "email" : field === "username" ? field : "password"}
                    minLength={ field === "password" ? 8 : 1 }
                    onChange={props.handleUserInput}
                    borderBottom="solid 2px #CCC"
                />
                {field === "password" &&
                <FormHelperText
                    color="gray.100"
                    fontSize={{base: "8px", md: "10px"}}
                    textAlign="left" 
                >
                    ~ Never tell your password
                </FormHelperText>
                }
            </FormControl>
            if ( field === "e-mail" )  {
                inputControl = <FadingInput
                    key={field} 
                    shouldDisplay={props.formType === "Register"}
                >
                    {inputControl}
                </FadingInput>
            }
            else {
                inputControl = <TransitioningInput
                    key={field} 
                >
                    {inputControl}
                </TransitioningInput>
            }
            fields.push(inputControl);
    }
    return fields;
}
