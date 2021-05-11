import { TypingAnimation } from "../miscellaneous/AnimatedChakraComponents";
import React from "react";
interface CFBProps {
  formType: string;
  switchFormType: (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => void;
}
export default function ChangeFormButton(props: CFBProps) {
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
