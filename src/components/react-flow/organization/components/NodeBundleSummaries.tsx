import React from 'react';

import { AllocationSummary } from '@/components/react-flow/organization/types';
import clsx from 'clsx';

export default function NodeBundleSummaries({
  summaries
}: {
  summaries: AllocationSummary[];
}) {
  return (
    <ul className={'col-span-3'}>
      {summaries.map(({ label, amount }) => (
        <li key={label} className={'flex justify-between'}>
          {label}:{' '}
          <div
            className={clsx(
              'min-w-6 rounded-lg px-1 py-0.5 text-right text-sm text-white',
              amount === 0 ? 'bg-neutral-300' : 'bg-blue-400'
            )}
          >
            {amount}
          </div>
        </li>
      ))}
    </ul>
  );
}
