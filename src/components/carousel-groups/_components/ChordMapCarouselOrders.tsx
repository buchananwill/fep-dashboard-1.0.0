'use client';
import {
  margin,
  theme
} from '@/components/carousel-groups/_components/nivoPropLiterals';
import { ChordCanvasProps, ResponsiveChordCanvas } from '@nivo/chord';

export default function ChordMapCarouselOrders({
  data,
  keys
}: {
  data: number[][];
  keys: string[];
}) {
  return <ResponsiveChordCanvas data={data} keys={keys} {...staticProps} />;
}

const staticProps: Omit<
  ChordCanvasProps,
  'data' | 'keys' | 'width' | 'height'
> = {
  theme: { ...theme },
  labelOffset: 10,
  labelRotation: -90,
  pixelRatio: 2,
  margin: { ...margin, right: 100 }
};

const chordTheme = { ...theme };

chordTheme.labels = { ...theme.labels };
chordTheme.labels.text = {
  ...chordTheme.labels.text
};
chordTheme.labels.text.textAlign = 'center';
chordTheme.labels.text.offset = 12;
