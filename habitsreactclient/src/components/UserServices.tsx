import { HabitCalendarInterface } from "./habitCalendar/HabitCalendarInterface";
import { HabitsInterface } from "./habitsInterface/HabitsInterface";
import * as React from "react";
import { Flex } from "@chakra-ui/react";
export class UserServices extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { reloadCalendar: false };
    this.setRealoadCalendar = this.setRealoadCalendar.bind(this);
  }
  setRealoadCalendar() {
    this.setState((currentState: any, _currentProps: any) => {
      return { reloadCalendar: !currentState.reloadCalendar };
    });
  }
  render() {
    return (
      <Flex width="100%" h="100%" direction="column" align="center">
        <HabitCalendarInterface key={String(this.state.reloadCalendar)} />
        <HabitsInterface reloadCalendar={this.setRealoadCalendar} />
      </Flex>
    );
  }
}
