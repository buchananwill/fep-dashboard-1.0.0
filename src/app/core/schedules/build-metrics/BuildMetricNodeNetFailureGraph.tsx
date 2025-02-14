'use client';
import { BuildMetricDto } from '@/api/generated-types/generated-types_';
import { useMemo } from 'react';
import {
  PointTooltipProps,
  ResponsiveLine,
  ResponsiveLineCanvas
} from '@nivo/line';

export function BuildMetricNodeNetFailureGraph({
  data
}: {
  data: BuildMetricDto;
}) {
  console.log(Date.now());
  const { queueTreeNodes } = data;
  const lineData = useMemo(() => {
    const points = queueTreeNodes.map((qT) => {
      return { x: qT.nodeNumber, y: qT.netFailureCount };
    });
    return { id: `Schedule ${data.scheduleId}`, data: points };
  }, [queueTreeNodes, data]);
  console.log(Date.now());
  return (
    <div className={'h-[90vh] w-[95vw]'}>
      <ResponsiveLineCanvas
        data={[lineData]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        lineWidth={2}
        enableGridX={false}
        enablePoints={false}
        colors={{ scheme: 'set1' }}
        xScale={{ type: 'linear' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: true,
          reverse: false
        }}
        tooltip={CustomTooltip}
        yFormat=" >-.2"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickValues: 10,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Queue Tree Node',
          legendOffset: 36,
          legendPosition: 'middle',
          truncateTickAt: 0
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -50,
          legendPosition: 'middle',
          truncateTickAt: 0
        }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enableTouchCrosshair={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />
    </div>
  );
}

function CustomTooltip({ point }: PointTooltipProps) {
  return (
    <div className={'border-2 bg-white'}>
      <table className={'flex flex-col p-0.5'}>
        <tbody>
          <tr>
            <td>Node Number:</td>
            <td className={'text-right'}>{point.data.xFormatted}</td>
          </tr>
          <tr>
            <td>Net Failure Count:</td>
            <td className={'text-right'}>{point.data.yFormatted}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
