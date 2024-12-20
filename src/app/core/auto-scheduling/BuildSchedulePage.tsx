import BuildSchedule from '@/app/core/auto-scheduling/BuildSchedule';
import { parseTen } from '@/api/date-and-time';
import { auth } from '@/auth';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';

const MULTI_STEP_UNDO_MS = parseTen(process.env.MULTI_STEP_UNDO_MS!);
const MULTI_UNDO_INCREMENT = parseTen(process.env.MULTI_UNDO_INCREMENT!);

export default async function BuildSchedulePage(props: LeafComponentProps) {
  const session = await auth();

  const costParameters = await getWithoutBody<string[]>(
    constructUrl('/api/v2/schedule/costParameterList')
  );

  return (
    <div className={'p-4'}>
      <RootCard layoutId={getRootCardLayoutId(props.pathVariables)}>
        <BuildSchedule
          disable={!session}
          cycleId={1}
          defaultMultiStepUndoTimeout={MULTI_STEP_UNDO_MS ?? 20_000}
          defaultMultiUndoIncrement={MULTI_UNDO_INCREMENT ?? 5}
          costParameters={costParameters}
        />
      </RootCard>
    </div>
  );
}
