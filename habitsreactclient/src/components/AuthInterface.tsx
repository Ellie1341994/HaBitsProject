import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useMediaQuery,
} from "@chakra-ui/react"
import {
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
    Button,
    useColorModeValue,
    Heading,
    VisuallyHidden,
    Flex,
} from '@chakra-ui/react';
import {
    AnimatedFlex,
    TypingAnimation,
    FadingInput,
    TransitioningInput,
} from "./AnimatedChakraComponents"
import { useState} from "react";
import React from "react";
import axios from 'axios';

function AuthenticationFormButton(props: any) {
    //const bgColorType: any = {dark: "#e77", light:"orange.200"}
    const bgColorType: {dark: string, light: string} = {dark: "#e77", light:"gray.700"}
    const bgColor: string = useColorModeValue(bgColorType.light, bgColorType.dark);
    const borderValues: string = useColorModeValue("solid 1px #888","solid 1px #CCC");
    const [ isBelow48em ]: boolean[] = useMediaQuery("(max-width: 48em)");

    return (
        <>
            <Flex 
                justifyContent="center"
                direction={isBelow48em ? "row" : "column"}
                w="75%"
            >
                <Popover placement={isBelow48em ? "top" : "left"}>
                    <PopoverTrigger >
                        <VisuallyHidden>
                            <Button 
                                color="white"
                                isFullWidth={true}
                                textAlign="center"
                                id="errorPopOver"
                            >
                                {props.text}
                            </Button>
                        </VisuallyHidden>
                    </PopoverTrigger >
                    <PopoverContent 
                        margin="auto"
                        width={isBelow48em ? "65%" : "100%"}
                        color="gray.700"
                        backgroundColor="gray.50"
                    >
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader fontSize="xs" color="#ef2345">{props.headerText}</PopoverHeader>
                        <PopoverBody fontSize="xs">{props.bodyText}</PopoverBody>
                    </PopoverContent>
                </Popover>
                <Button
                    _hover={{ border: "solid 3px", borderColor: "gray.300", boxShadow: "lg"}}
                    type="submit"
                    fontSize={{base: "10px", md: "16px"}}
                    mt="2"
                    mb="2"
                    size="md"
                    color="white"
                    isFullWidth={true}
                    backgroundColor={bgColor}
                    borderRadius="2xl"
                    borderBottom={borderValues}
                >
                    <TypingAnimation durationInMS={500} as="span" text={props.name}/>
                </Button>
            </Flex>
        </>
    )

}

interface APState {
    formType: string,
    loggedIn: string | undefined,
    formTitle: "Sign Up" | "Log In",
    formActionButtonName: "Register" | "Log In",
    messagesHeaderText: string,
    requestFeedbackMessages: string,
}

interface APProps {
    setMountState: any
}
class AuthenticationForm extends React.Component<APProps, APState> {

    URL: string = "http://127.0.0.1:8000";
    registerFields: any = {name: "", username: "", password1: "", email: ""};
    Heading: string = "Sign Up";
    constructor(props: any) {
        super(props);
        this.state = { 
            messagesHeaderText: "Error(s)",
            requestFeedbackMessages: "",
            formType: "Register",
            loggedIn: undefined,
            formTitle: "Sign Up",
            formActionButtonName: "Register"
        }
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.handleFormTypeChange = this.handleFormTypeChange.bind(this);
    }
    handleChange(event: any) {
        const field: string = event.target.name;
        const value: string = event.target.value;
        this.registerFields[field] = value;
    }
    handleFormTypeChange(_event?: any) {
        this.state.formType === "Register" ?
            this.setState({formType: "Log In", formTitle: "Log In", formActionButtonName: "Log In"})
                : this.setState({formType: "Register", formTitle: "Sign Up", formActionButtonName: "Register"});
    }
    register(event: any) {
        event.preventDefault();
        const registerURL: string = this.URL + "/registration/";
        let data = this.registerFields;
        data["password2"] = data.password;
        axios.post(registerURL, data)
        .then( response => {
            if ( response.status === 400 ) {
            }
            else {
                this.handleFormTypeChange();
            }
        })
        .catch( error => console.log(error));
    }
    login(event: any) {
        event.preventDefault();
        const loginURL: string = this.URL + "/login/";
        const userListURL = this.URL + "/user/";
        const postData = {username: this.registerFields.username, password: this.registerFields.password1};
        axios.post(loginURL, postData)
        .then( r =>   {
            console.log(r)

            if( r.status === 200 ) {
                this.props.setMountState(false);
                console.log(r.data.key);
                axios.get(userListURL,
                          { headers: {
                              Authorization: "Token " + r.data.key,
                          }})
                .then(r => console.log(r.data))
                .catch(e => console.log(e));
            }
        })
        .catch(error => { 
            console.log(error)
            if( error.status !== 200 ) {
                this.setState({requestFeedbackMessages: "* Wrong Login credentials"})
                const errorPopOver: any = document.getElementById("errorPopOver");
                errorPopOver.click();
            }
        })
    }
    render() {
        return (
            <>
                <form 
                    onSubmit={ 
                        this.state.formType === "Register" 
                            ? this.register 
                            : this.login
                    }
                    style={{userSelect: "none", width: "100%", height: "100%"}}
                >
                    <Flex 
                        direction="column"
                        justify="space-between"
                        align="center"
                        height="100%"
                    >
                        <FormTitle formTitle={this.state.formTitle}/>
                        <AnimatedFlex 
                            h="60%"
                            w="100%"
                            direction="column" 
                            justify="space-evenly" 
                            align="center"
                            layout={true}
                        >
                            <Fields 
                                fields={ ["username", "password", "e-mail"] 
                                }
                                formType={this.state.formType} 
                                handleUserInput={this.handleChange}
                            />
                        </AnimatedFlex>
                        <Flex 
                            direction="column" 
                            align="center"
                            h="20%"
                            w="75%"
                            justify="space-between"
                        >
                            <AuthenticationFormButton
                                headerText={this.state.messagesHeaderText}
                                bodyText={this.state.requestFeedbackMessages}
                                name={this.state.formActionButtonName}
                            />
                            <ChangeFormButton 
                                formType={this.state.formType} 
                                switchFormType={this.handleFormTypeChange}
                            />
                        </Flex>
                    </Flex>
                </form>
            </>
        )
    }
};
function Fields(props: any) {
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
                    name={field}
                    type={field === "e-mail" ? "email" : field === "username" ? field : "password"}
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
function FormTitle(props: any) {
    return (
        <Flex 
            justify="center"
            align="center"
            h="20%"
            w="75%"
            pt="4" 
            pb="4"
            fontSize={{base: "18px", md: "36px"}}
        >
            <Heading 
                as="h2"
                fontFamily="serif"
            >
                <TypingAnimation text={props.formTitle} durationInMS={500}/>
            </Heading>
        </Flex>
    )
}
function ChangeFormButton(props: any) {
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
type AIProps = {
}
function AuthenticationPanel(_props: AIProps) {
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
export default AuthenticationPanel;
