import { Control, Controller } from 'react-hook-form';
import { SliderProps } from '@nextui-org/react';
import { Slider } from '@nextui-org/slider';

export type FormSliderProps = {
  name: string;
  control: Control<any>;
} & SliderProps;

export const ControlledSlider: React.FC<FormSliderProps> = ({
  name,
  ...props
}) => {
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
};
