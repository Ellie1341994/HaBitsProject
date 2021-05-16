import * as React from "react";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { Habits } from "./Habits";

export class HabitsInterface extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      habits: [],
    };
  }
  async componentDidMount() {
    try {
      const habits: any = await this.getUserHabitList();
      const state: any = { habits: habits };
      this.setState(state);
    } catch (error) {
      console.log(error);
    }
  }

  async getUserHabitList() {
    try {
      const response: any = await axios.get("http://127.0.0.1:8000/habit", {
        headers: { Authorization: "Token " + localStorage.getItem("token") },
      });
      let habits: any = response.data.results;
      return habits;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Flex h="75%" w="100%" align="center" justify="center">
        <Flex
          position="relative"
          boxShadow="lg"
          bgColor="white"
          rounded="md"
          h="90%"
          w="90%"
          direction="column"
        >
          <Habits data={this.state.habits} />
        </Flex>
      </Flex>
    );
  }
}
