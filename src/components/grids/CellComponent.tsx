import React, { CSSProperties } from 'react';
import { BaseLazyDtoUiProps, LazyDtoUiWrapper } from 'dto-stores';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { areEqual } from 'react-window';
import {
  SuitabilityConditions,
  SuitabilityEntity
} from '@/components/roles/suitability/SuitabilityTable';
import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import { GenericSuitabilityCell } from '@/components/work-types/GenericSuitabilityCell';
import { SuitabilityMatrixCell } from '@/components/work-types/suitabilityMatrixCell';
import { DispatchState } from '@/types';

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
