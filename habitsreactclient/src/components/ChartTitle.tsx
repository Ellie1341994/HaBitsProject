import * as React from "react";
import { VStack, Text } from "@chakra-ui/react";
import { TypingAnimation } from "./AnimatedChakraComponents";
export class ChartTitle extends React.Component<any, any> {
  render() {
    return (
      <Text
        isTruncated={true}
        style={{ border: "none" }}
        textAlign="center"
        fontWeight="bold"
        fontFamily="serif"
        fontSize={{ base: "12px", md: "14px" }}
      >
        {this.props.text}
      </Text>
    );
  }
}
