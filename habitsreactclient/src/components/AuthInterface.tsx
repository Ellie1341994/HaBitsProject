import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"
import {
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
import { useState, useEffect } from "react";
import React from "react";
import axios from 'axios';

function PanelButton(props: any) {
    const bgColorType: any = {dark: "#e77", light:"#e8b97d"}
    const bgColor: any = useColorModeValue(bgColorType.light, bgColorType.dark);
    return (
        <>
            <Button
                _hover={{ boxShadow: "dark-lg" }}
                type="submit"
                mt="5" mb="5"
                color="white"
                isFullWidth={true}
                backgroundColor={bgColor}
            >
                {props.text}
            </Button>
            <Flex justifyContent="center">
                <Popover >
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
                    <PopoverContent color="#333">
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>{props.headerText}</PopoverHeader>
                        <PopoverBody>{props.bodyText}</PopoverBody>
                    </PopoverContent>
                </Popover>
            </Flex>
        </>
    )

}

class AuthPanel extends React.Component<any> {

    URL: string = "http://127.0.0.1:8000";
    registerFields: any = {name: "", username: "", password1: "", email: ""};
    constructor(props: any){
        super(props);
        this.state = {formType: "Register", loggedIn: undefined }
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    componentWillUnmount() {
    }
    handleChange(event: any) {
        const field: string = event.target.name;
        const value: string = event.target.value;
        this.registerFields[field] = value;
    }
    register(event: any) {
        event.preventDefault();
        let data = this.registerFields;
        // @ts-ignore
        data["password2"] = data.password;
        // @ts-ignore
        axios.post(this.URL, data)
        .then( response => console.log(response) )
        .catch( e => console.log(e));
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
                console.log(errorPopOver);
                errorPopOver.click();
            }
        })
    }
    render() {
        return (
            <>
                <Heading as="h2"
                    fontFamily="serif"
                    alignSelf="center"
                >
                    { // @ts-ignore
                        this.state.formType === "Register" ? "Get Started" : "Get In"
                    }
                </Heading>
                <form onSubmit={
                    // @ts-ignore
                    this.state.formType === "Register" ? this.register : this.login}
                >
                    <FormControl mt="0" mb="0" >
                        <FormLabel mr="0" textAlign="center" fontWeight="bold">
                            Username
                        </FormLabel>
                        <Input backgroundColor="white"
                            color="gray.700"
                            isRequired={true}
                            id="username"
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                        />
                    </FormControl>
                    {// @ts-ignore
                        this.state.formType === "Register" &&
                            <FormControl mt="2" mb="2" >
                                <FormLabel mr="0" textAlign="center" fontWeight="bold">
                                    E-Mail
                                </FormLabel>
                                <Input backgroundColor="white"
                                    color="gray.700"
                                    isRequired={true}
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={this.handleChange}
                                />
                            </FormControl>
                    }
                    <FormControl mt="2" mb="2" >
                        <FormLabel mr="0" textAlign="center" fontWeight="bold">
                            Password
                        </FormLabel>
                        <Input backgroundColor="white"
                            color="gray.700"
                            isRequired={true}
                            id="password1"
                            name="password1"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <FormHelperText
                            color="gray.100"
                            fontSize="xs"
                        >
                            ~ Never tell your password to anyone
                        </FormHelperText>
                    </FormControl>
                    <PanelButton text={
                        // @ts-ignore
                        this.state.formType}
                        headerText={"Error!"}
                        bodyText={"LogIn Credentials are wrong"}
                    />
                    <Text
                        as="span"
                        fontSize="xs"
                        _hover={{ textDecoration: "underline",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            // @ts-ignore
                            if (this.state.formType === "Log In") {
                                this.setState({formType: "Register"})
                            }
                            else {
                                this.setState({formType: "Log In"})
                            }
                        }}

                    >
                        {
                            // @ts-ignore
                            this.state.formType === "Register" ? "Log In" : "Register"
                        } instead
                    </Text>
                </form>
            </>
        )
    }
};


function AuthInterface() {
    const lightGradientColor: any = {c1: "#7928CA", c2: "#FF0080"};
    const darkGradientColor: any = {c1: "#788389", c2: "#A77"};
    const gradientColors: any = useColorModeValue(lightGradientColor, darkGradientColor);
    const gradient: string = "linear(to-r," + gradientColors.c1 + "," + gradientColors.c2 + ")";
    const shadowType: any = {s1: "dark-lg", s2: "0px 0px 3px 1px black;"};
    const shadow: string = useColorModeValue(shadowType.s2, shadowType.s2);
    const variants: any = {
        intro: {
            opacity: 1,
            transition: {
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
                w="50%" h="75%" p="0"
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
    )
}
export default AuthInterface;
