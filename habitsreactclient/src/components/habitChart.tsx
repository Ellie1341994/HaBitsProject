import * as React from "react";
import { Flex } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";
import { ChartTitle } from "./ChartTitle";
//  https://github.com/plouc/nivo/issues/149#issuecomment-593617357
export class HabitChart extends React.Component<any, any> {
  render() {
    return (
      <Flex justify="space-evenly" align="center" h="25%" w="90%">
        <ChartTitle />
        <Flex h="100%" w="90%">
          <ResponsiveLine
            data={this.props.data}
            margin={{ top: 25, right: 110, bottom: 25, left: 0 }}
            xScale={{ type: "point" }}
            xFormat=" >-"
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="natural"
            axisTop={null}
            axisRight={null}
            axisBottom={null}
            tooltip={(data) => {
              //console.log(input.point)
              return (
                <Flex fontFamily="serif" fontWeight="semibold">
                  Date: {data.point.data.x}
                </Flex>
              );
            }}
            enableCrosshair={false}
            axisLeft={null}
            enableGridX={false}
            enableGridY={false}
            colors={{ scheme: "nivo" }}
            enablePoints={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabel="y"
            pointLabelYOffset={-12}
            isInteractive={true}
            useMesh={true}
            legends={[
              {
                anchor: "right",
                direction: "column",
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            animate={true}
          />
        </Flex>
      </Flex>
    );
  }
}
/*
            colors={{ scheme: "red_grey" }}
              */
