import * as React from "react";
import { Text, Box, Button, Link, Grid, GridItem } from "@chakra-ui/react";
import {
  AnimatedFlex,
  AnimatedBox,
  TypingAnimation,
} from "../miscellaneous/AnimatedChakraComponents";
export function Habits(props: any) {
  const habits: any = props.data;
  console.log(habits);
  const components: any = [];
  if (habits) {
    let index: number = 0;
    let getHabitTime: Function = (date: string) =>
      new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    for (let habit of habits) {
      let habitStartTime: string = getHabitTime(habit.startTime);
      let habitEndTime: string = getHabitTime(habit.endTime);
      let habitDay: string = days[new Date(habit.endTime).getDay()];
      const habitComponent: any = (
        <AnimatedBox
          key={habit.name}
          boxShadow="md"
          w="100%"
          rounded="md"
          bgGradient={props.themeProps.gradient}
          p="0.5"
          m="0.5"
        >
          <AnimatedFlex
            textColor={props.themeProps.textColor}
            bgColor={props.themeProps.bgColor}
            boxShadow="md"
            rounded="md"
            w="100%"
            direction="column"
            fontSize={{ base: "xs", md: "sm" }}
          >
            <AnimatedFlex
              flexWrap="wrap"
              justify="space-evenly"
              w="100%"
              whiteSpace="nowrap"
            >
              <Text
                rounded="md"
                w="100%"
                textAlign="center"
                p="1"
                as="h2"
                fontSize={{ base: "sm", md: "lg" }}
                textTransform="capitalize"
                fontFamily="serif"
                fontWeight="bold"
                className={"habitEntryTitle"}
              >
                {habit.name}
              </Text>
              <AnimatedFlex rounded="md" w="100%" justify="space-evenly">
                <Text p="1">
                  <strong>Starts:</strong> {habitStartTime + " " + habitDay}
                </Text>
                <Text p="1">
                  <strong>Ends:</strong> {habitEndTime + " " + habitDay}
                </Text>
              </AnimatedFlex>
              <Box rounded="md" whiteSpace="initial">
                <Text p="1">
                  {(() => {
                    let a: string = "";
                    for (let i = 0; i < 500; i++) {
                      a = i % 10 === 0 ? a + " " : a + "t";
                    }
                    return a; //habit.description;
                  })()}
                </Text>
              </Box>
              <AnimatedFlex rounded="md" w="100%" justify="flex-end">
                <Button
                  pr="1"
                  pl="1"
                  mr="1"
                  ml="1"
                  bgGradient={props.themeProps.altGradient}
                  bgClip="text"
                  variant="unstyled"
                  size="xs"
                >
                  Check!
                </Button>
                <Button
                  size="xs"
                  variant="unstyled"
                  pr="1"
                  pl="1"
                  mr="1"
                  ml="1"
                >
                  Edit
                </Button>
                <Button
                  size="xs"
                  variant="unstyled"
                  pr="1"
                  pl="1"
                  mr="1"
                  ml="1"
                >
                  Delete
                </Button>
              </AnimatedFlex>
            </AnimatedFlex>
          </AnimatedFlex>
        </AnimatedBox>
      );
      components.push(habitComponent);
      index++;
    }
  }
  return (
    <>
      <style>{".habitEntryTitle::first-letter { color: red;"}</style>
      {components}
    </>
  );
}
