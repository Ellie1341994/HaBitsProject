import { 
    Heading,
    Text,
    Flex,
    HeadingProps,
    TextProps,
    FlexProps,
} from '@chakra-ui/react';
import React from "react";
import { useState } from "react";
import { AnimatePresence, motion, MotionProps} from "framer-motion"

type Merge<P, T> = Omit<P, keyof T> & T;
type AHProps = Merge<HeadingProps, MotionProps>;
type ATProps = Merge<TextProps, MotionProps>;
type AFProps = Merge<FlexProps, MotionProps>;
interface TAProps extends TextProps {
    text: string,
    durationInMS?: number,
}
export const AnimatedHeading: React.FC<AHProps> = motion(Heading);
export const AnimatedText: React.FC<ATProps> = motion(Text);
export const AnimatedFlex: React.FC<AFProps> = motion(Flex);
export function DynamicInput(props: any) {
    const variants: any = {
        intro: {
            opacity: 1,
            transition:{
                duration: 1,
                ease: "easeOut",

            }
        },
        outro: {
            opacity: 0,
            transition:{
                duration: 1,
                ease: "easeOut",

            }
        },
    };
    return(
        <AnimatePresence>
            {props.shouldDisplay &&
            <AnimatedFlex
                width="75%"
                initial={{opacity: "0"}}
                animate={variants.intro}
                exit={variants.outro}
            >
                {props.children}
            </AnimatedFlex>
            }
        </AnimatePresence>
    )
}
export class TypingAnimation extends React.Component<TAProps, any> {
    constructor(props: any){
        super(props);
        this.state = {text: this.props.text, styles: {pointerEvents: "auto"}};
        this.textTypingAnimation = this.textTypingAnimation.bind(this);
    }
    styles: { pointerEvents: "none" | "auto" } = {pointerEvents: "auto"};
    componentDidUpdate(_prevProps: any, prevState: any) {
        if ( this.state === prevState) {
            const textLength: number = this.state.text.length;
            const animationDuration: undefined | number = this.props.durationInMS;
            const typingSpeed: number = animationDuration ? animationDuration  / textLength : 1000 / textLength;
            setTimeout(this.textTypingAnimation, 0, textLength, typingSpeed, 1);
        }
    }
    textTypingAnimation(range: number, typingSpeed: number, erase?: boolean) {
        erase = range > 0 && erase ? true : false;
        range = erase ? range - 1 : range + 1;
        let typing: boolean = range <= this.props.text.length;
        let updatedText: string =
            erase ?
                this.state.text.substring(0, range)
            :
                this.props.text.substring(0, range);
        let updatedState: any = {styles: { pointerEvents: "auto" }};
        if ( erase || typing ) {
            setTimeout(this.textTypingAnimation, typingSpeed, range, typingSpeed, erase);
            updatedState = {text: updatedText, styles: { pointerEvents: "none" }};
        }
        this.setState(updatedState);
    }
    render() {
        return (
            <Text style={this.state.styles} {...this.props}>{this.state.text}</Text>
        )
    }
}

// Notes
// record is an alias for {[k: kType]: kValType}
