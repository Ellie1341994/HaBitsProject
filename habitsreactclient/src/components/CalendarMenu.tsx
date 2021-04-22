import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { NewHabitButton } from "./NewHabitButton";
import { OldHabitsButton } from "./OldHabitsButton";
export default function CalendarMenu() {
  return (
    <Flex h="10%" pl="2" pr="2" w="100%" align="center">
      <NewHabitButton />
      <OldHabitsButton />
    </Flex>
  );
}
