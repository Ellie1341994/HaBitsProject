import * as React from "react";
import { Flex, Link } from "@chakra-ui/react";

import { BsPlus } from "react-icons/bs";
export class NewHabitButton extends React.Component<any, any> {
  render() {
    return (
      <Link
        mb="1"
        mr="1"
        fontSize={{ base: "10px", md: "14px" }}
        variant="unstyled"
      >
        <Flex direction="row" align="center" justifyContent="space-evenly">
          <BsPlus />
          New Habit
        </Flex>
      </Link>
    );
  }
}
