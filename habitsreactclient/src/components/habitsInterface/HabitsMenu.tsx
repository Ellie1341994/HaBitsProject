import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { NewHabitButton } from "./NewHabitButton";
import { NewHabitForm } from "./NewHabitForm";
export function HabitsMenu(props: any) {
  const [showForm, setShowForm] = React.useState(false);
  return (
    <Flex
      fontSize={{ base: "10px", md: "18px" }}
      h="10%"
      pl="2"
      pr="2"
      w="100%"
    >
      <NewHabitForm
        reloadCalendar={props.reloadCalendar}
        isOpen={showForm}
        setOpen={setShowForm}
      />
      <NewHabitButton setOpen={setShowForm} />
    </Flex>
  );
}
