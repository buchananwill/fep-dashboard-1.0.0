import { Control, Controller } from 'react-hook-form';
import { Textarea, TextareaProps } from '@mantine/core';

export type FormTextAreaProps = {
  name: string;
  control: Control<any>;
} & TextareaProps;

export const ControlledTextArea: React.FC<FormTextAreaProps> = ({
  name,
  ...props
}) => {
  return (
    <Controller
      name={name}
      control={props.control}
      render={({ field, fieldState, formState }) => {
        return (
          <Textarea
            {...props}
            error={formState.errors?.[name]?.message?.toString()}
            value={field.value}
            onChange={field.onChange}
          />
        );
      }}
    ></Controller>
  );
};
