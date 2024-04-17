import { columns, rows } from '@/app/work-task-types/data';
import IgmTableWrapper from '@/app/work-task-types/IgmTableWrapper';
import { Card } from '@nextui-org/card';
import { submitLessonTypeMatrix } from '@/app/work-task-types/submit-lesson-type-matrix';

const rowEntityName = 'Lesson Type';
export default function Page() {
  return (
    <Card fullWidth={false} className={'max-w-3xl'}>
      <IgmTableWrapper
        rowEntityName={rowEntityName}
        rows={rows}
        columns={columns}
        submitTo={submitLessonTypeMatrix}
      />
    </Card>
  );
}
