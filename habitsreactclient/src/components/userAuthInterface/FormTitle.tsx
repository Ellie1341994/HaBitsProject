import { Heading, Flex } from "@chakra-ui/react";
import { TypingAnimation } from "../miscellaneous/AnimatedChakraComponents";
import React from "react";
export default function FormTitle(props: any) {
  return (
    <Flex
      justify="center"
      align="center"
      h="20%"
      w="75%"
      pt="4"
      pb="4"
      fontSize={{ base: "18px", md: "36px" }}
    >
      <Heading as="h2" fontFamily="serif">
        <TypingAnimation text={props.formTitle} durationInMS={500} />
      </Heading>
    </Flex>
  );
}
