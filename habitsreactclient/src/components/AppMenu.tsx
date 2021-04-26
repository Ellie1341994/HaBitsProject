import * as React from "react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { AnimatedFlex } from "./AnimatedChakraComponents";
import { AnimatePresence } from "framer-motion";
import { Link } from "@chakra-ui/react";
export class AppMenu extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { popInstructionsWindow: false };
    this.displayInstructions = this.displayInstructions.bind(this);
  }
  displayInstructions(event: any) {
    event.preventDefault();
  }
  render() {
    return (
      <AnimatedFlex
        fontFamily="serif"
        justify={this.props.displayAsUserMenu ? "space-between" : "flex-end"}
        align="center"
        pos="absolute"
        right="1"
        fontSize={{ base: "10px", md: "14px" }}
        w={{ base: "50%", md: "20%" }}
        layout={true}
      >
        <AnimatePresence>
          {this.props.displayAsUserMenu && (
            <>
              <AnimatedFlex
                fontFamily="sans-serif"
                fontWeight="normal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                justify="space-evenly"
                w="85%"
                as="span"
              >
                <Link
                  _active={{ bgColor: "none", border: "none" }}
                  _focus={{ border: "none" }}
                  href="logout"
                  onClick={this.props.logOutUser}
                >
                  Logout
                </Link>
                <Link
                  _active={{ bgColor: "none", border: "none" }}
                  _focus={{ border: "none" }}
                  href="instructions"
                  onClick={this.displayInstructions}
                >
                  Instructions
                </Link>
              </AnimatedFlex>
            </>
          )}
        </AnimatePresence>
        <ColorModeSwitcher />
      </AnimatedFlex>
    );
  }
}
