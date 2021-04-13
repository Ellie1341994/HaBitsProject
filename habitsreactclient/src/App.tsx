import * as React from "react";
import {
    ChakraProvider,
    extendTheme,
    Flex,
    Box,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import {Helmet} from "react-helmet";
import { mode } from '@chakra-ui/theme-tools';
import AuthenticationPanel from "./components/AuthenticationPanel"
import {
    Route,
    Redirect,
} from "react-router-dom";
//import axios from 'axios';
import AppTitle from "./components/AppTitle"

interface AppState {
    title: string;
    authenticated: boolean
}
interface AppProps {
}

export class App extends React.Component<AppProps, AppState> {
    // https://github.com/chakra-ui/chakra-ui/issues/591
    constructor(props: any) {
        super(props);
        this.state = {title: "HaBits ~ Track & Trace", authenticated: false};
    }
    componentDidMount() {
        let token: any = localStorage.getItem("token");
        if ( token ) {
            this.setState({authenticated: true});
        }
    }

    render () {
        return (
            <Route path="/">
                {this.state.authenticated ? <Flex>asd</Flex>: <Redirect to="/login"/>}
                <ChakraProvider theme={extendTheme({
                    styles: {
                        global: (props: any) => ({
                            body: {
                                bg: mode('#fcf6ef', 'gray.800')(props),
                            },
                        }),
                    },
                })}>
                    <Helmet title={this.state.title}/>
                    <Flex
                        w="100%"
                        h="100vh"
                        direction="column"
                    >
                        <Flex
                            justifyContent="right"
                            w="100%"
                        >
                            <ColorModeSwitcher
                                mt="1"
                                mr="1"pos="absolute"
                            />
                        </Flex>
                        <Flex
                            direction={{base: "column", md: "row"}}
                            justify={{base: "stretch", md: ""}}
                            align={{base: "center", md: ""}}
                            h={{base: "100vh", md: "100%"}}
                        >
                            <AppTitle/>
                            <Box
                                w={{base: "100%", md: "50%"}}
                                h={{base: "85%", md: "100%"}}
                            >
                                <Flex
                                    h="100%"
                                    color="gray.700"
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <AuthenticationPanel/>
                                </Flex>
                            </Box>
                        </Flex>
                    </Flex>
                </ChakraProvider>
            </Route>
        )
    }
}
