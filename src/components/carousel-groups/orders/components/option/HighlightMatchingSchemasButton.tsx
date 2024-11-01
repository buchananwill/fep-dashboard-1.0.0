import { Button, ButtonProps } from '@mantine/core';
import clsx from 'clsx';
import { memo } from 'react';
import { AcademicCapIcon as AcademicCapIconFilled } from '@heroicons/react/24/solid';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

export function HighlightMatchingSchemasButton(props: {
  onClick?: () => void;
  canDrop: boolean;
  fallBackColor: ButtonProps['color'];
  highlighted: boolean;
  textFade?: string;
}) {
  return (
    <Button
      radius={'xs'}
      styles={{
        root: {
          padding: '4px'
        }
      }}
      autoContrast
      onClick={props.onClick}
      color={props.canDrop ? 'blue' : props.fallBackColor}
    >
      <MemoCapFilled
        className={clsx(
          'w-6',
          props.highlighted && 'text-red-500',
          !props.highlighted && 'opacity-0',
          'absolute transition-colors-opacity'
        )}
      />
      <MemoCap
        className={clsx(
          'w-8',
          props.highlighted && 'opacity-0',
          'transition-colors-opacity',
          props.textFade
        )}
      />
    </Button>
  );
}

const MemoCap = memo(AcademicCapIcon);
const MemoCapFilled = memo(AcademicCapIconFilled);
