import * as React from "react";
import { Flex, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import {
  AnimatedFlex,
  TypingAnimation,
} from "../miscellaneous/AnimatedChakraComponents";
import { Calendar } from "@nivo/calendar";
//import { ResponsiveCalendar } from "@nivo/calendar";
export function HabitCalendar(props: any): any {
  const color: any = useColorModeValue(
    { textColor: "#333", monthBorderColor: "#3337" },
    { textColor: "white", monthBorderColor: "#fff7" }
  );
  const darkColors: any = ["#788389", "#927d80", "#A77"];
  const lightColors: any = ["#7928CA", "#bc14a5", "#FF0080"];
  const entryColor: string[] = useColorModeValue(lightColors, darkColors);
  const [isWLessThan600] = useMediaQuery("(max-width: 600px)");
  //console.log(props.data);
  if (props.data?.length > 0) {
    return (
      <Flex
        h="100%"
        justify={{ base: "flex-start", md: "center" }}
        align="center"
        overflowX={{ base: "scroll", md: "auto" }}
        w={{ base: "100%", md: "90%" }}
      >
        <Calendar
          width={
            isWLessThan600 ? window.innerWidth * 2 : window.innerWidth * 0.8
          }
          height={150}
          theme={{ textColor: color.textColor }}
          data={props.data ? props.data : []}
          from={props.startDate}
          to={props.endDate}
          minValue={1}
          maxValue={3}
          emptyColor="#eee0"
          colors={entryColor}
          margin={{
            top: window.innerHeight * 0.01,
            right: 0,
            bottom: 1,
            left: 50,
          }}
          onClick={(event: any) => {
            if (event.data) {
              props.popTrackInformation(event.data.url);
            }
          }}
          tooltip={(_d: any) => <></>}
          yearSpacing={0}
          monthSpacing={20}
          monthBorderWidth={0}
          monthBorderColor={color.monthBorderColor}
          dayBorderWidth={0}
          daySpacing={2}
          dayBorderColor="#fff0"
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
  } else if (props.data) {
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
  } else return <></>;
}
