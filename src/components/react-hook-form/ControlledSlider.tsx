import { Control, Controller } from 'react-hook-form';
import { SliderProps } from '@nextui-org/react';
import { Slider } from '@nextui-org/slider';
import { Get, Paths } from 'type-fest';
import { TypedPaths } from '@/functions/typePaths';
import { FieldPath, FieldValues } from 'react-hook-form/dist/types';

export type FormSliderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
} & SliderProps;

export function ControlledSlider<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({ name, ...props }: FormSliderProps<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={props.control}
      render={({ field, fieldState, formState }) => {
        return (
          <Slider
            {...props}
            isInvalid={!!formState.errors?.[name]?.message}
            errorMessage={formState.errors?.[name]?.message?.toString()}
            value={field.value}
            onChange={field.onChange}
          />
        );
      }}
    ></Controller>
  );
}
