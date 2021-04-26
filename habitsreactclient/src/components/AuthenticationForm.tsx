import { Flex } from "@chakra-ui/react";
import { AnimatedFlex } from "./AnimatedChakraComponents";
import React from "react";
import axios from "axios";
import Fields from "./Fields";
import FormTitle from "./FormTitle";
import ChangeFormButton from "./ChangeFormButton";
import AuthenticationFormButton from "./AuthenticationFormButton";

interface APState {
  formType: string;
  loggedIn: string | undefined;
  formTitle: "Sign Up" | "Log In";
  formActionButtonName: "Register" | "Enter";
  messagesHeaderText: string;
  requestFeedbackMessages: string;
  popInfo: any;
}

interface APProps {
  setDisplayAuthPanel: any;
  formInformation: any;
  routeHistory: any;
  setUserCredentials: any;
}
export default class AuthenticationForm extends React.Component<
  APProps,
  APState
> {
  URL: string = "http://127.0.0.1:8000";
  registerFields: any = { username: "", password1: "", email: "" };
  constructor(props: any) {
    super(props);
    this.state = {
      messagesHeaderText: "Error(s)",
      requestFeedbackMessages: "",
      formType: this.props.formInformation.type,
      loggedIn: undefined,
      formTitle: this.props.formInformation.title,
      formActionButtonName: this.props.formInformation.button,
      popInfo: undefined,
    };
    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.handleFormTypeChange = this.handleFormTypeChange.bind(this);
    this.setPopOverHandler = this.setPopOverHandler.bind(this);
  }
  handleChange(event: any) {
    const field: string = event.target.name;
    const value: string = event.target.value;
    this.registerFields[field] = value;
  }
  handleFormTypeChange(_event?: any) {
    if (this.state.formType === "Register") {
      this.props.routeHistory.push("/login");
      this.setState({
        formType: "Log In",
        formTitle: "Log In",
        formActionButtonName: "Enter",
      });
    } else {
      this.props.routeHistory.push("/register");
      this.setState({
        formType: "Register",
        formTitle: "Sign Up",
        formActionButtonName: "Register",
      });
    }
  }
  register(event: any) {
    event.preventDefault();
    const registerURL: string = this.URL + "/registration/";
    let data = this.registerFields;
    data["password2"] = data.password1;
    console.log(data);
    axios
      .post(registerURL, data)
      .then((response) => {
        console.log(response);
        if (response.status !== 400) {
          this.setState({
            messagesHeaderText: "Information",
            requestFeedbackMessages:
              "Registration successful\nYou may login into your account now",
          });
          this.handleFormTypeChange();
        }
      })
      .catch((reason) => {
        const r: any = reason.response;
        const errorsPerField: any = r.data;
        let errorMessages: string = "";
        for (let errors of Object.values(errorsPerField)) {
          errorMessages += (errors as []).join("\n") + "\n";
        }
        this.setState({
          messagesHeaderText: "Error(s)",
          requestFeedbackMessages: errorMessages,
        });
      });
    setTimeout(this.state.popInfo, 250, true);
  }
  login(event: any) {
    event.preventDefault();
    const loginURL: string = this.URL + "/login/";
    const userListURL = this.URL + "/user/";
    const postData = {
      username: this.registerFields.username,
      password: this.registerFields.password1,
    };
    axios
      .post(loginURL, postData)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const token: string = response.data.key;
          this.setState({
            messagesHeaderText: "Information",
            requestFeedbackMessages: "Successfully logged in",
          });
          localStorage.setItem("token", token);
          axios
            .get(userListURL, {
              headers: {
                Authorization: "Token " + token,
              },
            })
            .then((response) => console.log(response.data))
            .catch((e) => console.log(e));
          setTimeout(() => {
            this.props.setUserCredentials(1000);
          }, 1000);
        }
      })
      .catch((reason) => {
        if (reason.response.status === 400) {
          const r: any = reason.response;
          const errorsPerField: any = r.data;
          console.log(errorsPerField);
          let errorMessages: string = "";
          for (let errors of Object.values(errorsPerField)) {
            errorMessages += (errors as []).join("\n") + "\n";
          }
          this.setState({
            messagesHeaderText: "Error(s)",
            requestFeedbackMessages: errorMessages,
          });
        }
      });
    setTimeout(this.state.popInfo, 250, true);
  }
  setPopOverHandler(handlerCallback: any) {
    this.setState({ popInfo: handlerCallback });
  }
  render() {
    return (
      <>
        <form
          onSubmit={
            this.state.formType === "Register" ? this.register : this.login
          }
          style={{ userSelect: "none", width: "100%", height: "100%" }}
        >
          <Flex
            direction="column"
            justify="space-between"
            align="center"
            height="100%"
          >
            <FormTitle formTitle={this.state.formTitle} />
            <AnimatedFlex
              h="60%"
              w="100%"
              direction="column"
              justify="space-evenly"
              align="center"
              layout={true}
            >
              <Fields
                fields={["username", "password", "e-mail"]}
                formType={this.state.formType}
                handleUserInput={this.handleChange}
              />
            </AnimatedFlex>
            <Flex
              direction="column"
              align="center"
              textAlign="center"
              h="20%"
              w="75%"
              justify="space-between"
            >
              <AuthenticationFormButton
                headerText={this.state.messagesHeaderText}
                bodyText={this.state.requestFeedbackMessages}
                name={this.state.formActionButtonName}
                popOverHandler={this.setPopOverHandler}
              />
              <ChangeFormButton
                formType={this.state.formType}
                switchFormType={this.handleFormTypeChange}
              />
            </Flex>
          </Flex>
        </form>
      </>
    );
  }
}
