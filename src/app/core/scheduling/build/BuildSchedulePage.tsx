import BuildSchedule from '@/app/core/scheduling/build/BuildSchedule';
import { parseTen } from '@/api/date-and-time';

const MULTI_STEP_UNDO_MS = parseTen(process.env.MULTI_STEP_UNDO_MS!);
const MULTI_UNDO_INCREMENT = parseTen(process.env.MULTI_UNDO_INCREMENT!);

export default async function BuildSchedulePage() {
  return (
    <BuildSchedule
      cycleId={1}
      defaultMultiStepUndoTimeout={MULTI_STEP_UNDO_MS ?? 20_000}
      defaultMultiUndoIncrement={MULTI_UNDO_INCREMENT ?? 5}
    />
  );
}
