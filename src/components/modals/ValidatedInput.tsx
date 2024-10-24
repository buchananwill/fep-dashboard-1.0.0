import { useMemo } from 'react';

import { Validator } from '@/types';

export function useInputValidation(
  validator: Validator<string> | undefined,
  value: string | undefined
) {
  const { error, errorMessage } = useMemo(() => {
    return validator ? validator(value) : {};
  }, [validator, value]);

  return { error, errorMessage };
}
