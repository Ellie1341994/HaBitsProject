import { HabitCalendarInterface } from "./habitCalendar/HabitCalendarInterface";
import { HabitsInterface } from "./habitsInterface/HabitsInterface";
import * as React from "react";
import { Flex } from "@chakra-ui/react";
export class UserServices extends React.Component<any, any> {
  render() {
    return (
      <Flex width="100%" h="100%" direction="column" align="center">
        <HabitCalendarInterface />
        <HabitsInterface />
      </Flex>
    );
  }
}
