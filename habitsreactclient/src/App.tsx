import * as React from "react";
import { Link, ChakraProvider, extendTheme, Flex, Box } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Helmet } from "react-helmet";
import { mode } from "@chakra-ui/theme-tools";
import AuthenticationPanel from "./components/AuthenticationPanel";
import { AnimatedFlex } from "./components/AnimatedChakraComponents";
import { AnimatePresence } from "framer-motion";
import { UserServices } from "./components/userServices";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import AppTitle from "./components/AppTitle";
interface AppState {
  headerTitle: string;
  authenticated: boolean;
  userName?: string;
  appOrientation: any;
  titleSubText: string;
  titleSupText: string;
  appTitle: string;
}
interface AppProps {}

export class App extends React.Component<AppProps, AppState> {
  // https://github.com/chakra-ui/chakra-ui/issues/591
  constructor(props: any) {
    super(props);
    this.setUserCredentials = this.setUserCredentials.bind(this);
    this.logout = this.logout.bind(this);
    this.displayInstructions = this.displayInstructions.bind(this);
    const isUserAuthenticated: boolean = localStorage.getItem("token") !== null;
    this.state = {
      appOrientation: isUserAuthenticated ? "column" : "row",
      headerTitle: "HaBits ~ Track & Trace",
      appTitle: "HaBits",
      titleSubText: isUserAuthenticated ? "Of" : "Track & Trace",
      authenticated: isUserAuthenticated,
      titleSupText: isUserAuthenticated
        ? (localStorage.getItem("userName") as string)
        : "",
    };
  }
  URL: string = "http://127.0.0.1:8000";
  componentDidUpdate(_prevProps: any, _prevState: any) {}
  setUserCredentials(layOutChangeSpeed: number) {
    const userURL: string = this.URL + "/user/";
    axios
      .get(userURL, {
        headers: { Authorization: "Token " + localStorage.getItem("token") },
      })
      .then((response) => {
        const userInfo: any = response.data.results[0];
        localStorage.setItem("userName", userInfo.username);
        localStorage.setItem("userId", userInfo.id);
        let updatedState: any = {
          authenticated: true,
          titleSupText: userInfo.username,
          titleSubText: "Of",
          appOrientation: "row",
        };
        this.setState(updatedState);
        setTimeout(() => {
          this.setState({
            appOrientation: "column",
          });
        }, layOutChangeSpeed);
      })
      .catch((error) => console.log(error));
  }
  logout(e: any) {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("id");
    this.setState({
      titleSupText: "",
      titleSubText: "Track & Trace",
      authenticated: false,
      appOrientation: "row",
    });
  }
  displayInstructions(event: any) {
    event.preventDefault();
  }
  render() {
    return (
      <Route path="/">
        <ChakraProvider
          theme={extendTheme({
            styles: {
              global: (props: any) => ({
                body: {
                  bg: mode("#fcf6ef", "gray.800")(props),
                },
              }),
            },
          })}
        >
          <Helmet title={this.state.headerTitle} />
          <AnimatedFlex
            fontFamily="serif"
            justify={this.state.authenticated ? "space-between" : "flex-end"}
            align="center"
            pos="absolute"
            right="1"
            fontSize={{ base: "10px", md: "18px" }}
            w={{ base: "50%", md: "20%" }}
            layout={true}
          >
            <AnimatePresence>
              {this.state.authenticated && (
                <>
                  <AnimatedFlex
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    justify="space-evenly"
                    w="85%"
                    as="span"
                  >
                    <Link
                      _active={{ bgColor: "none", border: "none" }}
                      _focus={{ border: "none" }}
                      href="logout"
                      onClick={this.logout}
                    >
                      Logout
                    </Link>
                    <Link
                      _active={{ bgColor: "none", border: "none" }}
                      _focus={{ border: "none" }}
                      href="instructions"
                      onClick={this.displayInstructions}
                    >
                      Instructions
                    </Link>
                  </AnimatedFlex>
                </>
              )}
            </AnimatePresence>
            <ColorModeSwitcher />
          </AnimatedFlex>
          <Flex
            direction={{ base: "column", md: this.state.appOrientation }}
            justify={{ base: "stretch", md: "" }}
            align={{ base: "center", md: "" }}
            h="100vh"
          >
            <AnimatedFlex
              direction="column"
              align="center"
              justify={{
                base: "flex-end",
                md: this.state.authenticated ? "flex-end" : "center",
              }}
              w="75%"
              h="20%"
              textAlign="center"
              style={{ userSelect: "none" }}
            >
              <AppTitle
                subText={this.state.titleSubText}
                supText={this.state.titleSupText}
                titleOnly={this.state.authenticated}
              />
            </AnimatedFlex>
            <Box
              w={{ base: "100%", md: "50%" }}
              h={{ base: "75%", md: "100%" }}
            >
              <AnimatePresence>
                {!this.state.authenticated && (
                  <>
                    <AnimatedFlex
                      h="100%"
                      color="gray.700"
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, transition: { duration: 1 } }}
                    >
                      <AuthenticationPanel
                        setUserCredentials={this.setUserCredentials}
                      />
                    </AnimatedFlex>
                    <Redirect to="/login" />
                  </>
                )}
              </AnimatePresence>
              {this.state.authenticated && (
                <AnimatedFlex
                  initial={{ opacity: 0, display: "none" }}
                  animate={{ opacity: 1, display: "flex" }}
                  exit={{ opacity: 1, transition: { delay: 1, duration: 1 } }}
                  transition={{ delay: 1, duration: 1 }}
                  h="100%"
                  w="100%"
                  align="center"
                  justify="center"
                >
                  <Flex
                    width="75%"
                    h="50%"
                    direction="column"
                    justify="center"
                    align="center"
                  >
                    <UserServices />
                  </Flex>
                </AnimatedFlex>
              )}
            </Box>
          </Flex>
        </ChakraProvider>
      </Route>
    );
  }
}
