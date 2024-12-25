import { WorkPlanRequestWizardStepProps } from '@/components/work-plan-request/WorkPlanRequestController';
import {
  SynchronizedWorkPlanRequest,
  WorkPlanRequest,
  WorkProjectSeriesSchemaDto
} from '@/api/generated-types/generated-types_';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import { Column } from '@/types';
import { IdWrapper } from '@/api/types';
import { CellComponentRecord } from '@/components/tables/core-table-types';
import { DeleteEntity } from '@/components/tables/cells-v2/generic/DeleteEntity';
import {
  getNumberUpdater,
  getStringUpdater
} from '@/functions/cellUpdaterFunctions';
import { updateNestedValueWithLodash } from '@/functions/updateNestedValue';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';
import EditTextWithModalCell from '@/components/tables/cells-v2/generic/EditTextWithModalCell';
import { NumberEditCell } from '@/components/tables/cells-v2/generic/NumberEditCell';
import { AnyValueToString } from '@/components/tables/cells-v2/generic/AnyValueToString';
import {
  allWorkSchemas,
  remainingWorkSchemas,
  SelectRemainingWorkSchemasCell,
  useSmarterListMemo
} from '@/components/tables/cells-v2/specific/synchronized-bundles/SelectRemainingWorkSchemasCell';
import { NamespacedHooks, useWriteAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useWpssQueryWithWorkPlanRequest } from '@/components/work-plan-request/steps/useWpssQueryWithWorkPlanRequest';
import { useGlobalController } from 'selective-context';
import { useSortWpssByKnowledgeDomainName } from '@/components/work-plan-request/steps/IndependentBundle';
import { Button, Popover } from '@mantine/core';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useDisclosure } from '@mantine/hooks';
import { isNotNullish } from '@/api/main';
import EntityTable from '@/components/tables/edit-tables/EntityTable';
import { EditGroupSizeCell } from '@/components/tables/cells-v2/specific/synchronized-bundles/EditGroupSizeCell';
import { EditSynchronizedPlanNameCell } from '@/components/tables/cells-v2/specific/synchronized-bundles/EditSynchronizedPlanNameCell';

const synchronizedBundles = 'synchronizedBundles';

export function useRemainingUnselectedSchemas(
  currentState: WorkPlanRequest,
  allSchemas: WorkProjectSeriesSchemaDto[]
) {
  return useMemo(() => {
    const assignedSchemas = new Set<number>();
    currentState.independentWorkSchemas.forEach((id) =>
      assignedSchemas.add(id)
    );
    Object.values(currentState.synchronizedWorkPlanRequests).forEach((plan) => {
      plan.workSchemaList.forEach((id) => assignedSchemas.add(id));
    });
    return allSchemas.filter((schema) => !assignedSchemas.has(schema.id));
  }, [
    currentState.independentWorkSchemas,
    currentState.synchronizedWorkPlanRequests,
    allSchemas
  ]);
}

export function SynchronizedBundles({
  currentState,
  dispatchWithoutControl
}: WorkPlanRequestWizardStepProps) {
  const rowIdRef = useRef<string[]>([]);
  const rowIdList = useMemo(() => {
    const strings = Object.keys(currentState.synchronizedWorkPlanRequests);
    if (isEqual(strings, rowIdRef.current)) {
      return rowIdRef.current;
    } else {
      rowIdRef.current = strings;
      return strings;
    }
  }, [currentState.synchronizedWorkPlanRequests]);

  const { data } = useWpssQueryWithWorkPlanRequest(currentState);

  const sortedData = useSortWpssByKnowledgeDomainName(data);

  const { dispatch: dispatchRemainingWorkSchemas } = useGlobalController({
    contextKey: remainingWorkSchemas,
    initialValue: EmptyArray,
    listenerKey: synchronizedBundles
  });

  const { dispatch: dispatchAllSchemas, currentState: allSchemas } =
    useGlobalController<WorkProjectSeriesSchemaDto[]>({
      contextKey: allWorkSchemas,
      initialValue: EmptyArray,
      listenerKey: synchronizedBundles
    });

  useEffect(() => {
    dispatchAllSchemas(sortedData);
  }, [dispatchAllSchemas, sortedData]);
  const remainingSchemas = useRemainingUnselectedSchemas(
    currentState,
    allSchemas
  );

  const smarterListMemo = useSmarterListMemo(remainingSchemas);

  useEffect(() => {
    dispatchRemainingWorkSchemas(smarterListMemo);
  }, [smarterListMemo, dispatchRemainingWorkSchemas]);

  const parallelPlans = useMemo(() => {
    return Object.entries(currentState.synchronizedWorkPlanRequests).map(
      ([key, value]) =>
        ({ id: key, data: value }) as IdWrapper<SynchronizedWorkPlanRequest>
    );
  }, [currentState.synchronizedWorkPlanRequests]);

  const dispatch = NamespacedHooks.useDispatch<
    IdWrapper<SynchronizedWorkPlanRequest>[]
  >(EntityClassMap.parallelWorkPlan, KEY_TYPES.MASTER_LIST);

  useEffect(() => {
    dispatch(parallelPlans);
    return () => dispatch(EmptyArray);
  }, [parallelPlans, dispatch]);

  const { currentState: parallelPlanIdArray } = NamespacedHooks.useListen<
    string[]
  >(
    EntityClassMap.parallelWorkPlan,
    KEY_TYPES.ID_LIST,
    synchronizedBundles,
    EmptyArray
  );
  const writeAnyDto = useWriteAnyDto(EntityClassMap.parallelWorkPlan);

  useEffect(() => {
    parallelPlans
      .filter((plan) => parallelPlanIdArray.includes(plan.id))
      .forEach((plan) => writeAnyDto(plan.id, plan));
  }, [parallelPlanIdArray, writeAnyDto, parallelPlans]);

  const unusedSegmentCounts = useMemo(() => {
    return segmentsAllowed;
  }, []);

  const [segmentToAdd, setSegmentToAdd] = useState<number | undefined>(
    undefined
  );

  const [opened, { toggle, close, open }] = useDisclosure();

  const segmentButtons = useMemo(() => {
    return unusedSegmentCounts.map((count) => {
      return (
        <Button
          variant={'subtle'}
          key={count}
          onClick={() => {
            setSegmentToAdd(count);
            close();
          }}
        >
          {count}
        </Button>
      );
    });
  }, [unusedSegmentCounts, close]);

  const addPlan = useCallback(() => {
    if (dispatchWithoutControl && segmentToAdd) {
      dispatchWithoutControl((prev) => ({
        ...prev,
        synchronizedWorkPlanRequests: {
          ...prev.synchronizedWorkPlanRequests,
          [String(segmentToAdd)]: {
            ...baselineRequest,
            id: crypto.randomUUID(),
            name: `${prev.planName}.${segmentToAdd}`,
            userCount: prev.numberOfUsers,
            organizationRepeatCount: segmentToAdd
          }
        }
      }));
      const remainingSegments = unusedSegmentCounts.filter(
        (count) => count !== segmentToAdd
      );
      setSegmentToAdd(
        remainingSegments.length > 0 ? remainingSegments[0] : undefined
      );
    }
  }, [dispatchWithoutControl, segmentToAdd, unusedSegmentCounts]);

  const {
    currentState: deletedList,
    dispatchWithoutControl: dispatchDeletedList
  } = NamespacedHooks.useDispatchAndListen(
    EntityClassMap.parallelWorkPlan,
    KEY_TYPES.DELETED,
    synchronizedBundles,
    EmptyArray
  );

  useEffect(() => {
    if (dispatchWithoutControl) {
      dispatchWithoutControl((prev) => {
        const mutable = structuredClone(prev);
        deletedList.forEach((id) => {
          delete mutable.synchronizedWorkPlanRequests[id];
        });
        return mutable;
      });
      dispatchDeletedList(EmptyArray);
    }
  }, [deletedList, dispatchDeletedList, dispatchWithoutControl]);

  return (
    <>
      <EntityTable
        entityClass={EntityClassMap.parallelWorkPlan}
        columns={synchronizedWorkPlanColumns}
        cellModel={synchronizedWorkPlanCellModel}
      />
      <Button.Group>
        <Button disabled={!segmentToAdd} onClick={addPlan} className={'grow'}>
          Add Bundle with segments:
        </Button>
        <Popover trapFocus onClose={close} onChange={toggle} opened={opened}>
          <Popover.Target>
            <Button
              px={'0.5rem'}
              onClick={toggle}
              rightSection={<ChevronDownIcon height={'1.5rem'} />}
            >
              {segmentToAdd ?? '-'}
            </Button>
          </Popover.Target>
          <Popover.Dropdown>{...segmentButtons}</Popover.Dropdown>
        </Popover>
      </Button.Group>
    </>
  );
}

export const synchronizedWorkPlanColumns: Column<
  IdWrapper<SynchronizedWorkPlanRequest>
>[] = [
  {
    uid: 'id',
    name: 'Delete',
    sortable: false
  },
  {
    uid: 'data.name',
    name: 'Name',
    sortable: true
  },
  {
    uid: 'data.groupSize',
    name: 'Group Size',
    sortable: true
  },
  {
    uid: 'data.organizationRepeatCount',
    name: 'Segments',
    sortable: true
  },
  {
    uid: 'data.workSchemaList',
    name: 'Schemas',
    sortable: true
  }
];

const synchronizedCellRecord: CellComponentRecord<
  IdWrapper<SynchronizedWorkPlanRequest>
> = {
  id: { type: 'CustomCell', component: DeleteEntity },
  'data.name': {
    type: 'IdInnerCell',
    component: EditSynchronizedPlanNameCell,
    updater: getStringUpdater('data.name')
  },
  'data.groupSize': {
    type: 'IdInnerCell',
    component: EditGroupSizeCell
  },
  'data.organizationRepeatCount': {
    type: 'IdInnerCell',
    component: AnyValueToString
  },
  'data.workSchemaList': {
    type: 'IdInnerCell',
    component: SelectRemainingWorkSchemasCell,
    updater: (prev, value) =>
      updateNestedValueWithLodash(prev, 'data.workSchemaList', value)
  }
};

export const synchronizedWorkPlanCellModel = getCellRenderFunction(
  'synchronizedWorkPlan',
  synchronizedCellRecord
);

const segmentsAllowed: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const baselineRequest: SynchronizedWorkPlanRequest = {
  id: '',
  name: '',
  workSchemaList: [],
  userCount: 0,
  organizationRepeatCount: 0,
  groupSize: 1
};
