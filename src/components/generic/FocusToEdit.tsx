'use client';
import { Input, InputProps } from '@nextui-org/input';
import { PropsWithChildren, useState } from 'react';
import { Button } from '@nextui-org/button';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

export type FocusToEditProps = { inputProps: InputProps };

export function FocusToEdit({
  children,
  inputProps: { children: inputChildren, ...props }
}: FocusToEditProps & PropsWithChildren) {
  const [active, setActive] = useState(false);

  return (
    <div className={'flex items-center gap-1'}>
      <Button
        isIconOnly
        onPress={() => setActive((current) => !current)}
        className={'m-1 p-1.5'}
        variant={'light'}
      >
        <PencilSquareIcon />
      </Button>
      <div className={'inline-block grow'}>
        {active ? (
          // @ts-ignore
          <Input {...props} />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
