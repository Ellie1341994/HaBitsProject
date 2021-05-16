import { HabitCalendarInterface } from "./habitCalendar/HabitCalendarInterface";
import { HabitsInterface } from "./habitsInterface/HabitsInterface";
import * as React from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";
export function UserServices(props: any) {
  const [userHabitData, setUserHabitData] = React.useState(undefined);
  const lightColors: any = {
    bgColor: "#fff",
    text: "#333",
    gradient: { c1: "#7928CA", c2: "#FF0080" },
  };
  const darkColors: any = {
    bgColor: "#333",
    text: "#fff",
    gradient: { c1: "#788389", c2: "#A77" },
  };
  let colorMode: any = useColorModeValue(lightColors, darkColors);
  let gradient: string =
    "linear(to-r," + colorMode.gradient.c1 + "," + colorMode.gradient.c2 + ")";
  let altGradient: string =
    "linear(to-r," + colorMode.gradient.c2 + "," + colorMode.gradient.c1 + ")";
  let textColor: any = colorMode.text;
  let bgColor: any = colorMode.bgColor;

  return (
    <Flex width="100%" h="100%" direction="column" align="center">
      <HabitCalendarInterface
        liftUserHabitDataUp={setUserHabitData}
        key={String(props.calendarReloadKey)}
      />
      <HabitsInterface
        themeProps={{ gradient, altGradient, textColor, bgColor }}
        userHabitData={userHabitData}
      />
    </Flex>
  );
}
