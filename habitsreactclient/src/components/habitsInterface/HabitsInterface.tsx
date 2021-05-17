import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { Habits } from "./Habits";

export class HabitsInterface extends React.Component<any, any> {
  render() {
    return (
      <Flex
        position="relative"
        h={"80%"}
        w="100%"
        align="center"
        justify="center"
      >
        <Flex
          overflowY="scroll"
          position="relative"
          h="100%"
          w="90%"
          direction="column"
          align="center"
        >
          <Habits
            themeProps={this.props.themeProps}
            data={this.props.userHabitData}
          />
        </Flex>
      </Flex>
    );
  }
}
