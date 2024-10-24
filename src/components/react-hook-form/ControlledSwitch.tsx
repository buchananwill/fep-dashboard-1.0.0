import { FieldValues } from 'react-hook-form/dist/types';
import { Controller, Path, useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import React from 'react';
import { Switch, SwitchProps } from '@mantine/core';

export type FormSwitchProps<T extends FieldValues> = {
  name: Path<T>;
} & Omit<SwitchProps, 'name'>;

export default function ControlledSwitch<T extends FieldValues>({
  name,
  ...props
}: FormSwitchProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, formState }) => {
        return (
          <Switch
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
}
