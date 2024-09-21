import { Control, Controller } from 'react-hook-form';
import { Input, InputProps } from '@nextui-org/input';
import React from 'react';
import { get } from 'lodash';

export type FormInputProps = {
  name: string;
  control: Control<any>;
} & InputProps;

export const ControlledInput: React.FC<FormInputProps> = ({
  name,
  value,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={props.control}
      render={({ field, fieldState, formState }) => {
        return (
          <Input
            {...props}
            name={name}
            isInvalid={
              formState.errors && !!get(formState.errors, name)?.message
            }
            errorMessage={
              formState.errors
                ? get(formState.errors, name)?.message?.toString()
                : null
            }
            value={field.value}
            onChange={field.onChange}
          />
        );
      }}
    ></Controller>
  );
};
