import { PropsWithChildren, ReactElement } from 'react';

export function NavTreeLinkWrapper({
  children,
  label: LabelComponent
}: PropsWithChildren & { label: ReactElement }) {
  return (
    <div className={'flex flex-col'}>
      {LabelComponent}
      <div className={'ml-4'}>{children}</div>
    </div>
  );
}
