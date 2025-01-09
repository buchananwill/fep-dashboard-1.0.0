import React, { useMemo } from 'react';
import { BASE_500 } from '@/components/react-flow/generic/utils/colors';
import { interpolate, interpolateLab } from 'd3';

type MiniPieChartProps = {
  value: number; // value between 0 and 1
  size?: number; // optional size of the pie chart (default 50px)
  strokeWidthRelative?: number; // optional stroke width of the chart
  className?: string;
};

const MiniPieChart: React.FC<MiniPieChartProps> = ({
  value,
  size = 50,
  strokeWidthRelative = 0.1,
  className
}) => {
  // Ensure the value is between 0 and 1
  const normalizedValue = Math.min(Math.max(value, 0), 1);

  const strokeWidth = Math.round(size * (strokeWidthRelative / 2));

  // Calculate the radius, center point, and circumference
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate stroke-dasharray for the filled part
  const strokeDasharray = `${circumference * normalizedValue} ${
    circumference * (1 - normalizedValue)
  }`;

  const color = ramp(value);

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle (the full pie chart) */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke="#e6e6e6"
        strokeWidth={strokeWidth}
      />
      {/* Foreground circle (the filled part) */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={circumference / 4} // start at 12 o'clock
        transform={`rotate(-90 ${size / 2} ${size / 2})`} // rotate to start at top
      />
    </svg>
  );
};

export default MiniPieChart;

const green = BASE_500.green;
const red = BASE_500.red;
const ramp = interpolateLab(red.cssHSLA, green.cssHSLA);
