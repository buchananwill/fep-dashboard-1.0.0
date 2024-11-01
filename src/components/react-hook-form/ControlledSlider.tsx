import { Control, Controller } from 'react-hook-form';
import { Slider, SliderProps } from '@mantine/core';
import { FieldPath, FieldValues } from 'react-hook-form/dist/types';
import { startCase } from 'lodash';

export type FormSliderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
  showText?: boolean;
} & SliderProps;

export function ControlledSlider<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, showText = true, ...props }: FormSliderProps<TFieldValues, TName>) {
  return (
    <>
      {showText && (
        <label htmlFor={name}>{startCase(name.split('.').pop())}</label>
      )}
      <Controller
        name={name}
        control={props.control}
        render={({ field }) => {
          return (
            <Slider {...props} value={field.value} onChange={field.onChange} />
          );
        }}
      ></Controller>
    </>
  );
}
