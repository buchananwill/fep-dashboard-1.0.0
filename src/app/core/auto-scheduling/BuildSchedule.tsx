'use client';
import { AutoBuildParametersDto } from '@/api/generated-types/generated-types_';
import AutoBuildForm from '@/app/core/auto-scheduling/BuildScheduleForm';

export default function BuildSchedule({
  cycleId,
  ...props
}: {
  cycleId: number;
  defaultMultiStepUndoTimeout: number;
  defaultMultiUndoIncrement: number;
  disable?: boolean;
  costParameters: string[];
}) {
  return <AutoBuildForm {...props} />;
}

const defaultParams: AutoBuildParametersDto = {
  saveBuild: true,
  forceSaveMetrics: false,
  multiUndoIncrement: 5,
  multiStepUndoTimeoutMs: 20_000
};
