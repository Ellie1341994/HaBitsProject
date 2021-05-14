import * as React from "react";
import { Button } from "@chakra-ui/react";

export function NewHabitButton(props: any) {
  return (
    <Button
      m="1"
      color="gray"
      fontSize={{ base: "10px", md: "14px" }}
      variant="unstyled"
      _focus={undefined}
      onClick={() => {
        props.setOpen(true);
      }}
    >
      New Habit
    </Button>
  );
}
