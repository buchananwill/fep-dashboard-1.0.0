import { Input, InputProps } from '@nextui-org/input';
import { forwardRef, useMemo } from 'react';

import { Validator } from '@/types';

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
