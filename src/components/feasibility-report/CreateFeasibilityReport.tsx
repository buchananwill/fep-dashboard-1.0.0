'use client';

import { Button, ButtonProps } from '@nextui-org/button';
import { PressEvents } from '@react-types/shared';
import { createFeasibilityReport } from '@/api/createFeasibilityAction';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { FeasibilityReportDto } from '@/api/old-zod-schemas/FeasibilityReportDtoSchema';

export default function CreateFeasibilityReport({
  cycleId,
  ...props
}: EncapsulatedButton & { cycleId: number }) {
  const appRouterInstance = useRouter();
  const [isPending, startTransition] = useTransition();
  return (
    <Button
      {...props}
      onPress={() => {
        startTransition(async () => {
          const reportStub: FeasibilityReportDto =
            await createFeasibilityReport(cycleId);
          appRouterInstance.push(`/core/feasibility/view/${reportStub.id}`);
        });
      }}
    >
      <PendingOverlay pending={isPending} />
      Create Feasibility Report
    </Button>
  );
}

export type EncapsulatedButton = Omit<
  ButtonProps,
  keyof PressEvents | 'onClick'
>;
