import * as React from "react";
import { Link } from "@chakra-ui/react";
export class OldHabitsButton extends React.Component<any, any> {
  render() {
    return (
      <Link
        _active={{ bgColor: "none", border: "none" }}
        _focus={{ border: "none" }}
        href=""
        fontSize={{ base: "10px", md: "14px" }}
        onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          event?.preventDefault();
        }}
      >
        Old Habits
      </Link>
    );
  }
}
