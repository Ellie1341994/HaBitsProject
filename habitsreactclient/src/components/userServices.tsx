import { HabitChart } from './habitChart'
import * as React from "react";
import { } from "@chakra-ui/react"
const data: any = [
  {
    "id": "Consistency",
    "color": "hsl(30, 70%, 50%)",
    "data": []
  },
   {
    "id": "Humor",
    "color": "hsl(207, 70%, 50%)",
    "data": []
  },
]
for (let i = 0; i < 50; i++) {
    let track: any = {"x": i.toString() + ".m.year", y: i % 2 === 0 ? 1 : 0}
    data[0].data.push(track);
    let track1: any = {"x": i.toString() + ".m.year", y: ( (i + 5) % 5 ) + 2 }
    data[1].data.push(track1);
}

export class UserServices extends React.Component<any, any> {
    render() {
        return(
            <HabitChart data={data}/>
        )
    }
}
