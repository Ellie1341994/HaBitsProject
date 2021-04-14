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
        this.displayUserPanel = this.displayUserPanel.bind(this);
    }
    componentDidMount() {
    }
    displayUserPanel() {
        this.setState({authenticated: true})
    }
    render () {
        return (
            <Route path="/">
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
                        justifyContent="right"
                        w="100%"
                    >
                        <ColorModeSwitcher
                            mt="1"
                            mr="1"
                            pos="absolute"
                        />
                    </Flex>
                    <Flex
                        direction={{base: "column", md: "row"}}
                        justify={{base: "stretch", md: ""}}
                        align={{base: "center", md: ""}}
                        h="100vh"
                    >
                        <Flex
                            direction="column"
                            align="center"
                            justify={{base: "flex-end", md: "center"}}
                            w={{base: "100%", md: "50%"}}
                            h={{base: "25%", md: "100%"}}
                            textAlign="center"
                            style={{userSelect: "none"}}
                        >
                            {this.state.authenticated ? <AppTitle titleOnly={true}/> : <AppTitle/>}
                        </Flex>
                        {! this.state.authenticated &&
                        <>
                            <Redirect to="/login"/>
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
                                    <AuthenticationPanel displayUserPanel={this.displayUserPanel}/>
                                </Flex>
                            </Box>
                        </>
                        }
                    </Flex>
                </ChakraProvider>
            </Route>
        )
    }
}
