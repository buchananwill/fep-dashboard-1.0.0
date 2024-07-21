'use client';
import { Input, InputProps } from '@nextui-org/input';
import { useState } from 'react';
import { Button } from '@nextui-org/button';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

export type FocusToEditProps = InputProps;

export function FocusToEdit({ children, ...inputProps }: FocusToEditProps) {
  const [active, setActive] = useState(false);

  return (
    <div className={'flex items-center gap-1'}>
      <Button
        isIconOnly
        onPress={() => setActive((current) => !current)}
        className={'p-1.5 m-1'}
        variant={'light'}
      >
        <PencilSquareIcon />
      </Button>
      <div className={'inline-block grow'}>
        {active ? <Input {...inputProps} /> : children}
      </div>
    </div>
  );
}
