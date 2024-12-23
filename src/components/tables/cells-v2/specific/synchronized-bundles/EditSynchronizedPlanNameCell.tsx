import { IdInnerCellProps } from '@/components/tables/core-table-types';
import { NumberInput, TextInput } from '@mantine/core';
import {
  useGlobalDispatch,
  useGlobalDispatchAndListener
} from 'selective-context';
import { workPlanGeneratorWizard } from '@/components/work-plan-request/WorkPlanRequestController';
import { useCallback, useRef, useState } from 'react';
import { WorkPlanRequest } from '@/api/generated-types/generated-types_';
import { ModalEditCell } from '@/components/tables/cells-v2/specific/ModalEditCell';
import { ModalConfirmationFooter } from '@/components/tables/cells-v2/specific/ModalConfirmationFooter';
import { initialRequest } from '@/components/work-plan-request/workPlanRequestInitial';
import { notifications } from '@mantine/notifications';
import { Identifier } from 'dto-stores';

export function EditSynchronizedPlanNameCell(props: IdInnerCellProps<string>) {
  return (
    <ModalEditCell buttonLabel={props.value}>
      {({ onClose }) => <InnerCell {...props} onClose={onClose} />}
    </ModalEditCell>
  );
}

function checkSynchronizedPlanNameIsUnique(
  currentState: WorkPlanRequest,
  value: string,
  entityId: Identifier
) {
  return !Object.entries(
    currentState.repeatCountToParallelWorkPlanRequests
  ).some(([key, innerValue]) => {
    return value === innerValue.name && key != entityId;
  });
}

function InnerCell({
  entityId,
  value,
  entityClass,
  onClose
}: IdInnerCellProps<string> & { onClose?: () => void }) {
  const { dispatchWithoutControl, currentState } =
    useGlobalDispatchAndListener<WorkPlanRequest>({
      contextKey: workPlanGeneratorWizard,
      listenerKey: `${entityClass}:${entityId}`,
      initialValue: initialRequest
    });
  const [valueCurrent, setValueCurrent] = useState(value);

  const valueRef = useRef(valueCurrent);
  valueRef.current = valueCurrent;

  const onConfirm = useCallback(() => {
    if (
      checkSynchronizedPlanNameIsUnique(
        currentState,
        valueRef.current,
        entityId
      )
    ) {
      dispatchWithoutControl((prev) => {
        const mutable = { ...prev };
        const { repeatCountToParallelWorkPlanRequests } = mutable;
        const synchronizedWorkPlanRequest = structuredClone(
          repeatCountToParallelWorkPlanRequests[entityId]
        );
        synchronizedWorkPlanRequest.name = valueRef.current;
        mutable.repeatCountToParallelWorkPlanRequests = {
          ...repeatCountToParallelWorkPlanRequests
        };
        mutable.repeatCountToParallelWorkPlanRequests[entityId] =
          synchronizedWorkPlanRequest;
        return mutable;
      });
      onClose && onClose();
    } else {
      notifications.show({
        message: 'Name is not unique',
        color: 'danger'
      });
    }
  }, [dispatchWithoutControl, entityId, currentState, onClose]);

  return (
    <>
      <TextInput
        value={valueCurrent}
        onChange={(v) => setValueCurrent(v.target.value)}
      />
      <ModalConfirmationFooter
        confirmLabel={'Update name'}
        onConfirm={onConfirm}
        onCancel={onClose}
      />
    </>
  );
}
