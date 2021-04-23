import * as React from "react";
import { Flex } from "@chakra-ui/react";

export default function AppTitleContainer(props: any) {
  return (
    <Flex
      direction="column"
      align="center"
      justify={{
        base: "flex-end",
        md: props.displayAsUserTitle ? "flex-end" : "center",
      }}
      w="75%"
      h="20%"
      textAlign="center"
      style={{ userSelect: "none" }}
    >
      {props.children}
    </Flex>
  );
}
