import { AnimatedHeading, AnimatedText } from "./AnimatedChakraComponents";
import * as React from "react";
import { useState, useEffect } from "react";
import { Text, useColorModeValue } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

function AppHeading({ subText, supText }: any) {
  const [animationType, setAnimationType] = useState("intro");
  const [titleTexts, setTitleTexts] = useState({
    subText: subText,
    supText: supText,
  });
  const variants: any = {
    intro: {
      y: "-50vh",
      transition: {
        duration: 0,
      },
    },
    fall: {
      y: "0",
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
    levitate: {
      y: "-5vh",
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 1,
      },
    },
    outro: {
      y: 0,
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };
  useEffect(() => {
    /*
     * if timeOut wait time must be 1s if user is logging out out so the title correctly fades with the previous text
     * by the same token, the title text must change before the title starts the falling animation */
    setTimeout(setTitleTexts, subText === "Of" ? 1000 : 0, {
      subText: subText,
      supText: supText,
    });
    if (subText === "Of") {
      setAnimationType("outro");
    } else {
      setAnimationType("intro");
    }
  }, [supText, subText]);
  useEffect(() => {
    if (animationType === "intro") {
      setAnimationType("fall");
    }
    if (animationType === "fall") {
      setTimeout(setAnimationType, 1000, "levitate");
    }
    if (animationType === "outro") {
      setTimeout(setAnimationType, 1000, "intro");
    }
  }, [animationType]);
  return (
    <AnimatedHeading
      initial={false}
      animate={animationType}
      variants={variants}
      fontFamily="serif"
      as="h1"
      mt="0"
      mb="5"
      fontSize={{ base: "18px", md: "36px" }}
      isTruncated={true}
      maxW="100%"
    >
      HaBits
      <Text as="sub" fontSize="xs">
        {titleTexts.subText}
      </Text>
      {titleTexts.supText?.replace(/^\w/, (fc: string) => fc.toUpperCase())}
    </AnimatedHeading>
  );
}
interface ATProps {
  titleOnly?: boolean;
  supText?: string;
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
      <AppHeading subText={props?.subText} supText={props?.supText} />
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
