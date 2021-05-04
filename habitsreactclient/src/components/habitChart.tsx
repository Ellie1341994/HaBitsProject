import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import { ChartTitle } from "./ChartTitle";
import axios from "axios";
import { ResponsiveCalendar } from "@nivo/calendar";
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveCalendar = ({ data, from, to }: any) => (
  <ResponsiveCalendar
    data={data}
    from={from}
    to={to}
    isInteractive={true}
    emptyColor="#eeeeee"
    colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
    margin={{ top: 2, right: 2, bottom: 2, left: 2 }}
    tooltip={(data) => (
      <div style={{ backgroundColor: "#AAA", color: "white" }}>
        {data.day}
        {data.value}
      </div>
    )}
    yearSpacing={45}
    monthSpacing={15}
    monthBorderColor="#ffffff"
    dayBorderWidth={2}
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
//  https://github.com/plouc/nivo/issues/149#issuecomment-593617357
export class HabitChart extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.getHabitData = this.getHabitData.bind(this);
    this.getUserHabitList = this.getUserHabitList.bind(this);
    this.state = {
      habits: undefined,
      selectedHabit: undefined,
      habitData: undefined,
      startDate: undefined,
      endDate: undefined,
    };
  }
  baseURL = "http://127.0.0.1:8000";
  async componentDidMount() {
    const habits: any = await this.getUserHabitList();
    const preselectedHabitId: string | null = localStorage.getItem(
      "selectedUserHabit"
    );
    let habit: any = undefined;
    if (habits !== []) {
      const maxRandomNumber = habits.length;
      var randomNumber = Math.floor(Math.random() * maxRandomNumber);
      habit = habits[randomNumber];
      if (preselectedHabitId) {
        const id: number = parseInt(preselectedHabitId);
        for (let object of habits) {
          if (object.id === id) {
            habit = object;
            break;
          }
        }
      }
    }
    const habitData: any = await this.getHabitData(habit.id);
    const firstDate: string = habitData[habitData.length - 1].day;
    const lastDate: string = habitData[0].day;
    console.log(firstDate, lastDate);
    this.setState({
      habits: habits,
      selectedHabit: habit,
      habitData: habitData,
      startDate: firstDate,
      endDate: lastDate,
    });
  }
  async getUserHabitList() {
    const response: any = await axios.get("http://127.0.0.1:8000/habit", {
      headers: { Authorization: "Token " + localStorage.getItem("token") },
    });
    let habits: any = response.data.results;
    console.log(habits);
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
    console.log(tracks);
    for (let track of tracks) {
      let trackDate: string = track.dateCreated.substr(
        0,
        track.dateCreated.indexOf("T")
      );
      let dataEntry: any = {
        day: trackDate,
        value: track.effectiveness,
      };
      tracksData.push(dataEntry);
    }
    return tracksData;
  }
  render() {
    return (
      <Flex justify="space-evenly" align="center" h="25%" w="90%">
        <ChartTitle
          text={
            this.state.selectedHabit
              ? this.state.selectedHabit.name
              : "You haven't created a habit"
          }
        />
        <Flex h="100%" w="90%">
          <ResponsiveCalendar
            data={this.state.habitData}
            from={this.state.startDate}
            to={this.state.endDate}
            isInteractive={true}
            emptyColor="#eeeeee"
            colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
            margin={{ top: 2, right: 2, bottom: 2, left: 2 }}
            yearSpacing={45}
            monthSpacing={15}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
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
      </Flex>
    );
  }
}
/*
          <ResponsiveLine
            data={this.state.habitData}
            margin={{ top: 25, right: 110, bottom: 25, left: 0 }}
            xScale={{ type: "point" }}
            yScale={{
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
              type: "point" as any,
            }}
            xFormat=" >-"
            yFormat=" >-.2f"
            curve="natural"
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            tooltip={(data) => {
              //console.log(input.point)
              return (
                <Flex fontFamily="serif" fontWeight="semibold">
                  Date: {data.point.data.y}
                </Flex>
              );
            }}
            enableCrosshair={false}
            axisLeft={null}
            enableGridX={false}
            enableGridY={false}
            colors={{ scheme: "nivo" }}
            enablePoints={true}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabel="y"
            pointLabelYOffset={-12}
            isInteractive={true}
            useMesh={true}
            legends={[
              {
                anchor: "right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            animate={true}
          />
*/
