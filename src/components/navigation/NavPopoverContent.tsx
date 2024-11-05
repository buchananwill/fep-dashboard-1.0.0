'use client';

import { navKeyList } from '@/components/navigation/navLinkIcons';
import NavLinkButton from '@/components/navigation/NavLinkButton';

export default function NavPopoverContent() {
  return (
    <div
      className={'relative grid grid-cols-5 gap-1 overflow-hidden rounded-lg'}
    >
      {navKeyList.map((key) => (
        <NavLinkButton key={key} navigationType={key} />
      ))}
    </div>
  );
}
