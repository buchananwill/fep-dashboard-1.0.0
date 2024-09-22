import { FieldValues } from 'react-hook-form/dist/types';
import { Switch, SwitchProps } from '@nextui-org/react';
import { Controller, Path, useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import React from 'react';

export type FormSwitchProps<T extends FieldValues> = {
  name: Path<T>;
} & Omit<SwitchProps, 'name'>;

export default function ControlledSwitch<T extends FieldValues>({
  name,
  children,
  ...props
}: FormSwitchProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => {
        return (
          <Switch
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
          >
            {children}
          </Switch>
        );
      }}
    ></Controller>
  );
}
