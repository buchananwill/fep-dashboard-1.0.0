import { PropsWithChildren } from 'react';

export function Overlay({ children }: PropsWithChildren) {
  return (
    <div
      className={
        'w-full h-full absolute bg-slate-100 opacity-75 top-0 left-0 z-20 flex place-content-center items-center'
      }
    >
      {children}
    </div>
  );
}