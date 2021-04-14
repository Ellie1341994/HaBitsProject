import {
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
    InputGroup,
    Button,
    InputRightElement,
} from '@chakra-ui/react';
import { AnimatePresence } from "framer-motion"
import {
    FadingInput,
    TransitioningInput,
    TypingAnimation,
} from "./AnimatedChakraComponents"
import React from "react";
function PasswordInput(props: any): any {
  const [show, setShow] = React.useState(false)
  const changeVisibility = () => {setShow(!show)};

  return (
      <>
          <InputGroup>
              <Input
                  backgroundColor="white"
                  color="gray.700"
                  isRequired={true}
                  name={"password1"}
                  minLength={ 8 }
                  onChange={props.handleUserInput}
                  borderBottom="solid 2px #CCC"
                  type={show ? "text" : "password"}
              />
              <InputRightElement 
                  width="4.5rem">
                  <Button 
                      variant="unstyled"
                      color="gray.500"
                      h="1.75rem" 
                      size="sm" 
                      onClick={changeVisibility}
                      _focus={{border: "none"}}
                  >
                      <TypingAnimation durationInMS={250} text={show ? "Hide" : "Show"}/>
                  </Button>
              </InputRightElement>
          </InputGroup>
          <FormHelperText
              color="gray.100"
              fontSize={{base: "8px", md: "10px"}}
              textAlign="left" 
          >
              ~ Never tell your password
          </FormHelperText>
      </>
  );
}
function CustomInput(props: any) {
    if ( props.type === "password" ) {
        return <PasswordInput handleUserInput={props.handleUserInput}/>;
    }
    else {
        return <Input 
            backgroundColor="white"
            color="gray.700"
            isRequired={true}
            name={props.type === "e-mail" ? "email" :  props.type }
            type={props.type === "e-mail" ? "email" :  props.type }
            onChange={props.handleUserInput}
            borderBottom="solid 2px #CCC"
        />
    }
}
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
                <AnimatePresence>
                    <CustomInput 
                        handleUserInput={props.handleUserInput} 
                        type={field}
                    />
                </AnimatePresence>
            </FormControl>;

        if ( field === "e-mail" )  {
            inputControl =
                <FadingInput
                    key={field} 
                    shouldDisplay={props.formType === "Register"}
                >
                    {inputControl}
                </FadingInput>
        }
        else {
            inputControl = 
                <TransitioningInput
                    key={field} 
                >
                    {inputControl}
                </TransitioningInput>
        }
        fields.push(inputControl);
    }
    return fields;
}
