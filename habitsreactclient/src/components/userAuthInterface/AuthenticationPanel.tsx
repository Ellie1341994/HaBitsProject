import { useColorModeValue } from "@chakra-ui/react";
import { AnimatedFlex } from "../miscellaneous/AnimatedChakraComponents";
import { useState } from "react";
import React from "react";
import AuthenticationForm from "./AuthenticationForm";
import { Route } from "react-router-dom";
interface APProps {
  setUserCredentials: Function;
}
export default function AuthenticationPanel(props: APProps) {
  const lightGradientColor: any = { c1: "#7928CA", c2: "#FF0080" };
  const darkGradientColor: any = { c1: "#788389", c2: "#A77" };
  const gradientColors: any = useColorModeValue(
    lightGradientColor,
    darkGradientColor
  );
  const gradient: string =
    "linear(to-r," + gradientColors.c1 + "," + gradientColors.c2 + ")";
  const shadowType: any = {
    s1: "0 2px 1px 2px #000",
    s2: "0 2px 1px 2px #744",
  };
  const shadow: string = useColorModeValue(shadowType.s2, shadowType.s1);
  const variants: any = {
    intro: {
      opacity: 1,
      transition: {
        delay: 0.75,
        duration: 0.5,
      },
    },
    outro: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };
  function makeFormInformation(isLoginForm: boolean) {
    const formInformation: any = {
      title: "Sign Up",
      button: "Register",
      type: "Register",
    };
    if (isLoginForm) {
      for (let key of Object.keys(formInformation)) {
        for (let value of ["Log In", "Enter", "Log In"]) {
          formInformation[key] = value;
        }
      }
    }
    return formInformation;
  }
  const [displayAuthPanel, setDisplayAuthPanel] = useState(true);
  return (
    <AnimatedFlex
      initial={{ opacity: 0 }}
      animate={displayAuthPanel ? "intro" : "outro"}
      variants={variants}
      fontWeight="bold"
      direction="column"
      justifyContent="space-evenly"
      align="center"
      w={{ base: "75%", md: "65%" }}
      h={{ base: "90%", md: "75%" }}
      p="0"
      rounded="md"
      backgroundColor="gray.700"
      bgGradient={gradient}
      textAlign="center"
      boxShadow={shadow}
      color="white"
    >
      <Route
        path={["/login", "/register"]}
        exact={true}
        render={({ match, history }: any) => {
          return (
            <AuthenticationForm
              routeHistory={history}
              formInformation={makeFormInformation(
                match.path.includes("login")
              )}
              setDisplayAuthPanel={setDisplayAuthPanel}
              setUserCredentials={props.setUserCredentials}
            />
          );
        }}
      />
    </AnimatedFlex>
  );
}
