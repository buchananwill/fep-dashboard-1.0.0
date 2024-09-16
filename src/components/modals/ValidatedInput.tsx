import { Input, InputProps } from '@nextui-org/input';
import { Validator } from '@/components/modals/EditTextValueModal';
import { forwardRef, useMemo } from 'react';

interface ValidatedInputProps extends InputProps {
  validator?: Validator<string>;
}

export function useInputValidation(
  validator: Validator<string> | undefined,
  value: string | undefined
) {
  const { error, errorMessage } = useMemo(() => {
    return validator ? validator(value) : {};
  }, [validator, value]);

  return { error, errorMessage };
}

export const ValidatedInput = forwardRef<HTMLInputElement, ValidatedInputProps>(
  ({ validator, value, ...props }, ref) => {
    const { error, errorMessage } = useInputValidation(validator, value);

    return (
      <Input
        {...props}
        ref={ref}
        value={value}
        errorMessage={errorMessage}
        isInvalid={error}
      />
    );
  }
);

ValidatedInput.displayName = 'ValidatedInput';
