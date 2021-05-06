import * as React from "react";
import { Flex, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { TypingAnimation } from "./AnimatedChakraComponents";
import { ResponsiveCalendar } from "@nivo/calendar";
export default function HabitCalendar(props: any): any {
  const color: any = useColorModeValue(
    { textColor: "gray.700" },
    { textColor: "white" }
  );
  const darkColors: any = ["#788389", "#927d80", "#A77"];
  const lightColors: any = ["#7928CA", "#bc14a5", "#FF0080"];
  const entryColor: string[] = useColorModeValue(lightColors, darkColors);
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
  if (props.data?.length > 0) {
    return (
      <Flex
        justify="center"
        align="center"
        h="100%"
        w={{ base: "100%", md: "90%" }}
      >
        <ResponsiveCalendar
          theme={color}
          data={props.data ? props.data : []}
          from={props.startDate}
          to={props.endDate}
          minValue={1}
          maxValue={3}
          emptyColor="#eeeeee"
          colors={entryColor}
          margin={{
            top: isSmallerThan600 ? 0 : 20,
            right: 0,
            bottom: 2,
            left: 0,
          }}
          onClick={(event: any) => {
            if (event.data) {
              props.popTrackInformation(event.data.url);
            }
          }}
          yearSpacing={0}
          monthSpacing={10}
          monthBorderColor="#fff0"
          dayBorderWidth={1}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left",
            },
          ]}
        />
      </Flex>
    );
  } else if (props.data === []) {
    return (
      <TypingAnimation
        w="100%"
        animateAlways={true}
        writeOnly={true}
        text={
          "Selected HaBit is too new to diplay its information on the Calendar!"
        }
      />
    );
  } else {
    return <></>;
  }
}
