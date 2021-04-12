import { 
    Heading,
    Text,
    Flex,
    Box,
    HeadingProps,
    TextProps,
    FlexProps,
    BoxProps,
} from '@chakra-ui/react';
import React from "react";
import { AnimatePresence, motion, MotionProps} from "framer-motion"

type Merge<P, T> = Omit<P, keyof T> & T;
type AHProps = Merge<HeadingProps, MotionProps>;
type ATProps = Merge<TextProps, MotionProps>;
type AFProps = Merge<FlexProps, MotionProps>;
type ABProps = Merge<BoxProps, MotionProps>;
interface TAProps extends TextProps {
    text: string,
    durationInMS?: number,
}
export const AnimatedHeading: React.FC<AHProps> = motion(Heading);
export const AnimatedText: React.FC<ATProps> = motion(Text);
export const AnimatedFlex: React.FC<AFProps> = motion(Flex);
export const AnimatedBox: React.FC<ABProps> = motion(Box);
export function TransitioningInput(props: any) {
    const variants: any = {
        transit: {
            flex: "1",
            transition: {
                duration: 1,
                ease: "easeOut",
            } 
        }
    }
    return (
        <AnimatedFlex
            width="100%"
            direction="column"
            justify="center"
            align="center"
            layout={true} 
        >
            { props.children }
        </AnimatedFlex>

    )
}
export function FadingInput(props: any) {
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

            },
        },
    };
    return(
        <AnimatePresence>
            {props.shouldDisplay &&
            <AnimatedFlex
                width="100%"
                justify="center"
                initial={{opacity: "0"}}
                animate={variants.intro}
                exit={variants.outro}
                layout={true} 
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
    childrenProps: any = "";
    afterUpdateText: string = "";
    UNSAFE_componentWillMount() {
        const {text, durationInMS, ...childrenProps}: any = this.props;
        this.childrenProps = childrenProps;

    }
    componentDidUpdate(_prevProps: any, prevState: any) {
        if ( this.state === prevState && this.afterUpdateText !== this.props.text) {
            const textLength: number = this.state.text.length;
            const animationDuration: undefined | number = this.props.durationInMS;
            const typingSpeed: number = animationDuration ? animationDuration  / textLength : 1000 / textLength;
            setTimeout(this.textTypingAnimation, 0, textLength, typingSpeed, 1);
            this.afterUpdateText = this.props.text;

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
            <Text style={this.state.styles} {...this.childrenProps}>{this.state.text}</Text>
        )
    }
}

// Notes
// record is an alias for {[k: kType]: kValType}
