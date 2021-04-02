import * as React from "react";
import {
    ChakraProvider,
    extendTheme,
    Flex,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import {Helmet} from "react-helmet";
import { mode } from '@chakra-ui/theme-tools';
import AuthInterface from "./components/AuthInterface"
import {
  Route,
} from "react-router-dom";
//import axios from 'axios';
import AppTitle from "./components/miscellaneous"

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
    render () {
        return (
            <Route exact={true} path="/">
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
                            <AuthInterface/>
                        </Flex>
                    </Flex>
                </ChakraProvider>
            </Route>
        )
    }
}
