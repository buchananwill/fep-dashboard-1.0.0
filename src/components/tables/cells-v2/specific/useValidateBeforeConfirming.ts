import { useCallback } from 'react';

export function useValidateBeforeConfirming<T>(
  onChange: ((value: T) => void) | undefined,
  onClose: (() => void) | undefined,
  validationInterceptor: () => {
    confirmedResponse: boolean;
    updateResponse: T;
  }
) {
  return useCallback(() => {
    if (!onChange || !onClose) return;

    const { confirmedResponse: confirmed, updateResponse } =
      validationInterceptor();

    if (confirmed) {
      onChange(updateResponse);
      onClose();
    }
  }, [onChange, onClose, validationInterceptor]);
}
