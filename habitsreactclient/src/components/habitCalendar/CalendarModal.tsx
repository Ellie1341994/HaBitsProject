import * as React from "react";
import {
  useColorModeValue,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FaFrownOpen, FaGrinBeam, FaGrinTongue } from "react-icons/fa";
type cx = "c1" | "c2" | "c3";
function makeUserHumorIcons(
  iconColors: { c1: string; c2: string; c3: string },
  humorValue: number | string
) {
  const icons: any[] = [];
  // Object shorthand notation below
  const iconComponents: any = { FaFrownOpen, FaGrinTongue, FaGrinBeam };
  let index: number = 1;
  for (let iconName in iconComponents) {
    let iconMatchesValue: boolean = humorValue === index;
    let ComponentName: any = iconComponents[iconName];
    let colorType: cx = ("c" + index) as cx;
    const Icon: any = (
      <ComponentName
        key={iconName}
        size={"24"}
        opacity={iconMatchesValue ? 1 : 0.5}
        color={iconMatchesValue ? iconColors[colorType] : "#888"}
      />
    );
    index++;
    icons.push(Icon);
  }
  return icons;
}
export function CalendarModal(_props: any) {
  const lightColors: any = {
    bgColor: "#fff",
    text: "#333",
    gradient: { c1: "#7928CA", c3: "#FF0080", c2: "#bc14a5" },
  };
  const darkColors: any = {
    bgColor: "#333",
    text: "#fff",
    gradient: { c1: "#788389", c3: "#A77", c2: "#927d80" },
  };
  let colorMode: any = useColorModeValue(lightColors, darkColors);
  let gradient: string =
    "linear(to-r," + colorMode.gradient.c1 + "," + colorMode.gradient.c3 + ")";
  let textColor: any = colorMode.text;
  let bgColor: any = colorMode.bgColor;
  let trackDate: string = _props.trackInformation?.dateCreated.substr(
    0,
    _props.trackInformation.dateCreated.indexOf("T")
  );

  return (
    <Modal isOpen={_props.open} onClose={_props.setOpen}>
      <ModalOverlay />
      <ModalContent
        textColor={textColor}
        bgGradient={gradient}
        p="1"
        w={{ base: "90%", md: "100%" }}
      >
        <ModalHeader rounded="md" bgColor={bgColor}>
          <Flex p="0" justify="space-evenly">
            <Text fontFamily="serif" fontSize={{ base: "md", md: "lg" }}>
              Habit Daily Review
            </Text>
            {makeUserHumorIcons(
              colorMode.gradient,
              _props.trackInformation?.effectiveness
            )}
            <br />
          </Flex>
        </ModalHeader>
        <ModalCloseButton _focus={undefined} />
        <ModalBody rounded="md" bgColor={bgColor} whiteSpace="pre-line">
          {_props.trackInformation?.note}
          <br />
        </ModalBody>
        <ModalFooter fontWeight="bold" rounded="md" bgColor={bgColor}>
          On {trackDate}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
