import * as React from "react";
import {
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChartTitle } from "./ChartTitle";
import axios from "axios";
import { TypingAnimation } from "./AnimatedChakraComponents";
import { ResponsiveCalendar } from "@nivo/calendar";
import { FaFrownOpen, FaGrinBeam, FaGrinTongue } from "react-icons/fa";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
//  https://github.com/plouc/nivo/issues/149#issuecomment-593617357
function TrackInformationModal(_props: any) {
  let trackDate: string = _props.trackInformation?.dateCreated.substr(
    0,
    _props.trackInformation.dateCreated.indexOf("T")
  );
  function setIconOpacity(trackEffectiveness: string, iconType: string) {
    const effectivenessNumber: number = parseInt(trackEffectiveness);
    if (
      (iconType === "bad" && effectivenessNumber === 1) ||
      (iconType === "medium" && effectivenessNumber === 2) ||
      (iconType === "good" && effectivenessNumber === 3)
    ) {
      return 1;
    }

    return 0.5;
  }
  return (
    <Modal isOpen={_props.open} onClose={_props.setOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Day Record Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody whiteSpace="pre-line">
          <Flex p="4" justify="space-evenly">
            <FaFrownOpen
              size="32"
              opacity={setIconOpacity(
                _props.trackInformation?.effectiveness,
                "bad"
              )}
            />
            <FaGrinTongue
              size="32"
              opacity={setIconOpacity(
                _props.trackInformation?.effectiveness,
                "medium"
              )}
            />
            <FaGrinBeam
              size="32"
              opacity={setIconOpacity(
                _props.trackInformation?.effectiveness,
                "good"
              )}
            />
            <br />
          </Flex>
          {_props.trackInformation?.note}
          <br />
          <Text textAlign="right" w="100%" as="p">
            On {trackDate}
          </Text>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
function HabitCalendar(props: any): any {
  const textColor: string = useColorModeValue("gray.700", "white");
  const darkColors: any = ["#788389", "#927d80", "#A77"];
  const lightColors: any = ["#7928CA", "#bc14a5", "#FF0080"];
  const entryColor: string[] = useColorModeValue(lightColors, darkColors);
  if (props.data?.length > 0) {
    return (
      <ResponsiveCalendar
        theme={{ textColor: textColor }}
        data={props.data ? props.data : []}
        from={props.startDate}
        to={props.endDate}
        minValue={1}
        maxValue={3}
        emptyColor="#eeeeee"
        colors={entryColor}
        margin={{ top: 20, right: 0, bottom: 2, left: 0 }}
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
    );
  } else {
    return (
      <TypingAnimation
        animateAlways={true}
        writeOnly={true}
        text={
          "Selected HaBit is too new to diplay its information on the Calendar!"
        }
      />
    );
  }
}
export class HabitChart extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.getHabitData = this.getHabitData.bind(this);
    this.setHabitsData = this.setHabitsData.bind(this);
    this.getUserHabitList = this.getUserHabitList.bind(this);
    this.popTrackInformation = this.popTrackInformation.bind(this);
    this.state = {
      habits: undefined,
      selectedHabit: undefined,
      habitData: undefined,
      startDate: undefined,
      endDate: undefined,
      trackInformationPopped: false,
      trackInformation: undefined,
    };
  }
  baseURL = "http://127.0.0.1:8000";
  async componentDidMount() {
    this.setHabitsData();
  }
  async setHabitsData(selectedHabit?: any) {
    let habits: any = undefined;
    let habit: any = selectedHabit;
    let updatedState: any = {};
    if (!selectedHabit) {
      habits = await this.getUserHabitList();
      const maxRandomNumber = habits.length - 1;
      var randomNumber = Math.floor(Math.random() * maxRandomNumber);
      habit = habits[randomNumber];
      updatedState["habits"] = habits;
    }
    const habitData: any = await this.getHabitData(habit.id);
    const firstDate: string = habitData[habitData.length - 1]?.day;
    const lastDate: string = habitData[0]?.day;
    updatedState["habitData"] = habitData;
    updatedState["startDate"] = firstDate;
    updatedState["endDate"] = lastDate;
    updatedState["selectedHabit"] = habit;
    this.setState(updatedState);
  }
  async getUserHabitList() {
    const response: any = await axios.get("http://127.0.0.1:8000/habit", {
      headers: { Authorization: "Token " + localStorage.getItem("token") },
    });
    let habits: any = response.data.results;
    return habits;
  }
  async getHabitData(habitId: number) {
    let tracksData: any = [];
    const response = await axios.get(
      this.baseURL + "/trace/" + habitId + "/getHabitTracks",
      {
        headers: { Authorization: "Token " + localStorage.getItem("token") },
      }
    );
    const tracks = response.data.results;
    for (let track of tracks) {
      let trackDate: string = track.dateCreated.substr(
        0,
        track.dateCreated.indexOf("T")
      );
      let dataEntry: any = {
        day: trackDate,
        value: track.effectiveness,
        url: track.url,
      };
      tracksData.push(dataEntry);
    }
    return tracksData;
  }
  async popTrackInformation(trackUrl?: string) {
    let updatedState: any = {
      trackInformationPopped: !this.state.trackInformationPopped,
    };
    if (trackUrl) {
      const response: any = await axios.get(trackUrl, {
        headers: { Authorization: "Token " + localStorage.getItem("token") },
      });
      updatedState["trackInformation"] = response.data;
      console.log(response);
    }
    this.setState(updatedState);
  }
  render() {
    console.log("hd ->", this.state.habitData);
    return (
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-evenly"
        align="center"
        h="25%"
        w="90%"
      >
        <TrackInformationModal
          trackInformation={this.state.trackInformation}
          open={this.state.trackInformationPopped}
          setOpen={this.popTrackInformation}
        />
        <ChartTitle
          changeHabit={this.setHabitsData}
          habitsList={this.state.habits}
          text={
            this.state.selectedHabit
              ? this.state.selectedHabit.name
              : "Start creating a HaBit!"
          }
        />
        <Flex
          justify="center"
          align="center"
          h="100%"
          w={{ base: "100%", md: "90%" }}
        >
          <HabitCalendar
            popTrackInformation={this.popTrackInformation}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            data={this.state.habitData}
          />
        </Flex>
      </Flex>
    );
  }
}
