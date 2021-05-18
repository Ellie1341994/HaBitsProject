import * as React from "react";
import { NewHabitButton } from "./NewHabitButton";
import { HabitFormModal } from "./HabitFormModal";
export function HabitsMenu(props: any) {
  const [showForm, setShowForm] = React.useState(false);
  return (
    <>
      <NewHabitButton setOpen={setShowForm} />
      <HabitFormModal
        reloadUS={props.reloadUS}
        isOpen={showForm}
        setOpen={setShowForm}
        url={""}
        type={"Create"}
        name={"Habit"}
      />
    </>
  );
}
