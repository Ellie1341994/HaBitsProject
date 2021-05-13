import * as React from "react";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { CalendarModal } from "./CalendarModal";
import { HabitCalendarTitle } from "./HabitCalendarTitle";
import { HabitCalendar } from "./HabitCalendar";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
//  https://github.com/plouc/nivo/issues/149#issuecomment-593617357
export class HabitCalendarInterface extends React.Component<any, any> {
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
    if (habit === undefined) {
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
    }
    this.setState(updatedState);
  }
  render() {
    return (
      <Flex
        direction={{ base: "column-reverse", md: "row" }}
        justify="space-between"
        align="center"
        h={{ base: "40%", md: "30%" }}
        w="90%"
      >
        <CalendarModal
          trackInformation={this.state.trackInformation}
          open={this.state.trackInformationPopped}
          setOpen={this.popTrackInformation}
        />
        <HabitCalendarTitle
          changeHabit={this.setHabitsData}
          habitsList={this.state.habits}
          text={
            this.state.selectedHabit
              ? this.state.selectedHabit.name
              : "You need HaBits!"
          }
        />
        <HabitCalendar
          popTrackInformation={this.popTrackInformation}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          data={this.state.habitData}
        />
      </Flex>
    );
  }
}
