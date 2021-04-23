import * as React from "react";
import { AnimatedFlex } from "./AnimatedChakraComponents";

export default function AppTitleContainer(props: any) {
  return (
    <AnimatedFlex
      h="100%"
      color="gray.700"
      direction="column"
      justifyContent="center"
      alignItems="center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1 } }}
    >
      {props.children}
    </AnimatedFlex>
  );
}
