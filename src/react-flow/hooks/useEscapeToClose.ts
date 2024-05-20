import { Dispatch, SetStateAction, useEffect } from "react";

export function useEscapeToClose(
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function keyDownHandler(e: KeyboardEvent) {
      if (isOpen && e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [isOpen, setIsOpen]);
}
