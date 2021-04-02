import * as React from "react"
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react"
import { FaMoon, FaSun } from "react-icons/fa"

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  // function that avoids user abuse to the switcher 
  function waitAnimationEnd(e: any) {
      toggleColorMode()
      const newlyRenderedButton: any = document.getElementById("changeColorModeButton");
      newlyRenderedButton.setAttribute("disabled","true");
      setTimeout( function() {
          newlyRenderedButton.removeAttribute("disabled");
      },
      1000);
  }

  return (
      <IconButton
          id="changeColorModeButton"
          size="sm"
          fontSize="lg"
          variant="ghost"
          color="current"
          marginLeft="2"
          onClick={waitAnimationEnd}
          icon={<SwitchIcon />}
          aria-label={`Switch to ${text} mode`}
          {...props}
      />
  )
}
