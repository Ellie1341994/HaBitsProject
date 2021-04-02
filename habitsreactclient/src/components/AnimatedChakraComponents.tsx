import { 
    Heading,
    Text,
    Flex
} from '@chakra-ui/react';
import React from "react";
import { motion } from "framer-motion";

export const AnimatedHeading: React.FC< any> = motion(Heading),
AnimatedText: React.FC<any> = motion(Text),
AnimatedFlex: React.FC<any> = motion(Flex);

