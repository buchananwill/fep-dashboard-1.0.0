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
