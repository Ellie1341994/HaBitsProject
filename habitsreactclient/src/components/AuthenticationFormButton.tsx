import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useMediaQuery,
} from "@chakra-ui/react";
import { Button, useColorModeValue, Flex } from "@chakra-ui/react";
import { TypingAnimation } from "./AnimatedChakraComponents";
import React from "react";
export default function AuthenticationFormButton(props: any) {
  //const bgColorType: any = {dark: "#e77", light:"orange.200"}
  const bgColorType: { dark: string; light: string } = {
    dark: "#e77",
    light: "gray.700",
  };
  const bgColor: string = useColorModeValue(
    bgColorType.light,
    bgColorType.dark
  );
  const borderValues: string = useColorModeValue(
    "solid 1px #888",
    "solid 1px #CCC"
  );
  const [isBelow48em]: boolean[] = useMediaQuery("(max-width: 48em)");
  const [shouldOpen, setShouldOpen] = React.useState(false);
  return (
    <>
      <Flex
        justifyContent="center"
        direction={isBelow48em ? "row" : "column"}
        w="75%"
      >
        <Popover isOpen={shouldOpen} placement={isBelow48em ? "top" : "left"}>
          <PopoverTrigger>
            <Button
              _hover={{
                border: "solid 3px",
                borderColor: "gray.300",
                boxShadow: "lg",
              }}
              type="submit"
              fontSize={{ base: "10px", md: "16px" }}
              mt="2"
              mb="2"
              size="md"
              color="white"
              isFullWidth={true}
              backgroundColor={bgColor}
              borderRadius="2xl"
              borderBottom={borderValues}
              onClick={(_event: any) => {
                props.popOverHandler(setShouldOpen);
              }}
            >
              <TypingAnimation durationInMS={500} as="span" text={props.name} />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            margin="auto"
            width={isBelow48em ? "65%" : "100%"}
            color="gray.700"
            backgroundColor="gray.50"
            style={{ whiteSpace: "pre-wrap" }}
          >
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader
              fontSize="xs"
              color={props.headerText === "Error(s)" ? "#ef2345" : "#2fc641"}
            >
              {props.headerText}
            </PopoverHeader>
            <PopoverBody fontSize="xs">{props.bodyText}</PopoverBody>
          </PopoverContent>
        </Popover>
      </Flex>
    </>
  );
}
