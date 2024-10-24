import { useMemo, useState } from 'react';
import { useEscapeToClose } from '@/components/react-flow/generic/hooks/useEscapeToClose';

export function usePopoverFix(): UsePopoverFixReturn {
  const [popoverVisible, setPopoverVisible] = useState(false);

  const shouldCloseOnInteractOutside = useMemo(() => {
    return () => {
      setPopoverVisible(false);
      return false;
    };
  }, [setPopoverVisible]);

  useEscapeToClose(popoverVisible, setPopoverVisible);

  return useMemo(
    () => ({
      opened: popoverVisible,
      onClose: setPopoverVisible,
      isKeyboardDismissDisabled: false,
      shouldCloseOnInteractOutside
    }),
    [popoverVisible, setPopoverVisible, shouldCloseOnInteractOutside]
  );
}

export interface UsePopoverFixReturn {
  isKeyboardDismissDisabled: boolean;
  isOpen: boolean;
  onOpenChange: {
    (value: false | true | { (prevState: boolean): boolean }): void;
  };
  shouldCloseOnInteractOutside: () => boolean;
}
