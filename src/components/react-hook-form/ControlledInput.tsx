import { Control, Controller, Path, useFormContext } from 'react-hook-form';
import { Input, InputProps } from '@nextui-org/input';
import React from 'react';
import { get } from 'lodash';
import { FieldValues } from 'react-hook-form/dist/types';

export type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
} & Omit<InputProps, 'name'>;

export const ControlledInput = <T extends FieldValues>({
  name,
  value,
  ...props
}: FormInputProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Controller
      name={name}
      control={control}
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
