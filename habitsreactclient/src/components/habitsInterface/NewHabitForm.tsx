import * as React from "react";
import axios from "axios";
import {
  useColorModeValue,
  Textarea,
  Text,
  Grid,
  GridItem,
  Select,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
function makeSelectionOf(list: any, label: string, namePrefix: string) {
  const container: any = [];
  let extraElement: any = (
    <option key={label} value="">
      - {label}
    </option>
  );
  container.push(extraElement);
  let index: number = 0;
  for (let item of list) {
    let element: any = (
      <option key={item} value={index}>
        {item}
      </option>
    );
    container.push(element);
    index++;
  }
  return (
    <Select
      required={true}
      name={namePrefix + label}
      variant="outline"
      isTruncated={true}
    >
      {container}
    </Select>
  );
}
export function NewHabitForm(_props: any) {
  const lightColors: any = {
    bgColor: "#fff",
    text: "#333",
    gradient: { c1: "#7928CA", c2: "#FF0080" },
  };
  const darkColors: any = {
    bgColor: "#333",
    text: "#fff",
    gradient: { c1: "#788389", c2: "#A77" },
  };
  let colorMode: any = useColorModeValue(lightColors, darkColors);
  let gradient: string =
    "linear(to-r," + colorMode.gradient.c1 + "," + colorMode.gradient.c2 + ")";
  let textColor: any = colorMode.text;
  let bgColor: any = colorMode.bgColor;
  const weekDays: any = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const hours: number[] = new Array(24).fill("").map((_e, i) => i);
  const minutes: number[] = new Array(60).fill("").map((_e, i) => i);
  const [userSubmitInformation, setUserSubmitInformation] = React.useState({
    message: "",
    color: "#65902f",
    success: false,
  });
  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const URL: string = "http://127.0.0.1:8000/habit/";
    const form: HTMLFormElement = event.target as HTMLFormElement;
    if (
      form.EndHour.value > form.StartHour.value ||
      (form.EndHour.value === form.StartHour.value &&
        form.StartMinutes.value <= form.EndMinutes.value)
    ) {
      setUserSubmitInformation({
        message: "Error! Start or End time values are incorrect",
        color: "#933",
        success: false,
      });
      return undefined;
    }
    const present: Date = new Date();
    // The code below calculates the amount of days from the current day of the way to reach the required habit day
    const habitDay: number =
      present.getDate() - Math.abs(form.Day.value - present.getDay());
    present.setDate(habitDay);
    const startTime = new Date(
      present.getFullYear(),
      present.getMonth(),
      present.getDate(),
      form.StartHour.value,
      form.StartMinutes.value
    );
    const endTime = new Date(
      present.getFullYear(),
      present.getMonth(),
      present.getDate(),
      form.EndHour.value,
      form.EndMinutes.value
    );
    const headers: any = {
      Authorization: "Token " + localStorage.getItem("token"),
    };
    const data: any = {
      startTime: startTime,
      endTime: endTime,
      name: form.habitName.value,
      user: localStorage.getItem("userURL"),
    };
    try {
      let response: any = await axios
        .post(URL, data, { headers: headers })
        .catch();
      console.log(response);
      if (response.status === 201) {
        setUserSubmitInformation({
          message: form.habitName.value + " successfully created!",
          color: "#65902f",
          success: true,
        });
        _props.reloadCalendar();
      }
    } catch (error) {
      setUserSubmitInformation({
        message: error.response.data.name[0],
        color: "#933",
        success: false,
      });
    }
  }
  function makeTimeInputGridItems(
    callback: Function,
    callbackargs: { lists: number[][]; labels: string[] },
    firstGridItemLabel: string
  ): any {
    let gridItems: any =
      firstGridItemLabel === "Start"
        ? []
        : makeTimeInputGridItems(callback, callbackargs, "Start");
    let iteration: number = 0;
    let firstGridItem: any = (
      <GridItem
        key={firstGridItemLabel + "A"}
        alignSelf="center"
        justifySelf="center"
        colSpan={1}
      >
        {firstGridItemLabel}
      </GridItem>
    );
    gridItems.push(firstGridItem);
    for (let list of callbackargs.lists) {
      let element: any = (
        <GridItem key={firstGridItemLabel + iteration} colSpan={1}>
          {callback(list, callbackargs.labels[iteration], firstGridItemLabel)}
        </GridItem>
      );
      gridItems.push(element);
      iteration++;
    }
    return gridItems;
  }
  return (
    <Modal
      isOpen={_props.isOpen}
      onClose={() => {
        setUserSubmitInformation({
          message: "",
          color: "#65902f",
          success: false,
        });
        _props.setOpen(false);
      }}
    >
      <ModalOverlay />
      <ModalContent
        textColor={textColor}
        bgGradient={gradient}
        w={{ base: "90%", md: "100%" }}
        p="2"
      >
        <ModalHeader fontFamily="serif" rounded="md" bgColor={bgColor}>
          Habit
        </ModalHeader>
        <ModalCloseButton _focus={undefined} />
        <ModalBody
          backgroundColor={bgColor}
          rounded="md"
          justifyContent="center"
          alignItems="center"
          whiteSpace="pre-line"
        >
          <form onSubmit={handleFormSubmit} name="habitForm" id="habitForm">
            <Input
              rounded="md"
              required={true}
              variant="flushed"
              name="habitName"
              placeholder="Name"
              _placeholder={{ color: textColor }}
            />
            <Grid templateColumns="3" mt="1" justify="space-between">
              <GridItem colSpan={3}>
                {makeSelectionOf(weekDays, "Day", "")}
              </GridItem>
              {makeTimeInputGridItems(
                makeSelectionOf,
                { lists: [hours, minutes], labels: ["Hour", "Minutes"] },
                "End"
              )}
            </Grid>
            <Textarea
              mt="1"
              variant="outline"
              name="habitDescription"
              placeholder="Description"
              _placeholder={{ color: textColor }}
            />
          </form>
        </ModalBody>
        <ModalFooter
          justifyContent="space-between"
          rounded="md"
          bgColor={bgColor}
        >
          <Text textTransform="capitalize" color={userSubmitInformation.color}>
            {userSubmitInformation.message}
          </Text>
          <Button
            variant="unstyled"
            _focus={undefined}
            type="submit"
            form="habitForm"
            disabled={userSubmitInformation.success}
          >
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
