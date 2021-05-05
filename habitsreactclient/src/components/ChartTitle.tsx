import * as React from "react";
import { Text, Select } from "@chakra-ui/react";
//import { TypingAnimation } from "./AnimatedChakraComponents";
export class ChartTitle extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  titleChangeOptions() {
    const options: any = [];
    const habits: any = this.props.habitsList;
    if (habits) {
      for (let habit of habits) {
        const option: any = (
          <option
            key={habit.name}
            selected={habit.name === this.props.text}
            value={habit.id}
          >
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
          w="10%"
          isTruncated={true}
          textAlign="center"
          variant="unstyled"
          onChange={(e: any) => this.handleChangeHabit(e.target.value)}
        >
          {this.titleChangeOptions()}
        </Select>
      </>
    );
  }
}
