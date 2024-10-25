import { GenericDivProps } from '@/components/react-flow/work-schema-node/components/BaseWorkSchemaNode';
import React from 'react';
import clsx from 'clsx';
import { ErrorSummary } from '@/functions/flatten-errors';
import { ScrollArea } from '@mantine/core';
import './ErrorDiv.module.css';

export function ErrorDiv({
  error,
  className,
  ...props
}: { error: ErrorSummary } & GenericDivProps) {
  return (
    <div
      {...props}
      className={clsx(
        'w-full rounded-lg bg-red-50 p-2 text-sm text-red-500',
        className
      )}
    >
      <ScrollArea
        className={'bg-opacity-0 py-2'}
        styles={{ scrollbar: { backgroundColor: 'transparent' } }}
      >
        <table>
          <tbody>
            {Object.entries(error).map(([key, value]) => (
              <tr key={key}>
                <th className={'flex justify-start text-sm'}>{key}</th>
                <td className={'text-nowrap'}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollArea>
    </div>
  );
}
