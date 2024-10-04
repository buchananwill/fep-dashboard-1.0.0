import { GenericDivProps } from '@/components/react-flow/work-schema-node/components/BaseWorkSchemaNode';
import React from 'react';
import clsx from 'clsx';

export function ErrorDiv({
  message,
  className,
  ...props
}: { message: string } & GenericDivProps) {
  return (
    <div
      {...props}
      className={clsx(
        'w-full text-wrap rounded-lg bg-danger-50 p-2 text-sm text-danger-500',
        className
      )}
    >
      {message}
    </div>
  );
}
