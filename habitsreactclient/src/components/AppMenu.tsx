import * as React from "react";
import { ColorModeSwitcher } from "../ColorModeSwitcher";
import { AnimatedFlex } from "./miscellaneous/AnimatedChakraComponents";
import { AnimatePresence } from "framer-motion";
import { Link, useColorModeValue } from "@chakra-ui/react";
export function AppMenu(props: any): any {
  return (
    <AnimatedFlex
      fontFamily="serif"
      bgColor={useColorModeValue("#fcf6ef", "gray.800")}
      zIndex="2"
      justify={props.displayAsUserMenu ? "space-evenly" : "flex-end"}
      align="center"
      position={props.displayAsUserMenu ? "fixed" : "absolute"}
      top="0"
      fontSize={{ base: "10px", md: "14px" }}
      w={{ base: "100%", md: "100%" }}
      p={props.displayAsUserMenu ? "1vh 0 1vh 0" : "0"}
      layout={true}
    >
      <AnimatePresence>
        {props.displayAsUserMenu && (
          <>
            <AnimatedFlex
              fontFamily="sans-serif"
              fontWeight="normal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              justify="space-evenly"
              w="80%"
              as="span"
            >
              {props.children}
              <Link
                _active={{ bgColor: "none", border: "none" }}
                _focus={{ border: "none" }}
                href="logout"
                onClick={props.logOutUser}
              >
                Logout
              </Link>
              <Link
                _active={{ bgColor: "none", border: "none" }}
                _focus={{ border: "none" }}
                href="instructions"
                onClick={(e) => e.preventDefault()}
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
