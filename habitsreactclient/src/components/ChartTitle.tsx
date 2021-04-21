import * as React from "react";
import { TypingAnimation } from "./AnimatedChakraComponents";
export class ChartTitle extends React.Component<any, any> {
  render() {
    return (
      <TypingAnimation
        writeOnly={true}
        durationInMS={500}
        fontWeight="bold"
        fontFamily="serif"
        animateOnMount={true}
        text={"ASD"}
        fontSize="lg"
      />
    );
  }
}
