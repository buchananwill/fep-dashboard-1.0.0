import { Chip } from '@nextui-org/chip';
import React from 'react';
import { AllocationSummary } from '@/components/react-flow/organization/allocationSummary';

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
          <Chip
            classNames={{ base: 'h-5' }}
            color={amount === 0 ? 'default' : 'primary'}
          >
            {amount}
          </Chip>
        </li>
      ))}
    </ul>
  );
}
