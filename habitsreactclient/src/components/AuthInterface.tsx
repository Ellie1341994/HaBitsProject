import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"
import { Fade, } from "@chakra-ui/react"
import {
    Box,
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
    Button,
    useColorModeValue,
    Text,
    Heading,
    VisuallyHidden,
    Flex,
} from '@chakra-ui/react';
import {
    AnimatedFlex
} from "./AnimatedChakraComponents"
import { useState} from "react";
import React from "react";
import axios from 'axios';

function PanelButton(props: any) {
    //const bgColorType: any = {dark: "#e77", light:"orange.200"}
    const bgColorType: {dark: string, light: string} = {dark: "#e77", light:"gray.700"}
    const bgColor: string = useColorModeValue(bgColorType.light, bgColorType.dark);
    const borderValues: string = useColorModeValue("solid 1px #888","solid 1px #CCC");

    return (
        <>
            <Flex 
                justifyContent="center"
                direction="column"
                w="75%"
            >
                <Button
                    _hover={{ border: "solid 3px", borderColor: "gray.300", boxShadow: "lg"}}
                    type="submit"
                    fontSize={{base: "10px", md: "16px"}}
                    mt="2" mb="2"
                    color="white"
                    isFullWidth={true}
                    backgroundColor={bgColor}
                    id="authPanelActionButton"
                    borderRadius="2xl"
                    borderBottom={borderValues}
                />
                <Popover placement="left">
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
                        color="gray.700"
                        backgroundColor="gray.50"
                    >
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader fontSize="xs" color="#ef2345">{props.headerText}</PopoverHeader>
                        <PopoverBody fontSize="xs">{props.bodyText}</PopoverBody>
                    </PopoverContent>
                </Popover>
            </Flex>
        </>
    )

}

interface APState {
    formType: string,
    loggedIn: string | undefined 
}

interface APProps {
    setMountState: any
}
type TAArgsTypes = [string, string, any, number];

class AuthPanel extends React.Component<APProps, APState> {

    URL: string = "http://127.0.0.1:8000";
    registerFields: any = {name: "", username: "", password1: "", email: ""};
    Heading: string = "Sign Up";
    constructor(props: any){
        super(props);
        this.state = {formType: "Register", loggedIn: undefined }
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
        this.typingAnimation = this.typingAnimation.bind(this);
        this.animateText = this.animateText.bind(this);
        this.animateFormChange = this.animateFormChange.bind(this);
    }

    handleChange(event: any) {
        const field: string = event.target.name;
        const value: string = event.target.value;
        this.registerFields[field] = value;
    }
    register(event: any) {
        event.preventDefault();
        let data = this.registerFields;
        data["password2"] = data.password;
        axios.post(this.URL, data)
        .then( response => console.log(response) )
        .catch( e => console.log(e));
    }

    componentDidMount() {
        this.animateFormChange(1000);
    }

    componentDidUpdate() {
        this.animateFormChange(500);
    }
  
    animateFormChange(initialDelay: number) {
        const authPanelHeading: any = document.getElementById("authPanelHeading");
        const authPanelActionButton: any = document.getElementById("authPanelActionButton");
        const changeFormButton: any = document.getElementById("changeFormButton");
        changeFormButton.setAttribute("style", "pointer-events: none;");
        this.animateText(initialDelay, authPanelHeading,  {register: "Sign\u00A0Up", login: "Sign\u00A0In"});
        this.animateText(initialDelay, authPanelActionButton, {register: "Register", login: "Login"});
        this.animateText(initialDelay, changeFormButton, {register:"Login\u00A0instead", login: "Register\u00A0instead"});
        setTimeout(() => {
            changeFormButton.removeAttribute("style");

        },
        1500);
    }
    animateText(initialDelay: number, htmlElement: any, textChoices: {register: string, login:string}) {
        // "\u00A0" direct whitespace code
        const text: string = this.state.formType === "Register" ? textChoices.register : textChoices.login;
        let typingAnimationArgs: TAArgsTypes = [
            "erase",
            text,
            htmlElement,
            500 / text.length ,
        ];
        setTimeout(this.typingAnimation, initialDelay, ...typingAnimationArgs);
    }
    typingAnimation(
        animationType: "erase" | "write",
        remaningHeadingText: string,
        headingElement: any,
        delay: number) {
            const headingElementLength: number = headingElement.innerText.length;
            if ( animationType === "erase") {
                if (headingElementLength > 1) {
                    headingElement.innerText = headingElement.innerText.substring(0, headingElementLength - 1);
                }
                else {
                    headingElement.innerText  = "\u00A0";
                    animationType = "write";
                }
            }
            else {
                if (headingElement.innerText === "\u00A0") {
                    headingElement.innerText = remaningHeadingText[0]; 
                }
                else {
                    headingElement.innerText += remaningHeadingText[0]; 
                }
                remaningHeadingText = remaningHeadingText.substring(1);
            }
            if( remaningHeadingText !== "") {
                let typingAnimationArgs: TAArgsTypes = [
                    animationType, 
                    remaningHeadingText,
                    headingElement,
                    delay,
                ];
                setTimeout(this.typingAnimation, delay, ...typingAnimationArgs); 
            }
        }

    login(event: any) {
        event.preventDefault();
        const loginURL: string = this.URL + "/login/";
        const userListURL = this.URL + "/user/";
        const postData = {username: this.registerFields.username, password: this.registerFields.password1};
        axios.post(loginURL, postData)
        .then( r =>   {

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
        .catch(e => { 
            if( e.status !== 200 ) {
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
                        <Heading 
                            width="75%"
                            pt="4" pb="4"
                            fontSize={{base: "18px", md: "36px"}}
                            id="authPanelHeading"
                            as="h2"
                            fontFamily="serif"
                            alignSelf="center"
                        />
                        <FormControl w="75%" mt="0" mb="2" >
                            <FormLabel 
                                fontSize={{base: "10px", md: "14px"}}
                                mr="0" 
                                textAlign="left" 
                                fontWeight="bold"
                            >
                                Username
                            </FormLabel>
                            <Input backgroundColor="white"
                                color="gray.700"
                                isRequired={true}
                                id="username"
                                name="username"
                                type="text"
                                onChange={this.handleChange}
                                borderBottom="solid 2px #CCC"
                            />
                        </FormControl>
                        <Fade 
                            in={this.state.formType === "Register"}
                            unmountOnExit={true}
                            transition={{repeat: 1, type: "tween", duration: 2}}
                            style={{width: "75%"}}
                        >
                            <FormControl  mt="2" mb="2" >
                                <FormLabel 
                                    fontSize={{base: "10px", md: "14px"}}
                                    textAlign="left" 
                                    mr="0" 
                                    fontWeight="bold"
                                >
                                    E-Mail
                                </FormLabel>
                                <Input backgroundColor="white"
                                    color="gray.700"
                                    isRequired={true}
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={this.handleChange}
                                    borderBottom="solid 2px #CCC"
                                />
                            </FormControl>
                        </Fade>
                        <FormControl w="75%" mt="2" mb="2" >
                            <FormLabel 
                                fontSize={{base: "10px", md: "14px"}}
                                textAlign="left" 
                                mr="0" 
                                fontWeight="bold"
                            >
                                Password
                            </FormLabel>
                            <Input backgroundColor="white"
                                color="gray.700"
                                isRequired={true}
                                id="password1"
                                name="password1"
                                type="password"
                                onChange={this.handleChange}
                                borderBottom="solid 2px #CCC"
                            />
                            <FormHelperText
                                color="gray.100"
                                fontSize={{base: "8px", md: "10px"}}
                                textAlign="left" 
                            >
                                ~ Never tell your password
                            </FormHelperText>
                        </FormControl>
                        <Flex 
                            direction="column" 
                            justify="space-evenly"
                            align="center"
                            h="20%"
                            w="75%"
                        >
                            <PanelButton 
                                headerText={"Error!"}
                                bodyText={"Wrong Login credentials"}
                            />
                            <Text
                                id="changeFormButton"
                                as="a"
                                width="100%"
                                fontSize={{base: "8px", md: "12px"}}
                                textAlign="left"
                                _hover={{ textDecoration: "underline",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    if (this.state.formType === "Log In") {
                                        this.setState({formType: "Register"})
                                    }
                                    else {
                                        this.setState({formType: "Log In"})
                                    }
                                }}

                            />
                        </Flex>
                    </Flex>
                </form>
            </>
        )
    }
};

type AIProps = {
}

function AuthInterface(props: AIProps) {
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
        <Box 
            w={{base: "100%", md: "50%"}}
            h={{base: "75%", md: "100%"}}
        >
            <Flex
                h="100%"
                color="gray.700"
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                <AnimatedFlex
                    initial={{opacity: 0}}
                    animate={isMounted ? "intro" : "outro"}
                    variants={variants}
                    fontWeight="bold"
                    direction="column"
                    justifyContent="space-evenly"
                    align="center"
                    w={{base: "75%", md: "50%"}}
                    h="75%"
                    p="0"
                    rounded="md"
                    backgroundColor="gray.700"
                    bgGradient={ gradient }
                    textAlign="center"
                    boxShadow={shadow}
                    color="white"
                >
                    <AuthPanel

                        setMountState={setMountState}
                    />
                </AnimatedFlex>
            </Flex>
        </Box>
    )
}
export default AuthInterface;
