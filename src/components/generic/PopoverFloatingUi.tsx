'use client';
import {
  arrow,
  offset,
  shift,
  useFloating,
  UseFloatingOptions
} from '@floating-ui/react';
import { merge } from 'lodash';
import { PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function PopoverFloatingUi({
  options,
  parentElementRef,
  children,
  open
}: {
  options?: UseFloatingOptions;
  parentElementRef: HTMLElement | null;
  open: boolean;
} & PropsWithChildren) {
  const [arrowRef, setArrowRef] = useState<HTMLDivElement | null>(null);
  const hookProps = useMemo(() => {
    return merge(
      {
        ...defaultOptions,
        middleware: [...middlewareDefaults, arrow({ element: arrowRef })]
      },
      options
    );
  }, [options]);

  const { refs, floatingStyles, middlewareData } = useFloating(
    merge(
      {
        ...defaultOptions,
        middleware: [...middlewareDefaults, arrow({ element: arrowRef })]
      },
      options
    )
  );

  useEffect(() => {
    refs.setPositionReference(parentElementRef);
  }, [parentElementRef, refs]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          ref={refs.setFloating}
          style={floatingStyles}
          className={'z-50'}
        >
          <div
            ref={(e) => setArrowRef(e)}
            style={{
              position: 'absolute',
              left: middlewareData.arrow?.x,
              top: middlewareData.arrow?.y
            }}
          >
            <div
              id={'arrow'}
              className={
                'h-6 w-6 rotate-45 border-1 bg-default-400 bg-white drop-shadow-2xl'
              }
            />
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const middlewareDefaults = [offset(10), shift()] as const;

const defaultOptions: UseFloatingOptions = {} as const;
