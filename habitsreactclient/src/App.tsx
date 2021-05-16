import * as React from "react";
import { ChakraProvider, extendTheme, Flex, Box } from "@chakra-ui/react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { mode } from "@chakra-ui/theme-tools";
import AuthenticationPanel from "./components/userAuthInterface/AuthenticationPanel";
import { AnimatePresence } from "framer-motion";
import { UserServices } from "./components/UserServices";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";
import AppTitle from "./components/AppTitle";
import AppTitleContainer from "./components/AppTitleContainer";
import AuthenticationPanelContainer from "./components/userAuthInterface/AuthenticationPanelContainer";
import UserServicesContainer from "./components/UserServicesContainer";
import { AppMenu } from "./components/AppMenu";
import { BrowserRouter as Router } from "react-router-dom";
import { HabitsMenu } from "./components/habitsInterface/HabitsMenu";
interface AppState {
  headerTitle: string;
  authenticated: boolean;
  userName?: string;
  bigScreensAppOrientation: any;
  userTitle: string;
  appTitle: string;
  secondAppSectionWidth: string;
  horribleDoubleRenderSolution: boolean;
  reloadCalendar: boolean;
}
interface AppProps {}

export class App extends React.Component<AppProps, AppState> {
  // https://github.com/chakra-ui/chakra-ui/issues/591
  constructor(props: any) {
    super(props);
    console.log("constructed");
    this.setUserCredentials = this.setUserCredentials.bind(this);
    this.setRealoadCalendar = this.setRealoadCalendar.bind(this);
    this.logout = this.logout.bind(this);
    const isUserAuthenticated: boolean = localStorage.getItem("token") !== null;
    let userTitle: string = "";
    if (isUserAuthenticated) {
      let storedUserNameValue: string = localStorage.getItem(
        "userName"
      ) as string;
      userTitle =
        storedUserNameValue[storedUserNameValue.length - 1] === "s"
          ? storedUserNameValue + "' "
          : storedUserNameValue + "'s ";
    }
    this.state = {
      secondAppSectionWidth: isUserAuthenticated ? "100%" : "50%",
      bigScreensAppOrientation: isUserAuthenticated ? "column" : "row",
      headerTitle: "HaBits ~ Track & Trace",
      appTitle: "HaBits",
      authenticated: isUserAuthenticated,
      userTitle: userTitle,
      horribleDoubleRenderSolution: isUserAuthenticated,
      reloadCalendar: false,
    };
  }
  URL: string = "http://127.0.0.1:8000";
  setRealoadCalendar() {
    this.setState((currentState: any, _currentProps: any) => {
      return { reloadCalendar: !currentState.reloadCalendar };
    });
  }
  setUserCredentials(layOutChangeSpeed: number) {
    const userURL: string = this.URL + "/user/";
    axios
      .get(userURL, {
        headers: { Authorization: "Token " + localStorage.getItem("token") },
      })
      .then((response) => {
        const userInfo: any = response.data.results[0];
        console.log(userInfo);
        localStorage.setItem("userName", userInfo.username);
        localStorage.setItem("userId", userInfo.id);
        localStorage.setItem("userURL", userInfo.url);
        let userTitle: string =
          userInfo.username[userInfo.username.length - 1] === "s"
            ? userInfo.username + "' "
            : userInfo.username + "'s ";
        let updatedState: any = {
          authenticated: true,
          userTitle: userTitle,
          titleSubText: "",
          bigScreensAppOrientation: "row",
          horribleDoubleRenderSolution: false,
        };
        this.setState(updatedState);
        // App Orientation for non-mobile/tablets screens changes only after
        // login or logout animations are finished.
        setTimeout(() => {
          this.setState({
            bigScreensAppOrientation: "column",
            secondAppSectionWidth: "100%",
            horribleDoubleRenderSolution: true,
          });
        }, layOutChangeSpeed);
      })
      .catch((error) => console.log(error));
  }
  logout(e: any) {
    e.preventDefault();
    for (let information of ["token", "userName", "id"]) {
      localStorage.removeItem(information);
    }
    this.setState({
      userTitle: "",
      authenticated: false,
      bigScreensAppOrientation: "row",
      secondAppSectionWidth: "50%",
    });
  }
  render() {
    return (
      <HelmetProvider>
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
          <Router>
            <Route path="/">
              <Helmet title={this.state.headerTitle} />
              <AppMenu
                displayAsUserMenu={this.state.authenticated}
                logOutUser={this.logout}
              >
                <HabitsMenu reloadCalendar={this.setRealoadCalendar} />
              </AppMenu>
              <Flex
                direction={{
                  base: "column",
                  md: this.state.bigScreensAppOrientation,
                }}
                justify={{ base: "stretch", md: "" }}
                align={{ base: "center", md: "" }}
                h="100vh"
              >
                <AppTitleContainer
                  displayAsUserTitle={this.state.authenticated}
                >
                  <AppTitle
                    userTitle={this.state.userTitle}
                    titleOnly={this.state.authenticated}
                  />
                </AppTitleContainer>
                <Box
                  w={{
                    base: "100%",
                    md: this.state.secondAppSectionWidth,
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
                        <UserServices
                          hasRenderedTwice={
                            this.state.horribleDoubleRenderSolution
                          }
                          calendarReloadKey={this.state.reloadCalendar}
                        />
                      </UserServicesContainer>
                    </>
                  )}
                </Box>
              </Flex>
            </Route>
          </Router>
        </ChakraProvider>
      </HelmetProvider>
    );
  }
}
/*
export class App extends React.Component<AppProps, AppState> {
  // https://github.com/chakra-ui/chakra-ui/issues/591
  constructor(props: any) {
    super(props);
    this.setUserCredentials = this.setUserCredentials.bind(this);
    this.logout = this.logout.bind(this);
    const isUserAuthenticated: boolean = localStorage.getItem("token") !== null;
    let userTitle: string = "";
    if (isUserAuthenticated) {
      let storedUserNameValue: string = localStorage.getItem(
        "userName"
      ) as string;
      userTitle =
        storedUserNameValue[storedUserNameValue.length - 1] === "s"
          ? storedUserNameValue + "' "
          : storedUserNameValue + "'s ";
    }
    this.state = {
      secondAppSectionWidth: isUserAuthenticated ? "100%" : "50%",
      bigScreensAppOrientation: isUserAuthenticated ? "column" : "row",
      headerTitle: "HaBits ~ Track & Trace",
      appTitle: "HaBits",
      authenticated: isUserAuthenticated,
      userTitle: userTitle,
      horribleDoubleRenderSolution: isUserAuthenticated,
    };
  }
  URL: string = "http://127.0.0.1:8000";
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
        let userTitle: string =
          userInfo.username[userInfo.username.length - 1] === "s"
            ? userInfo.username + "' "
            : userInfo.username + "'s ";
        let updatedState: any = {
          authenticated: true,
          userTitle: userTitle,
          titleSubText: "",
          bigScreensAppOrientation: "row",
          horribleDoubleRenderSolution: false,
        };
        this.setState(updatedState);
        // App Orientation for non-mobile/tablets screens changes only after
        // login or logout animations are finished.
        setTimeout(() => {
          this.setState({
            bigScreensAppOrientation: "column",
            secondAppSectionWidth: "100%",
            horribleDoubleRenderSolution: true,
          });
        }, layOutChangeSpeed);
      })
      .catch((error) => console.log(error));
  }
  logout(e: any) {
    e.preventDefault();
    for (let information of ["token", "userName", "id"]) {
      localStorage.removeItem(information);
    }
    this.setState({
      userTitle: "",
      authenticated: false,
      bigScreensAppOrientation: "row",
      secondAppSectionWidth: "50%",
    });
  }
  render() {
    return (
      <HelmetProvider>
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
                  userTitle={this.state.userTitle}
                  titleOnly={this.state.authenticated}
                />
              </AppTitleContainer>
              <Box
                w={{
                  base: "100%",
                  md: this.state.secondAppSectionWidth,
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
                      <UserServices
                        hasRenderedTwice={
                          this.state.horribleDoubleRenderSolution
                        }
                      />
                    </UserServicesContainer>
                  </>
                )}
              </Box>
            </Flex>
          </ChakraProvider>
        </Route>
      </HelmetProvider>
    );
  }
}
 */
