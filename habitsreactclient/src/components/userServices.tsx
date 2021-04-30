import { HabitChart } from "./habitChart";
import { HabitsCalendar } from "./HabitsCalendar";
import * as React from "react";
import { Flex } from "@chakra-ui/react";
export class UserServices extends React.Component<any, any> {
  render() {
    return (
      <Flex
        width="100%"
        justify="center"
        h="100%"
        direction="column"
        align="center"
      >
        <HabitChart />
        <HabitsCalendar />
      </Flex>
    );
  }
}
