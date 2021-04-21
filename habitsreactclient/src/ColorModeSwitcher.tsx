import * as React from "react";
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  IconButtonProps,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label">;

export const ColorModeSwitcher: React.FC<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);
  const [disable, setDisable] = React.useState(true);
  // function that avoids user abuse to the switcher
  React.useEffect(() => {
    setDisable(true);
    setTimeout(setDisable, 1000, false);
  }, [text]);

  return (
    <IconButton
      id="changeColorModeButton"
      isDisabled={disable}
      size="sm"
      fontSize="lg"
      variant="ghost"
      color="current"
      _hover={{ bgColor: "none", cursor: "pointer" }}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  );
};
