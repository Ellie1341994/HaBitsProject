import {
  AnimatedHeading,
  AnimatedText,
} from "./miscellaneous/AnimatedChakraComponents";
import * as React from "react";
import { Text, useColorModeValue } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

function AppHeading({ subText, userTitle }: any) {
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
      as="h1"
      mt="0"
      mb="5"
      fontSize={{ base: "18px", md: "36px" }}
      isTruncated={true}
      maxW="100%"
    >
      {userTitle?.replace(/^\w/, (fc: string) => fc.toUpperCase())}
      HaBits
      <Text as="sub" fontSize="xs">
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
