import * as React from "react";
import { AnimatedFlex } from "./miscellaneous/AnimatedChakraComponents";

export default function UserServicesContainer(props: any) {
  return (
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
      {props.children}
    </AnimatedFlex>
  );
}
