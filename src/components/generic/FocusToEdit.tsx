'use client';
import { PropsWithChildren, useState } from 'react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Button, Input } from '@nextui-org/react';
import { Simplify } from 'type-fest';

type InputProps = Simplify<typeof Input.propTypes>;

export function FocusToEdit({
  children,
  ...otherProps
}: Omit<InputProps, 'children'> & PropsWithChildren) {
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
        {active ? <Input {...otherProps} /> : children}
      </div>
    </div>
  );
}
