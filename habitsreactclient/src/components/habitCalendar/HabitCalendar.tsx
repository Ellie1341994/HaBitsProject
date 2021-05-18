import * as React from "react";
import { Flex, useColorModeValue, useMediaQuery } from "@chakra-ui/react";
import { Calendar } from "@nivo/calendar";

export function HabitCalendar(props: any): any {
  const color: any = useColorModeValue(
    {
      textColor: "#333",
      monthBorderColor: "#3337",
      calendarNoEntryColor: "#edd",
    },
    {
      textColor: "white",
      monthBorderColor: "#fff7",
      calendarNoEntryColor: "#56565680",
    }
  );
  const darkColors: any = ["#788389", "#927d80", "#A77"];
  const lightColors: any = ["#7928CA", "#bc14a5", "#FF0080"];
  const entryColor: string[] = useColorModeValue(lightColors, darkColors);
  const [isWLessThan600] = useMediaQuery("(max-width: 600px)");
  const calendarWidth: number = isWLessThan600
    ? window.innerWidth * 3
    : window.innerWidth * 0.8;
  //console.log(props.data);
  return (
    <Flex
      h="100%"
      justify={{ base: "flex-start", md: "center" }}
      align="center"
      overflowX={{ base: "scroll", md: "auto" }}
      w={{ base: "100%", md: "90%" }}
    >
      <Calendar
        width={calendarWidth}
        height={150}
        theme={{ textColor: color.textColor }}
        data={props.data ? props.data : []}
        from={props.startDate}
        to={props.endDate}
        minValue={1}
        maxValue={3}
        emptyColor={"#eee0"}
        colors={entryColor}
        margin={{
          top: 5,
          right: 0,
          bottom: 1,
          left: 50,
        }}
        onClick={(event: any) => {
          if (event?.data) {
            props.popTrackInformation(event.data.url);
          }
        }}
        tooltip={(_d: any) => <></>}
        yearSpacing={0}
        monthSpacing={20}
        monthBorderWidth={0}
        monthBorderColor={color.monthBorderColor}
        dayBorderWidth={1}
        daySpacing={0}
        dayBorderColor={color.calendarNoEntryColor}
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
}
