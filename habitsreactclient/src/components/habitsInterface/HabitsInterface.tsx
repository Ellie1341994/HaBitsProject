import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { Habits } from "./Habits";

export class HabitsInterface extends React.Component<any, any> {
  render() {
    return (
      <Flex h="75%" w="100%" align="center" justify="center">
        <Flex position="relative" h="90%" w="90%" direction="column">
          <Habits
            themeProps={this.props.themeProps}
            data={this.props.userHabitData}
          />
        </Flex>
      </Flex>
    );
  }
}
