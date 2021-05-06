import * as React from "react";
import {
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
export default function CalendarModal(_props: any) {
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
      <ModalContent w={{ base: "90%", md: "100%" }}>
        <ModalHeader>Day Record Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody whiteSpace="pre-line">
          <Flex p="4" justify="space-evenly">
            <FaFrownOpen
              size="32"
              opacity={setIconOpacity(
                _props.trackInformation?.effectiveness,
                "bad"
              )}
            />
            <FaGrinTongue
              size="32"
              opacity={setIconOpacity(
                _props.trackInformation?.effectiveness,
                "medium"
              )}
            />
            <FaGrinBeam
              size="32"
              opacity={setIconOpacity(
                _props.trackInformation?.effectiveness,
                "good"
              )}
            />
            <br />
          </Flex>
          {_props.trackInformation?.note}
          <br />
          <Text textAlign="right" w="100%" as="p">
            On {trackDate}
          </Text>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}
