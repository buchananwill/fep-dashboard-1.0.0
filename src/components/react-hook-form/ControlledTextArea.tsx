import { Control, Controller } from 'react-hook-form';
import { Textarea, TextAreaProps } from '@nextui-org/input';

export type FormTextAreaProps = {
  name: string;
  control: Control<any>;
} & TextAreaProps;

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
