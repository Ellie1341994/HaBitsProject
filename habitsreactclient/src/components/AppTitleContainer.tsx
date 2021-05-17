import * as React from "react";
import { Flex } from "@chakra-ui/react";

export default function AppTitleContainer(props: any) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="flex-end"
      w="75%"
      mt="10vh"
      mb="2.5vh"
      textAlign="center"
      style={{ userSelect: "none" }}
    >
      {props.children}
    </Flex>
  );
}
