import React, { PropsWithChildren } from 'react';

export interface OverlayProps extends PropsWithChildren {
  className?: string;
}

export function Overlay({ children, className }: OverlayProps) {
  return (
    <div
      className={`w-full h-full absolute overflow-hidden bg-slate-100 opacity-75 top-0 left-0 z-20 flex place-content-center items-center ${className}`}
    >
      {children}
    </div>
  );
}
