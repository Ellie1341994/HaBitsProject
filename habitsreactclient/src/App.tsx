import * as React from "react";
import {
    ChakraProvider,
    Box,
    extendTheme,
    Flex,
    Text,
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
import {
    AnimatedText,
} from "./components/AnimatedChakraComponents"

interface AppState {
  title: string;
}

export class App extends React.Component <{}, AppState> {
    // https://github.com/chakra-ui/chakra-ui/issues/591
    constructor(props: any) {
        super(props);
        this.state = {title: "HaBits ~ Track & Trace"};
        this.writeText = this.writeText.bind(this)
    }
    writeText() {

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
                        <Flex h="100%">
                            <AppTitle/>
                            <AuthInterface/>
                        </Flex>
                    </Flex>
                </ChakraProvider>
            </Route>
        )
    }
}
