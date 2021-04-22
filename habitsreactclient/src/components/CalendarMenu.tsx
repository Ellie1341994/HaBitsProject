import * as React from "react";
import { Box, Flex, Link } from "@chakra-ui/react";
import { TypingAnimation } from "./AnimatedChakraComponents";
import { NewHabitButton } from "./NewHabitButton";
export default function CalendarMenu() {
  return (
    <Flex h="10%" pl="2" pr="2" w="100%" align="center">
      <NewHabitButton />
    </Flex>
  );
}
