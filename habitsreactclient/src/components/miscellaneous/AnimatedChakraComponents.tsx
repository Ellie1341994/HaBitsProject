import {
  Heading,
  Text,
  Flex,
  Box,
  HeadingProps,
  TextProps,
  FlexProps,
  BoxProps,
} from "@chakra-ui/react";
import React from "react";
import { motion, MotionProps } from "framer-motion";

type Merge<P, T> = Omit<P, keyof T> & T;
type AHProps = Merge<HeadingProps, MotionProps>;
type ATProps = Merge<TextProps, MotionProps>;
type AFProps = Merge<FlexProps, MotionProps>;
type ABProps = Merge<BoxProps, MotionProps>;
export const AnimatedHeading: React.FC<AHProps> = motion(Heading);
export const AnimatedText: React.FC<ATProps> = motion(Text);
export const AnimatedFlex: React.FC<AFProps> = motion(Flex);
export const AnimatedBox: React.FC<ABProps> = motion(Box);
export function TransitioningInput(props: any) {
  return (
    <AnimatedFlex
      width="100%"
      direction="column"
      justify="center"
      align="center"
      layout={true}
    >
      {props.children}
    </AnimatedFlex>
  );
}
export function FadingInput(props: any) {
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
      {props.shouldDisplay && (
        <AnimatedFlex
          width="100%"
          justify="center"
          initial={{ opacity: "0" }}
          animate={variants.intro}
          exit={variants.outro}
          layout={true}
        >
          {props.children}
        </AnimatedFlex>
      )}
    </>
  );
}
interface TAProps extends TextProps {
  text: string;
  durationInMS?: number;
  animateAlways?: boolean;
  onMountOnly?: boolean;
  writeOnly?: boolean;
  eraseOnly?: boolean;
  delayInMS?: number;
}
/**
 * @param text requred | string | text content to be animated
 * @param durationInMS optional | integer number as miliseconds | Typing or erasing speed
 * @param delayInMS optional | integer number as miliseconds | time before animation triggers
 * note: in case both animations run, the take it will take this animation to finish will be double
 * @param animateAlways optional | boolean | Will animate after a component mounts or updates, otherwise only on updates
 * @param writeOnly optional | boolean
 * @param eraseOnly optional | boolean
 * note: writeOnly and eraseOnly are mutually exclusive
 * @param onMountOnly optional | boolean
 */
export class TypingAnimation extends React.Component<TAProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: this.props.text,
      styles: { pointerEvents: "auto", width: "100%" },
    };
    this.textTypingAnimation = this.textTypingAnimation.bind(this);
    this.runAnimation = this.runAnimation.bind(this);
    const {
      delayInMS,
      writeOnly,
      eraseOnly,
      text,
      durationInMS,
      onMountOnly,
      animateAlways,
      ...childrenProps
    }: any = this.props;
    this.childrenProps = childrenProps;
  }
  childrenProps: TextProps = "" as TextProps;
  componentDidMount() {
    if (this.props.animateAlways || this.props.onMountOnly) {
      this.runAnimation(this.props.delayInMS);
    }
  }
  componentDidUpdate(_prevProps: any, _prevState: any) {
    if (!this.props.onMountOnly) {
      let shouldAnimate: boolean = this.props.animateAlways
        ? _prevState === this.state
        : _prevProps.text !== this.props.text;
      if (shouldAnimate) {
        this.runAnimation(this.props.delayInMS);
      }
    }
  }
  runAnimation(delay?: number) {
    delay = delay ? delay : 0;
    let textLength: number = this.state.text.length;
    const animationDuration: undefined | number = this.props.durationInMS;
    const typingSpeed: number = animationDuration
      ? animationDuration / textLength
      : 1000 / textLength;
    if (this.props.writeOnly) {
      textLength = 0;
      this.setState({ text: "" });
    }
    setTimeout(this.textTypingAnimation, delay, textLength, typingSpeed, true);
  }
  textTypingAnimation(
    textLength: number,
    typingSpeed: number,
    erase?: boolean
  ) {
    erase = textLength > 0 && erase;
    textLength = erase ? textLength - 1 : textLength + 1;
    const maxTextLength: number = this.props.text.length;
    let typing: boolean = textLength <= maxTextLength && !this.props.eraseOnly;
    let updatedText: string = erase
      ? this.state.text.substring(0, textLength)
      : this.props.text.substring(0, textLength);
    let updatedState: any = { styles: { pointerEvents: "auto" } };
    if (erase || typing) {
      setTimeout(
        this.textTypingAnimation,
        typingSpeed,
        textLength,
        typingSpeed,
        erase
      );
      // disable click during animation
      updatedState = { text: updatedText, styles: { pointerEvents: "none" } };
    }
    this.setState(updatedState);
  }
  render() {
    return (
      <Text style={this.state.styles} {...this.childrenProps}>
        {" "}
        {this.state.text}{" "}
      </Text>
    );
  }
}
// Notes
// record is an alias for {[k: kType]: kValType}
