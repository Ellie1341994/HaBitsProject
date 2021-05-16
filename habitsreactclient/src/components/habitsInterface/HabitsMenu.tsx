import * as React from "react";
import { NewHabitButton } from "./NewHabitButton";
import { OldHabitsButton } from "./OldHabitsButton";
import { NewHabitForm } from "./NewHabitForm";
export function HabitsMenu(props: any) {
  const [showForm, setShowForm] = React.useState(false);
  return (
    <>
      <NewHabitForm
        reloadCalendar={props.reloadCalendar}
        isOpen={showForm}
        setOpen={setShowForm}
      />
      <NewHabitButton setOpen={setShowForm} />
      <OldHabitsButton />
    </>
  );
}
