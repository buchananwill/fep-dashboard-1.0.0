import {
  parseToCssRgba,
  parseToCssRgbOpacityOne,
  RgbaDto
} from '@/components/tables/edit-v2/parseToCssRgba';
import { DispatchState } from '@/types';
import { ChangeEvent, useCallback } from 'react';
import { color, rgb } from 'd3';
import Slider from 'rc-slider';

type RgbaPickerProps = {
  value: RgbaDto;
  onChange?: DispatchState<RgbaDto>;
  showOpacity?: boolean;
};

function ColorPicker({
  value,
  onChange
}: {
  value: RgbaDto;
  onChange?: DispatchState<RgbaDto>;
}) {
  const { r, g, b, a } = value;
  const onChangeColor = useCallback(
    (changeEvent: ChangeEvent<HTMLInputElement>) => {
      if (!onChange) return;
      const hexColor = changeEvent.target.value;
      const parsedColor = color(hexColor)?.rgb();
      const { r, g, b } = parsedColor ? parsedColor : fallBackColor;
      onChange((prev) => ({ ...prev, r, g, b }));
    },
    [onChange]
  );

  return (
    <input
      className={'h-8 w-8 rounded-lg'}
      type={'color'}
      value={rgb(r, g, b, a / 255).formatHex()}
      onChange={onChangeColor}
    />
  );
}

function OpacitySlider({
  value,
  onChange
}: {
  value: RgbaDto;
  onChange?: DispatchState<RgbaDto>;
}) {
  const onValueChange = useCallback(
    (newOpacity: number | number[]) => {
      if (Array.isArray(newOpacity)) throw Error('Range input not allowed');
      if (onChange) onChange((prev) => ({ ...prev, a: newOpacity }));
    },
    [onChange]
  );

  return (
    <Slider
      className={'col-span-2'}
      value={value.a}
      onChange={onValueChange}
      min={0}
      styles={{
        track: {
          backgroundColor: parseToCssRgbOpacityOne(value)
        },
        rail: {
          backgroundColor: parseToCssRgba({ ...value, a: 63 })
        }
      }}
      max={255}
    ></Slider>
  );
}

export function RgbaPicker({ showOpacity, ...props }: RgbaPickerProps) {
  return showOpacity ? (
    <div className={'grid grid-cols-2 gap-1 rounded-lg p-1 shadow-small'}>
      <div
        style={{ backgroundColor: parseToCssRgba(props.value) }}
        className={'h-8 w-8 rounded-lg'}
      ></div>
      <ColorPicker {...props} />
      {<OpacitySlider {...props} />}
    </div>
  ) : (
    <ColorPicker {...props} />
  );
}

export const fallBackColor = { r: 127, g: 127, b: 127, a: 255 } as const;
