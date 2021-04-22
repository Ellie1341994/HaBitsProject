import * as React from "react";
import { Box, Flex, Link } from "@chakra-ui/react";
import { AiOutlineFile } from "react-icons/ai";
export class OldHabitsButton extends React.Component<any, any> {
  render() {
    return (
      <Link
        mb="1"
        mr="1"
        fontSize={{ base: "10px", md: "14px" }}
        variant="unstyled"
      >
        <Flex direction="row" align="center" justifyContent="space-evenly">
          <AiOutlineFile />
          Old Habits
        </Flex>
      </Link>
    );
  }
}
