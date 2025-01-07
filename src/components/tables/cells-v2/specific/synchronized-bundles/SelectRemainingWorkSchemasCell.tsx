import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { ModalEditCell } from '@/components/tables/cells-v2/specific/ModalEditCell';
import { useGlobalDispatch, useGlobalListener } from 'selective-context';
import { EmptyArray } from '@/api/client-literals';
import {
  SynchronizedWorkPlanRequest,
  WorkPlanRequest,
  WorkProjectSeriesSchemaDto
} from '@/api/generated-types/generated-types_';
import { TransferList } from '@/components/generic/combo-boxes/TransferList';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';
import { SelectApiParamsMultiFlat } from '@/hooks/select-adaptors/selectApiTypes';
import { useCallback, useMemo, useRef } from 'react';
import { isEqual, set } from 'lodash';
import { useKnowledgeDomainWorkProjectSeriesSchemaLabel } from '@/components/work-plan-request/steps/IndependentBundle';
import { Button } from '@mantine/core';
import { workPlanGeneratorWizard } from '@/components/work-plan-request/WorkPlanRequestController';
import { updateNestedValueWithLodash } from '@/functions/updateNestedValue';
import { TypedPaths } from '@/api/custom-types/typePaths';

export function SelectRemainingWorkSchemasCell(
  props: IdInnerCellProps<number[]>
) {
  return (
    <ModalEditCell buttonLabel={`${props.value?.length ?? '0'}`}>
      {({ onClose }) => <InnerCell {...props} onClose={onClose} />}
    </ModalEditCell>
  );
}

export const remainingWorkSchemas = 'remaining-work-schemas';

export const allWorkSchemas = 'all-work-schemas';

function InnerCell({
  value,
  onChange,
  entityClass,
  entityId,
  onClose
}: IdInnerCellProps<number[]> & { onClose?: () => void }) {
  const { dispatchWithoutListen } = useGlobalDispatch<WorkPlanRequest>(
    workPlanGeneratorWizard
  );

  const { currentState: remainingSchemas } = useGlobalListener<
    WorkProjectSeriesSchemaDto[]
  >({
    contextKey: remainingWorkSchemas,
    initialValue: EmptyArray,
    listenerKey: `${entityClass}:${entityId}`
  });
  const { currentState: allSchemas } = useGlobalListener<
    WorkProjectSeriesSchemaDto[]
  >({
    contextKey: allWorkSchemas,
    initialValue: EmptyArray,
    listenerKey: `${entityClass}:${entityId}`
  });
  const rawDataRef = useRef(remainingSchemas);

  const selectedSchemas = useMemo(() => {
    return allSchemas.filter((dto) => value.includes(dto.id));
  }, [allSchemas, value]);

  const labelMaker = useKnowledgeDomainWorkProjectSeriesSchemaLabel();

  const rawData = useMemo(() => {
    const combined = [...remainingSchemas, ...selectedSchemas];
    if (isEqual(rawDataRef.current, combined)) {
      return rawDataRef.current;
    } else {
      rawDataRef.current = combined;
      return combined;
    }
  }, [remainingSchemas, selectedSchemas]);

  const propagateChange = useCallback(
    (value: WorkProjectSeriesSchemaDto[]) => {
      dispatchWithoutListen((prev) => {
        const mutable = { ...prev };
        mutable.synchronizedWorkPlanRequests =
          mutable.synchronizedWorkPlanRequests.map((request) => {
            if (request.id !== entityId) return request;
            else {
              const copy = { ...request };
              copy.workSchemaList = value.map((schema) => schema.id);
              return copy;
            }
          });

        return mutable;
      });
    },
    [dispatchWithoutListen, entityId]
  );

  const selectApi = useSelectApi<
    SelectApiParamsMultiFlat<WorkProjectSeriesSchemaDto>
  >({
    rawData,
    value: selectedSchemas,
    type: 'multiFlat',
    labelMaker,
    propagateChange
  });

  return (
    <>
      <TransferList {...selectApi} />
      <Button onClick={onClose}>Close</Button>
    </>
  );
}

export function useSmarterListMemo<T>(simpleMemoValue: T[]) {
  const listRef = useRef(EmptyArray);

  return useMemo(() => {
    if (isEqual(listRef.current, simpleMemoValue)) {
      return listRef.current;
    } else {
      listRef.current = simpleMemoValue;
      return simpleMemoValue;
    }
  }, [simpleMemoValue]);
}
