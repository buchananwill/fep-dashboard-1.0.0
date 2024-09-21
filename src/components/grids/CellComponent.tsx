import {
  BaseDtoStoreNumberInputProps,
  ConditionalNumberClassName,
  DtoStoreNumberInput
} from '@/components/generic/DtoStoreNumberInput';
import React, {
  CSSProperties,
  SetStateAction,
  useCallback,
  useMemo,
  useState
} from 'react';
import {
  BaseLazyDtoUiProps,
  LazyDtoUiWrapper,
  useLazyDtoStore
} from 'dto-stores';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import clsx from 'clsx';
import { areEqual } from 'react-window';
import {
  SuitabilityConditions,
  SuitabilityEntity
} from '@/components/roles/suitability/SuitabilityTable';
import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import { GenericSuitabilityCell } from '@/components/work-task-types/GenericSuitabilityCell';
import { EntityClassMap } from '@/api/entity-class-map';
import { SuitabilityMatrixCell } from '@/components/work-task-types/suitabilityMatrixCell';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';
import { joinRowAndColumnId } from '@/components/work-task-types/WorkTaskTypeMatrixCell';
import { DispatchState } from '@/types';

const conditionalNumberFormatting: ConditionalNumberClassName[] = [
  { startAt: -1, className: 'opacity-50' },
  { startAt: 0, className: 'bg-white opacity-50' },
  { startAt: 1, className: ' bg-red-100' },
  { startAt: 2, className: ' bg-amber-100' },
  { startAt: 3, className: ' bg-yellow-100' },
  { startAt: 4, className: ' bg-emerald-100' }
];

// TODO The use of TransientIdOffset is tricking the table into believing that cells with IDs matching the incoming request data are the same cell. Very subtle bug! Not sure how to fix this within the current architecture.
export const CellComponent = ({
  columnIndex,
  rowIndex,
  style,
  data
}: {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
  data: {
    dataResponse: SuitabilityEntity[][];
    suitabilityCondition: SuitabilityConditions;
  };
}) => {
  const {
    suitabilityCondition: { suitabilityType, suitabilityEntityType },
    dataResponse
  } = data;
  const datumRowOrUndefined = dataResponse[rowIndex];
  const datumElement = datumRowOrUndefined
    ? datumRowOrUndefined[columnIndex]
    : undefined;

  return (
    <div style={style}>
      {datumElement ? (
        <LazyDtoUiWrapper
          entityClass={suitabilityEntityType}
          renderAs={CellInnerWrapper}
          wrapper={{ rowIndex, columnIndex }}
          whileLoading={() => (
            <div className={'relative'}>
              <PendingOverlay pending={true} />
            </div>
          )}
          entityId={datumElement.id}
        />
      ) : (
        ''
      )}
    </div>
  );
};

function CellInnerWrapper({
  entity,
  dispatchWithoutControl,
  entityClass,
  children,
  wrapper
}: BaseLazyDtoUiProps<SuitabilityEntity> & {
  wrapper: Pick<CellWrapperProps, 'rowIndex' | 'columnIndex'>;
}) {
  return (
    <GenericSuitabilityCell
      {...wrapper}
      currentCell={entity}
      setCurrentCell={
        dispatchWithoutControl as DispatchState<SuitabilityMatrixCell>
      }
    />
  );
}

export const CellComponentMemo = React.memo(CellComponent, areEqual);
