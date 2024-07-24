'use client';
import { EncapsulatedButton } from '@/app/scheduling/feasibility-report/_components/CreateFeasibilityReport';
import { Button } from '@nextui-org/button';
import { useTransition } from 'react';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { buildScheduleAction } from '@/app/scheduling/build/buildScheduleAction';
import { useRouter } from 'next/navigation';

export default function BuildSchedule({
  cycleId,
  ...props
}: EncapsulatedButton & { cycleId: number }) {
  const [isPending, startTransition] = useTransition();
  const appRouterInstance = useRouter();

  return (
    <Button
      {...props}
      onPress={() => {
        startTransition(async () => {
          const scheduleDto = await buildScheduleAction(cycleId);
          appRouterInstance.push(`/core/scheduling/${scheduleDto.id}`);
        });
      }}
    >
      <PendingOverlay pending={isPending} />
      Build Schedule
    </Button>
  );
}
