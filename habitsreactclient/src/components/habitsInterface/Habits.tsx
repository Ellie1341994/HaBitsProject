import * as React from "react";
import axios from "axios";
import { Text, Box, Button } from "@chakra-ui/react";
import {
  AnimatedFlex,
  AnimatedBox,
} from "../miscellaneous/AnimatedChakraComponents";
import { HabitFormModal } from "./HabitFormModal";
function DailyReviewButton(props: any) {
  const habitDay: number = new Date(props.habitInfo.startTime).getDay();
  const currentDay: number = new Date().getDay();
  const habitIsToday: boolean = habitDay === currentDay;
  const [show, setShow] = React.useState(
    props.habitInfo?.tracks.length === 0 && habitIsToday
  );
  const headers: any = {
    Authorization: "Token " + localStorage.getItem("token"),
  };
  React.useEffect(() => {
    if (show === false) {
      let todayDate: Date = new Date();
      let today: string = todayDate
        .toISOString()
        .substr(0, todayDate.toISOString().indexOf("T"));
      axios
        .get(props.habitInfo?.tracks[0], { headers: headers })
        .then((response) => {
          let trackDate: string = response.data.dateCreated.substr(
            0,
            response.data.dateCreated.indexOf("T")
          );
          setShow(trackDate !== today && habitIsToday);
        })
        .catch((e) => console.log(e));
    }
  });
  if (show) {
    return (
      <Button
        onClick={(event: any) => {
          event.preventDefault();
          props.setFormModalDisplayInformation({
            isOpen: true,
            type: "Review",
            url: props.habitInfo.url,
            name: props.habitInfo.name,
          });
        }}
        _focus={{ border: "none" }}
        pr="1"
        pl="1"
        mr="1"
        ml="1"
        bgGradient={props.themeProps.gradientText}
        bgClip="text"
        variant="unstyled"
        size="xs"
      >
        Daily Check!
      </Button>
    );
  } else {
    return <></>;
  }
}
export function Habits(props: any) {
  const habits: any = props.data;
  const [
    formModalDisplayInformation,
    setFormModalDisplayInformation,
  ] = React.useState({ isOpen: false, type: "default", url: "", name: "" });
  function closeModal() {
    setFormModalDisplayInformation({
      isOpen: false,
      type: "default",
      url: "",
      name: "",
    });
  }
  const components: any = [];
  if (habits) {
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
          w="95%"
          rounded="md"
          bgGradient={props.themeProps.gradient}
          p="1"
          m="1.5"
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
                <Text p="1"> {habit.description} </Text>
              </Box>
              <AnimatedFlex rounded="md" w="100%" justify="flex-end">
                <Button
                  size="xs"
                  variant="unstyled"
                  pr="1"
                  pl="1"
                  mr="1"
                  ml="1"
                  _focus={{ border: "none" }}
                  onClick={(event: any) => {
                    event.preventDefault();
                    setFormModalDisplayInformation({
                      isOpen: true,
                      type: "Edit",
                      url: habit.url,
                      name: habit.name,
                    });
                  }}
                >
                  Edit
                </Button>
                <DailyReviewButton
                  habitInfo={habit}
                  themeProps={props.themeProps}
                  setFormModalDisplayInformation={
                    setFormModalDisplayInformation
                  }
                />
              </AnimatedFlex>
            </AnimatedFlex>
          </AnimatedFlex>
        </AnimatedBox>
      );
      components.push(habitComponent);
    }
  }
  return (
    <>
      <HabitFormModal
        reloadUS={props.setReloadUserServices}
        isOpen={formModalDisplayInformation.isOpen}
        url={formModalDisplayInformation.url}
        type={formModalDisplayInformation.type}
        name={formModalDisplayInformation.name}
        setOpen={closeModal}
      />
      <style>
        {".habitEntryTitle::first-letter {font-size: 1.5em; color: inherit;);}"}
      </style>
      {components}
    </>
  );
}
