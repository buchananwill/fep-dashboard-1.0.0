import { columns, rows } from '@/app/work-task-types/data';
import IgmTableWrapper from '@/app/work-task-types/IgmTableWrapper';

const rowEntityName = 'Lesson Type';
export default function Page() {
  return (
    <IgmTableWrapper
      rowEntityName={rowEntityName}
      rows={rows}
      columns={columns}
    />
  );
}
