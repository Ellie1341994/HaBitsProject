import * as React from "react";
import { VStack } from "@chakra-ui/react";
import { TypingAnimation } from "./AnimatedChakraComponents";
export class ChartTitle extends React.Component<any, any> {
  render() {
    return (
      <VStack w="80px">
        <TypingAnimation
          isTruncated={true}
          style={{ border: "none" }}
          textAlign="center"
          writeOnly={true}
          durationInMS={500}
          fontWeight="bold"
          onMountOnly={true}
          fontFamily="serif"
          fontSize={{ base: "12px", md: "14px" }}
          text={"ASD "}
        />
      </VStack>
    );
  }
}
