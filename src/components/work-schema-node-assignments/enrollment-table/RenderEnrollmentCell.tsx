import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import VirtualizedOuterCell from '@/components/grids/VirtualizedCell';
import { ClosureDto } from '@/api/zod-schemas/ClosureDtoSchema';
import { InnerCellContent } from '@/components/work-project-series-assignments/table-view/AssignmentCell';
import { SetRequired } from 'type-fest';
import { useGlobalListener } from 'selective-context';
import { useCallback } from 'react';
import clsx from 'clsx';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { addEnrollment } from '@/components/work-schema-node-assignments/enrollment-table/EnrollmentTable';
import { getNumberFromStringId } from 'react-d3-force-wrapper';
import { Identifier } from 'dto-stores';

export function renderEnrollmentCell(props: CellWrapperProps) {
  return <VirtualizedOuterCell {...props} innerCell={InnerEnrollmentCell} />;
}

function InnerEnrollmentCell({ cellData, ...props }: InnerCellContent) {
  return (
    <div className={'p-1'}>
      {cellData ? (
        <Enrollment {...props} cellData={cellData} />
      ) : (
        <NoEnrollment {...props} />
      )}
    </div>
  );
}

export const removeEnrollment = 'removeEnrollment';

function Enrollment(
  props: SetRequired<InnerCellContent<ClosureDto>, 'cellData'>
) {
  const { cellData, rowIndex, columnIndex } = props;
  const directEnrollment = cellData.value === 1;
  const {
    currentState: { memoizedFunction }
  } = useGlobalListener({
    contextKey: removeEnrollment,
    initialValue: undefinedRemoveClosure,
    listenerKey: ['cell', rowIndex, columnIndex].join(':')
  });

  const onClick = useCallback(() => {
    memoizedFunction(cellData);
  }, [cellData, memoizedFunction]);

  return (
    <button
      className={clsx('h-full w-full', directEnrollment && 'hover:opacity-50')}
      disabled={!directEnrollment}
      onClick={onClick}
    >
      <CheckCircleIcon
        className={clsx(directEnrollment ? 'text-emerald-600' : 'text-sky-400')}
      />
    </button>
  );
}

const undefinedRemoveClosure = {
  memoizedFunction: (closure: ClosureDto) => console.log(closure)
};
const undefinedAddClosure = {
  memoizedFunction: (source: number, target: number) =>
    console.log(source, target)
};

function NoEnrollment(props: InnerCellContent) {
  const { columnIndex, rowIndex, data } = props;

  const { rowId, columnId } = data[rowIndex][columnIndex];

  const {
    currentState: { memoizedFunction }
  } = useGlobalListener({
    contextKey: addEnrollment,
    initialValue: undefinedAddClosure,
    listenerKey: ['cell', rowIndex, columnIndex].join(':')
  });

  const onClick = useCallback(() => {
    memoizedFunction(columnId as number, rowId as number);
  }, [memoizedFunction, rowId, columnId]);

  return (
    <button onClick={onClick} className={'h-full w-full hover:opacity-50'}>
      <XCircleIcon className={'text-gray-400'} />
    </button>
  );
}
