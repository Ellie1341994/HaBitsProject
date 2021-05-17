import {
  AnimatedHeading,
  AnimatedText,
} from "./miscellaneous/AnimatedChakraComponents";
import * as React from "react";
import { Text, useColorModeValue } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

function AppHeading({ subText, userTitle }: any) {
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
  const [animationType, setAnimationType] = React.useState(
    userTitle !== "" ? "standby" : "intro"
  );
  const variants: any = {
    intro: {
      y: "-50vh",
      opacity: 1,
      transition: {
        duration: 0,
      },
    },
    fall: {
      y: "0",
      visibility: "visible",
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
    levitate: {
      y: "-5vh",
      visibility: "visible",
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1,
      },
    },
    standby: {
      y: "-50vh",
      opacity: 1,
      visibility: "hidden",
      transition: {
        duration: 0,
      },
    },
  };
  React.useEffect(() => {
    if (animationType === "intro") {
      setAnimationType("fall");
    }
    if (animationType === "standby") {
      setTimeout(setAnimationType, 1000, "fall");
    }
    if (animationType === "fall") {
      setTimeout(setAnimationType, 1000, "levitate");
    }
  }, [animationType]);
  return (
    <AnimatedHeading
      initial={false}
      animate={animationType}
      exit={{ opacity: 0 }}
      variants={variants}
      fontFamily="serif"
      bgGradient={gradient}
      bgClip="text"
      as="h1"
      fontSize={{ base: "18px", md: "54px" }}
      isTruncated={true}
      maxW="100%"
    >
      {userTitle?.replace(/^\w/, (fc: string) => fc.toUpperCase())}
      HaBits
      <Text color="#333" as="sub" fontSize="xs">
        {subText}
      </Text>
    </AnimatedHeading>
  );
}
interface ATProps {
  titleOnly?: boolean;
  userTitle?: string;
  subText?: string;
}
/**
 * Stateless Component
 * @Properties titleOnly?: boolean
 * @Example
 * ```
 * <AppTitle titleOnly={true}/> will not display description under title
 * ```
 */
function AppTitle(props?: ATProps | undefined | null) {
  const colors: any = { lc: "gray.50", dc: "gray.700" };
  const textColor: string = useColorModeValue(colors.dc, colors.lc);
  const variants: any = {
    intro: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
    outro: {
      opacity: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };
  return (
    <>
      <AnimatePresence>
        {!props?.titleOnly && (
          <AppHeading subText={"Track & Trace"} userTitle={props?.userTitle} />
        )}
      </AnimatePresence>
      {props?.titleOnly && (
        <AppHeading subText={""} userTitle={props?.userTitle} />
      )}
      <AnimatePresence>
        {!props?.titleOnly && (
          <AnimatedText
            color={textColor}
            fontSize={{ base: "10px", md: "14px" }}
            w="75%"
            as="em"
            initial={{ opacity: 0 }}
            animate={variants.intro}
            exit={variants.outro}
            transition={{ delay: 0.5, duration: 0.5 }}
            noOfLines={4}
          >
            <strong>Check your Habits</strong> consistently across time{" "}
            <strong>and how you felt</strong> at precise moments while{" "}
            <strong>doing them</strong>
          </AnimatedText>
        )}
      </AnimatePresence>
    </>
  );
}
export default AppTitle;
