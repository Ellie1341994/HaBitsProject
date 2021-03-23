import { 
    Input,
    FormControl,
    FormLabel,
    FormHelperText,
    Button,
    useColorModeValue,
    Box,
} from '@chakra-ui/react';
import React from "react";
import axios from 'axios';
const ColoredBtn = function () {
    //const color: any = useColorModeValue("gray.50", "gray.500");
    return <Button type="submit" backgroundColor={"gray.100"} color="gray.700" isFullWidth={true} mt="5" mb="5" >Register</Button>

}

class Registrator extends React.Component<any> {

    URL: string = "http://127.0.0.1:8000/register/";

    constructor(props: any){
        super(props);
        this.state = {name: "", username: "", password: "", email: ""}
        this.register = this.register.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any) {
        const newState: any = {};
        const field: string = event.target.name;
        const value: string = event.target.value;
        newState[field] = value;
        this.setState(newState) 
    }
    register(event: any) {
        event.preventDefault();
        let data = this.state;
        // @ts-ignore
        data["password2"] = this.state.password;
        // @ts-ignore
        axios.post(this.URL, data)
        .then( response => console.log(response) )
        .catch( e => console.log(e));
    }
    render() {
        return (
            <form onSubmit={this.register}>
                <FormControl mt="0" mb="0" >
                    <FormLabel textAlign="center" fontWeight="bold">
                        Username
                    </FormLabel>
                    <Input placeholder="Ex: Cyn77" backgroundColor="white" isRequired={true} id="username" name="username" type="text" onChange={this.handleChange} />
                </FormControl>
                <FormControl mt="2" mb="2" >
                    <FormLabel textAlign="center" fontWeight="bold">
                        Password
                    </FormLabel>
                    <Input placeholder="" backgroundColor="white" isRequired={true} id="password1" name="password1" type="password" onChange={this.handleChange} />
                    <FormHelperText color="gray.100" fontSize="xs">Never tell your password to anyone</FormHelperText>
                </FormControl>
                <FormControl mt="2" mb="2" >
                    <FormLabel textAlign="center" fontWeight="bold">
                        E-Mail
                    </FormLabel>
                    <Input placeholder="Ex: myemailname@gmail.com" backgroundColor="white" isRequired={true} id="email" name="email" type="email" onChange={this.handleChange}/>
                </FormControl>
                <ColoredBtn/>
            </form>

        )
    }
};
export default Registrator;
