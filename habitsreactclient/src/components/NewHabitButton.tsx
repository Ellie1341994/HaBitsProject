import * as React from "react";
import { Box, Flex, Link } from "@chakra-ui/react";

import { AiOutlinePlusCircle } from "react-icons/ai";
export class NewHabitButton extends React.Component<any, any> {
  render() {
    return (
      <Link fontSize={{ base: "10px", md: "14px" }} variant="unstyled">
        <Flex direction="row" align="center" justifyContent="space-evenly">
          <AiOutlinePlusCircle
            style={{ paddingLeft: "0%", paddingRight: "4%" }}
            size={window.innerWidth < 667 ? "14px" : "16px"}
          />
          New Habit
        </Flex>
      </Link>
    );
  }
}
