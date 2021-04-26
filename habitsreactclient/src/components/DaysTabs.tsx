import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { TypingAnimation } from "./AnimatedChakraComponents";
export default function DaysTabs() {
  const week: string[] = [
    "Saturday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Sunday",
  ];
  const dayElements: any = [];
  for (let day of week) {
    let dayElement: any = (
      <Flex
        key={day}
        position="relative"
        justify="center"
        align="center"
        boxShadow="md"
        w="14%"
        h="100%"
      >
        <TypingAnimation
          w="80%"
          isTruncated={true}
          delayInMS={1500}
          fontWeight="bold"
          writeOnly={true}
          color="gray.700"
          onMountOnly={true}
          fontFamily="serif"
          textAlign="center"
          fontSize={{ base: "8px", md: "14px" }}
          text={day}
        />
      </Flex>
    );
    dayElements.push(dayElement);
  }

  return (
    <Flex w="100%" h="10%" justify="space-evenly" align="center">
      {dayElements}
    </Flex>
  );
}
