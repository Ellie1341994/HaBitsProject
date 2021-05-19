import * as React from "react";
import axios from "axios";
import { FaFrownOpen, FaGrinBeam, FaGrinTongue } from "react-icons/fa";
import {
  Link,
  useColorModeValue,
  Textarea,
  Flex,
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
function EffectivenessIcons(props: any) {
  const [iconStyle, setIconStyle] = React.useState({
    effectiveness: -1,
    opacity: 0.5,
    color: ["#888", "#888", "#888"],
  });
  const lightColors: any = {
    bgColor: "#fff",
    text: "#333",
    gradient: ["#7928CA", "#bc14a5", "#FF0080"],
  };
  const darkColors: any = {
    bgColor: "#333",
    text: "#fff",
    gradient: ["#788389", "#927d80", "#A77"],
  };
  let colorMode: any = useColorModeValue(lightColors, darkColors);
  const icons: any[] = [];
  // Object shorthand notation below
  const iconComponents: any = { FaFrownOpen, FaGrinTongue, FaGrinBeam };
  let index: number = 1;
  for (let iconName in iconComponents) {
    let ComponentName: any = iconComponents[iconName];
    let indexSnapshot: number = index - 1;
    //colorMode.gradient[colorType]
    const Icon: any = (
      <Link
        key={"sada" + indexSnapshot}
        onClick={(event: any) => {
          let newIconColor: any = iconStyle.color.map((_i: any) => "#8885");
          newIconColor[indexSnapshot] = colorMode.gradient[indexSnapshot];
          event.preventDefault();
          setIconStyle({
            effectiveness: indexSnapshot + 1,
            opacity: 1,
            color: newIconColor,
          });
        }}
      >
        <ComponentName
          key={iconName}
          size={"24"}
          opacity={iconStyle.opacity}
          color={iconStyle.color[indexSnapshot]}
        />
      </Link>
    );
    index++;
    icons.push(Icon);
  }
  return (
    <>
      <Input
        hidden={true}
        name="trackEffectiveness"
        id="trackEffectiveness"
        value={iconStyle.effectiveness}
        readOnly={true}
      />
      <Flex p="1" m="1" justify="space-evenly">
        {icons}
      </Flex>
    </>
  );
}
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
export function HabitFormModal(_props: any) {
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
  let modalTitle: string =
    _props.type === "Edit"
      ? "Edit " + _props.name
      : _props.type === "Review"
      ? _props.name + " Review"
      : "Habit";
  let buttonText: string =
    _props.type === "Edit"
      ? "Save"
      : _props.type === "Review"
      ? "Send"
      : "Create";
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
  async function handleHabitDeletion(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    try {
      const headers: any = {
        Authorization: "Token " + localStorage.getItem("token"),
      };
      let response: any = await axios.delete(_props.url, { headers: headers });
      console.log(response);
      _props.reloadUS();
    } catch (error) {
      console.log(error);
    }
  }
  async function handleReviewSubmit(event: React.FormEvent<HTMLFormElement>) {
    const headers: any = {
      Authorization: "Token " + localStorage.getItem("token"),
    };
    event.preventDefault();
    const form: any = event.target;
    const trackURL: string = "http://127.0.0.1:8000/track/";
    const data: any = {
      state: "D",
      note: form.trackDescription.value,
      effectiveness: form.trackEffectiveness.value,
      habit: _props.url,
    };
    console.log(data);
    try {
      let response: any = await axios.post(trackURL, data, {
        headers: headers,
      });
      console.log(response);
      if (response.status) {
        setUserSubmitInformation({
          message: "Review created successfully!",
          color: "#65902f",
          success: true,
        });
        setTimeout(_props.reloadUS, 1000);
      }
    } catch (error) {
      console.log(error);
      setUserSubmitInformation({
        message: (error.response.data.name ?? [
          "Select an icon to desribe your humor today! If you did and the error persist, try again later",
        ])[0],
        color: "#933",
        success: false,
      });
    }
  }
  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const URL: string =
      _props.type === "Edit" ? _props.url : "http://127.0.0.1:8000/habit/";
    const form: HTMLFormElement = event.target as HTMLFormElement;
    let habitEndsBeforeStartingByHour: boolean =
      form.EndHour.value < form.StartHour.value;
    let habitEndsBeforeStartingByMinutes: boolean =
      form.EndHour.value === form.StartHour.value &&
      form.StartMinutes.value >= form.EndMinutes.value;
    if (habitEndsBeforeStartingByHour || habitEndsBeforeStartingByMinutes) {
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
    const data: any = {
      startTime: startTime,
      endTime: endTime,
      description: form.habitDescription.value,
      name: form.habitName.value,
    };
    if (_props.type !== "Edit") {
      data["user"] = localStorage.getItem("userURL");
    }
    try {
      const headers: any = {
        Authorization: "Token " + localStorage.getItem("token"),
      };
      console.log(data, headers);
      let response: any = await axios[
        _props.type === "Edit" ? "patch" : "post"
      ](URL, data, { headers: headers });
      if (response.status === 201 || response.status === 200) {
        let msg: string =
          _props.type === "Edit"
            ? " successfully edited!"
            : " successfully created!";
        setUserSubmitInformation({
          message: form.habitName.value + msg,
          color: "#65902f",
          success: true,
        });
        setTimeout(_props.reloadUS, 1000);
      }
    } catch (error) {
      setUserSubmitInformation({
        message: (error.response.data.name ?? ["Unknown error"])[0],
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
  const DeleteButton: any = (props: any) => {
    if (props.show) {
      return (
        <Button
          variant="unstyled"
          _focus={undefined}
          type="submit"
          form="habitForm"
          disabled={userSubmitInformation.success}
          color="#f30058"
          p="1"
          onClick={handleHabitDeletion}
        >
          Delete
        </Button>
      );
    } else {
      return <></>;
    }
  };
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
        <ModalHeader
          textTransform="capitalize"
          fontFamily="serif"
          rounded="md"
          bgColor={bgColor}
        >
          {modalTitle}
        </ModalHeader>
        <ModalCloseButton _focus={undefined} />
        <ModalBody
          backgroundColor={bgColor}
          rounded="md"
          justifyContent="center"
          alignItems="center"
          whiteSpace="pre-line"
        >
          <form
            onSubmit={
              _props.type === "Review" ? handleReviewSubmit : handleFormSubmit
            }
            name="habitForm"
            id="habitForm"
          >
            {_props.type !== "Review" && (
              <>
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
              </>
            )}
            {_props.type === "Review" && <EffectivenessIcons />}
            <Textarea
              required={true}
              mt="1"
              variant="outline"
              name={
                _props.type === "Review"
                  ? "trackDescription"
                  : "habitDescription"
              }
              placeholder={
                _props.type === "Review"
                  ? "Write a review note ..."
                  : "Description"
              }
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
          <Flex justify="space-evenly">
            <DeleteButton show={_props.type === "Edit"} />
            <Button
              p="1"
              variant="unstyled"
              _focus={undefined}
              type="submit"
              form="habitForm"
              disabled={userSubmitInformation.success}
            >
              {buttonText}
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
