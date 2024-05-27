import { Control, Controller } from 'react-hook-form';
import { Select, SelectProps } from '@nextui-org/react';
import React from 'react';

export type FormSelectProps = {
  name: string;
  control: Control<any, any>;
} & SelectProps;

export const ControlledSelect: React.FC<FormSelectProps> = ({
  name,
  children,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={props.control}
      render={({ field, fieldState, formState }) => {
        return (
          <Select
            {...props}
            isInvalid={!!formState.errors?.[name]?.message}
            errorMessage={formState.errors?.[name]?.message?.toString()}
            selectedKeys={[field.value]}
            onChange={(value) => {
              field.onChange(value.target.value);
            }}
          >
            {children}
          </Select>
        );
      }}
    ></Controller>
  );
};
