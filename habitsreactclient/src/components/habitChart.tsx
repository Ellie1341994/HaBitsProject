import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import { ChartTitle } from "./ChartTitle";
import axios from "axios";
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
    this.setState({
      habits: habits,
      selectedHabit: habit,
      habitData: habitData,
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
    let consistencyEntries: any = [];
    let humourEntries: any = [];
    const response = await axios.get(
      this.baseURL + "/trace/" + habitId + "/getHabitTracks",
      {
        headers: { Authorization: "Token " + localStorage.getItem("token") },
      }
    );
    const tracks = response.data.results;
    console.log(tracks);
    for (let track of tracks) {
      let humourEntry: any = {
        x: track.dateCreated,
        y: track.effectiveness,
      };
      let consistencyEntry: any = {
        x: track.dateCreated,
        y: track.state === "F" ? 0 : 1,
      };
      consistencyEntries.push(consistencyEntry);
      humourEntries.push(humourEntry);
    }
    let habitData: any = [
      {
        id: "Consistency",
        color: "hsl(30, 70%, 50%)",
        data: consistencyEntries,
      },
      {
        id: "Humor",
        color: "hsl(207, 70%, 50%)",
        data: humourEntries,
      },
    ];
    return habitData;
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
          <ResponsiveLine
            data={this.state.habitData}
            margin={{ top: 25, right: 110, bottom: 25, left: 0 }}
            xScale={{ type: "point" }}
            xFormat=" >-"
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
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
        </Flex>
      </Flex>
    );
  }
}
/*
            colors={{ scheme: "red_grey" }}
              */
