import { TypingAnimation } from "../miscellaneous/AnimatedChakraComponents";
import React from "react";
export default function ChangeFormButton(props: any) {
  return (
    <TypingAnimation
      text={(props.formType === "Register" ? "Log In" : "Sign Up") + " instead"}
      durationInMS={500}
      mb="5"
      border="1px solid transparent"
      fontSize={{ base: "8px", md: "12px" }}
      _hover={{
        textDecoration: "underline",
        cursor: "pointer",
      }}
      onClick={props.switchFormType}
    />
  );
}
