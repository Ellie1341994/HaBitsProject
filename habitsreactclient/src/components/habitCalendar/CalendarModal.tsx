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
export function CalendarModal(_props: any) {
  const lightColors: any = {
    bgColor: "#fff",
    text: "#333",
    gradient: { c1: "#7928CA", c2: "#FF0080", c3: "#bc14a5" },
  };
  const darkColors: any = {
    bgColor: "#333",
    text: "#fff",
    gradient: { c1: "#788389", c2: "#A77", c3: "#927d80" },
  };
  let colorMode: any = useColorModeValue(lightColors, darkColors);
  let gradient: string =
    "linear(to-r," + colorMode.gradient.c1 + "," + colorMode.gradient.c2 + ")";
  let textColor: any = colorMode.text;
  let bgColor: any = colorMode.bgColor;
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
            <FaFrownOpen
              size={"24"}
              opacity={_props.trackInformation?.effectiveness === 1 ? 1 : 0.5}
              color={
                _props.trackInformation?.effectiveness === 1
                  ? colorMode.gradient.c1
                  : "black"
              }
            />
            <FaGrinTongue
              size={"24"}
              opacity={_props.trackInformation?.effectiveness === 2 ? 1 : 0.5}
              color={
                _props.trackInformation?.effectiveness === 2
                  ? colorMode.gradient.c3
                  : "black"
              }
            />
            <FaGrinBeam
              size={"24"}
              opacity={_props.trackInformation?.effectiveness === 3 ? 1 : 0.5}
              color={
                _props.trackInformation?.effectiveness === 3
                  ? colorMode.gradient.c2
                  : "black"
              }
            />
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
