import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { Habits } from "./Habits";

export class HabitsInterface extends React.Component<any, any> {
  render() {
    return (
      <Flex
        position="relative"
        h={"75%"}
        w="100%"
        align="flex-end"
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
            setReloadUserServices={this.props.setReloadUserServices}
            themeProps={this.props.themeProps}
            data={this.props.userHabitData}
          />
        </Flex>
      </Flex>
    );
  }
}
