import {
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
    Button,
    useColorModeValue,
    Box,
    Text,
    Heading
} from '@chakra-ui/react';
import React from "react";
import axios from 'axios';
function ColoredBtn(props: any) {
    const bgColorType: any = {dark: "#e77", light:"#e8b97d"}
    const bgColor: any = useColorModeValue(bgColorType.light, bgColorType.dark);
    return <Button
    _hover={{ boxShadow: "dark-lg" }}
    type="submit"
    color="white"
    isFullWidth={true}
    mt="5" mb="5"
    backgroundColor={bgColor}
    >
        {props.text}
    </Button>

}

class AuthInterface extends React.Component<any> {

    URL: string = "http://127.0.0.1:8000";
    registerFields: any = {name: "", username: "", password1: "", email: ""};

    constructor(props: any){
        super(props);
        this.state = {formType: "Register",  }
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
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
        const postData = {username: this.registerFields.username, password: this.registerFields.password1};
        axios.post(loginURL, postData)
        .then( r => console.log(r))
        .catch(e => alert(e));
        console.log(postData, loginURL);
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

                    <ColoredBtn text={
                        // @ts-ignore
                        this.state.formType}/>
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
export default AuthInterface;
