'use client';
import { PropsWithChildren, useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Button, TextInput, TextInputProps } from '@mantine/core';

export function FocusToEdit({
  children,
  ...otherProps
}: Omit<TextInputProps, 'children'> & PropsWithChildren) {
  const [active, setActive] = useState(false);

  return (
    <div className={'flex items-center gap-1'}>
      <Button
        onClick={() => setActive((current) => !current)}
        variant={'subtle'}
      >
        <PencilSquareIcon className={'h-6 w-6'} />
      </Button>
      <div className={'inline-block grow'}>
        <TextInput disabled={!active} {...otherProps} />
      </div>
    </div>
  );
}
