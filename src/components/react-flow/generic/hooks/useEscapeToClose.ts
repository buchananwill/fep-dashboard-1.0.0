import { Dispatch, SetStateAction, useEffect } from 'react';

export function useEscapeToClose(isOpen: boolean, close: () => void) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function keyDownHandler(e: KeyboardEvent) {
      if (isOpen && e.key === 'Escape') {
        e.preventDefault();
        close();
      }
    }

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [isOpen, close]);
}
