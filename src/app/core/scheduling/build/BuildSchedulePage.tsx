import BuildSchedule from '@/app/core/scheduling/build/BuildSchedule';
import { parseTen } from '@/api/date-and-time';
import { auth } from '@/auth';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { Overlay } from '@/components/overlays/overlay';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';

const MULTI_STEP_UNDO_MS = parseTen(process.env.MULTI_STEP_UNDO_MS!);
const MULTI_UNDO_INCREMENT = parseTen(process.env.MULTI_UNDO_INCREMENT!);

export default async function BuildSchedulePage() {
  const session = await auth();

  const costParameters = await getWithoutBody<string[]>(
    constructUrl('/api/v2/schedule/costParameterList')
  );

  return (
    <div>
      <BuildSchedule
        disable={!session}
        cycleId={1}
        defaultMultiStepUndoTimeout={MULTI_STEP_UNDO_MS ?? 20_000}
        defaultMultiUndoIncrement={MULTI_UNDO_INCREMENT ?? 5}
        costParameters={costParameters}
      />
    </div>
  );
}
