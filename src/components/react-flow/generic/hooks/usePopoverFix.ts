import { useMemo, useState } from 'react';
import { useEscapeToClose } from '@/components/react-flow/generic/hooks/useEscapeToClose';
import { useDisclosure } from '@mantine/hooks';

export function usePopoverFix(): UsePopoverFixReturn {
  const [opened, { open, close, toggle }] = useDisclosure();

  const shouldCloseOnInteractOutside = useMemo(() => {
    return () => {
      close();
      return false;
    };
  }, [close]);

  useEscapeToClose(opened, close);

  return useMemo(
    () => ({
      opened,
      onClose: close,
      isKeyboardDismissDisabled: false,
      shouldCloseOnInteractOutside,
      close,
      open,
      toggle
    }),
    [opened, close, shouldCloseOnInteractOutside, open, toggle]
  );
}

export interface UsePopoverFixReturn {
  isKeyboardDismissDisabled: boolean;
  opened: boolean;
  close: () => void;
  open: () => void;
  toggle: () => void;
  shouldCloseOnInteractOutside: () => boolean;
}
