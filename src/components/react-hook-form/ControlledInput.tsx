import { Controller, Path, useFormContext } from 'react-hook-form';
import React from 'react';
import { get } from 'lodash';
import { FieldValues } from 'react-hook-form/dist/types';
import { TextInput, TextInputProps } from '@mantine/core';

export type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
} & Omit<TextInputProps, 'name'>;

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
      render={({ field, formState }) => {
        return (
          <TextInput
            {...props}
            name={name}
            error={
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
