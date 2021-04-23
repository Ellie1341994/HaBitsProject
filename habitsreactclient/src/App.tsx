import * as React from "react";
import { ChakraProvider, extendTheme, Flex, Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { mode } from "@chakra-ui/theme-tools";
import AuthenticationPanel from "./components/AuthenticationPanel";
import { AnimatePresence } from "framer-motion";
import { UserServices } from "./components/userServices";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import AppTitle from "./components/AppTitle";
import AppTitleContainer from "./components/AppTitleContainer";
import AuthenticationPanelContainer from "./components/AuthenticationPanelContainer";
import UserServicesContainer from "./components/UserServicesContainer";
import { AppMenu } from "./components/AppMenu";
interface AppState {
  headerTitle: string;
  authenticated: boolean;
  userName?: string;
  bigScreensAppOrientation: any;
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
    const isUserAuthenticated: boolean = localStorage.getItem("token") !== null;
    this.state = {
      bigScreensAppOrientation: isUserAuthenticated ? "column" : "row",
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
          bigScreensAppOrientation: "row",
        };
        this.setState(updatedState);
        // App Orientation for non-mobile/tablets screens changes only after
        // login or logout animations are finished.
        setTimeout(() => {
          this.setState({
            bigScreensAppOrientation: "column",
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
      bigScreensAppOrientation: "row",
    });
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
          <AppMenu
            displayAsUserMenu={this.state.authenticated}
            logOutUser={this.logout}
          />
          <Flex
            direction={{
              base: "column",
              md: this.state.bigScreensAppOrientation,
            }}
            justify={{ base: "stretch", md: "" }}
            align={{ base: "center", md: "" }}
            h="100vh"
          >
            <AppTitleContainer displayAsUserTitle={this.state.authenticated}>
              <AppTitle
                subText={this.state.titleSubText}
                supText={this.state.titleSupText}
                titleOnly={this.state.authenticated}
              />
            </AppTitleContainer>
            <Box
              w={{
                base: "100%",
                md: this.state.authenticated ? "100%" : "50%",
              }}
              h={{ base: "75%", md: "100%" }}
            >
              <AnimatePresence>
                {!this.state.authenticated && (
                  <>
                    <AuthenticationPanelContainer>
                      <AuthenticationPanel
                        setUserCredentials={this.setUserCredentials}
                      />
                    </AuthenticationPanelContainer>
                    <Redirect to="/login" />
                  </>
                )}
              </AnimatePresence>
              {this.state.authenticated && (
                <>
                  <UserServicesContainer>
                    <UserServices />
                  </UserServicesContainer>
                </>
              )}
            </Box>
          </Flex>
        </ChakraProvider>
      </Route>
    );
  }
}
