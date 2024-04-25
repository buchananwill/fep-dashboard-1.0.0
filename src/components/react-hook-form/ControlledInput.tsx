import { Control, Controller } from "react-hook-form";
import { Input, InputProps } from "@nextui-org/input";

export type FormInputProps = {
  name: string;
  control: Control<any, any>;
} & InputProps;

export const ControlledInput: React.FC<FormInputProps> = ({
  name,
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
