import { PropsWithChildren, ReactElement } from 'react';

export function NavTreeLinkWrapper({
  children,
  label: LabelComponent
}: PropsWithChildren & { label: ReactElement }) {
  return (
    <>
      {LabelComponent}
      <div className={'flex flex-col'}>
        <div className={'ml-4'}>{children}</div>
      </div>
    </>
  );
}
