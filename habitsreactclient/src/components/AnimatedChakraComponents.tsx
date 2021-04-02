import { 
    Heading,
    Text,
    Flex,
    HeadingProps,
    TextProps,
    FlexProps,
} from '@chakra-ui/react';
import React from "react";
import { motion, MotionProps} from "framer-motion"

type Merge<P, T> = Omit<P, keyof T> & T;
type AHProps = Merge<HeadingProps, MotionProps>;
type ATProps = Merge<TextProps, MotionProps>;
type AFProps = Merge<FlexProps, MotionProps>;

export const AnimatedHeading: React.FC<AHProps> = motion(Heading),
AnimatedText: React.FC<ATProps> = motion(Text),
AnimatedFlex: React.FC<AFProps> = motion(Flex);

