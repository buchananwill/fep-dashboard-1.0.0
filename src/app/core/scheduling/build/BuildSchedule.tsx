'use client';
import { EncapsulatedButton } from '@/components/feasibility-report/CreateFeasibilityReport';
import { Button } from '@nextui-org/button';
import { useTransition } from 'react';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { buildScheduleAction } from '@/app/core/scheduling/build/buildScheduleAction';
import { useRouter } from 'next/navigation';
import { AutoBuildParametersDto } from '@/api/generated-types/generated-types';
import AutoBuildForm from '@/app/core/scheduling/build/BuildScheduleForm';

export default function BuildSchedule({
  cycleId,
  ...props
}: {
  cycleId: number;
  defaultMultiStepUndoTimeout: number;
  defaultMultiUndoIncrement: number;
  disable?: boolean;
}) {
  return <AutoBuildForm {...props} />;
}

const defaultParams: AutoBuildParametersDto = {
  saveBuild: true,
  forceSaveMetrics: false,
  multiUndoIncrement: 5,
  multiStepUndoTimeoutMs: 20_000
};
