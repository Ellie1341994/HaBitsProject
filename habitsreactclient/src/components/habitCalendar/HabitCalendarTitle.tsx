import * as React from "react";
import { Select } from "@chakra-ui/react";
export class HabitCalendarTitle extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  makeOptions() {
    const options: any = [];
    const habits: any = this.props.habitsList;
    if (habits) {
      for (let habit of habits) {
        const option: any = (
          <option key={habit.name} value={habit.id}>
            {habit.name}
          </option>
        );
        options.push(option);
      }
    }
    return options;
  }
  handleChangeHabit(id: any) {
    let habitObj: any = undefined;
    const habits: any = this.props.habitsList;
    for (let habit of habits) {
      if (habit.id === parseInt(id)) {
        habitObj = habit;
        break;
      }
    }
    this.props.changeHabit(habitObj);
  }
  render() {
    return (
      <>
        <Select
          w={{ base: "100%", md: "10%" }}
          fontSize={{ base: "xs", md: "md" }}
          value={
            this.props.habitsList?.find(
              (habit: any) => habit.name === this.props.text
            ).id
          }
          defaultValue={
            this.props.habitsList?.find(
              (habit: any) => habit.name === this.props.text
            ).id
          }
          isTruncated={true}
          textAlign="center"
          variant="unstyled"
          onChange={(e: any) => this.handleChangeHabit(e.target.value)}
        >
          {this.makeOptions()}
        </Select>
      </>
    );
  }
}
