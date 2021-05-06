import * as React from "react";
import { Flex } from "@chakra-ui/react";
import CalendarMenu from "./CalendarMenu";

export class HabitsInterface extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Flex h="75%" w="100%" align="center" justify="center">
        <Flex
          position="relative"
          boxShadow="lg"
          bgColor="lightgray"
          rounded="md"
          h="90%"
          w="90%"
          justify="center"
          direction="column"
        >
          <CalendarMenu />
        </Flex>
      </Flex>
    );
  }
}
