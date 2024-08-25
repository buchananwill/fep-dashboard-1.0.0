'use client';
import { DataNodeDto } from 'react-d3-force-wrapper';
import { OrganizationDto } from '@/api/generated-types/generated-types';
import { ClosureDto } from '@/api/zod-schemas/ClosureDtoSchema';
import VirtualizedTableWindowed from '@/components/tables/VirtualizedTableWindowed';
import { useTableProps } from '@/app/service-categories/[id]/roles/_components/useTableProps';
import { useGlobalController, useGlobalDispatch } from 'selective-context';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import CellQueryManager, {
  CellIdReference
} from '@/components/tables/CellQueryManager';
import { removeClosure } from '@/components/work-schema-node-assignments/enrollment-table/removeClosure';
import {
  removeEnrollment,
  renderEnrollmentCell
} from '@/components/work-schema-node-assignments/enrollment-table/RenderEnrollmentCell';
import { enableMapSet, produce } from 'immer';
import { TransientIdOffset } from '@/api/literals';
import {
  connectNodes,
  defaultClosureTemplate
} from '@/components/work-schema-node-assignments/enrollment-table/addClosure';
import RenderOrganizationCell from '@/components/work-project-series-assignments/RenderOrganizationCell';
import { CellWrapperProps } from '@/components/tables/getCellIdReference';
import { ChangesCallbackMap } from 'dto-stores';
import { HasIdClass } from '@/api/types';
import { Api } from '@/api/clientApi_';
import { useHasChangesFlagCallback } from 'dto-stores/dist/hooks/internal/useHasChangesFlagCallback';

interface EnrollmentTableProps {
  classes: DataNodeDto<OrganizationDto>[];
  enrollments: DataNodeDto<OrganizationDto>[];
  closures: ClosureMap;
}

enableMapSet();

export type ClosureMap = Record<string, Record<string, ClosureDto>>;

const enrollmentMap = 'enrollmentMap';
const listenerKey = 'tableIsController';

function useNextId() {
  return useCallback(() => {
    let id = TransientIdOffset;
    return id++;
  }, []);
}

export const addEnrollment = 'addEnrollment';

function flattenDoubleMap<T>(currentState: Record<string, Record<string, T>>) {
  return Object.values(currentState).flatMap((innerMap) =>
    Object.values(innerMap)
  );
}

function getIdSet<T>(originalClosures: HasIdClass<T>[]) {
  return originalClosures.reduce(
    (prev, curr) => prev.add(curr.id),
    new Set<T>()
  );
}

export default function EnrollmentTable({
  classes,
  closures,
  enrollments
}: EnrollmentTableProps) {
  const tableProps = useTableProps(enrollments, classes);
  const { currentState, dispatch } = useGlobalController({
    contextKey: enrollmentMap,
    listenerKey,
    initialValue: closures
  });
  const originalClosureMap = useRef(closures);
  const currentClosureMap = useRef(currentState);
  currentClosureMap.current = currentState;
  const [hasChanges, setHasChanges] = useState(false);

  const { dispatchWithoutListen: dispatchUnsavedFlag } =
    useGlobalDispatch<ChangesCallbackMap>('unsavedChanges');

  const handleCommit = useCallback(async () => {
    const closures = flattenDoubleMap(currentClosureMap.current);
    const originalClosures = flattenDoubleMap(originalClosureMap.current);
    const currentIdSet = getIdSet(closures);
    const deletedClosureIds = originalClosures
      .filter((c) => {
        const currentElement = currentClosureMap.current[c.target];
        if (currentElement) {
          const currentElementElement = currentElement[c.source];
          if (currentElementElement?.value === c.value) return false;
        }
        return true;
      })
      .map((c) => c.id);
    Api.Organization.putGraph({
      graphDto: {
        nodes: [...classes, ...enrollments],
        closureDtos: closures
      },
      deletedClosureIdList: deletedClosureIds,
      deletedNodeIdList: []
    });
    setHasChanges(false);
  }, [classes, enrollments]);

  useHasChangesFlagCallback(
    handleCommit,
    hasChanges,
    dispatchUnsavedFlag,
    enrollmentMap
  );

  const removeClosure = useMemo(() => {
    return {
      memoizedFunction: (closure: ClosureDto) => {
        dispatch((map) => removeClosureImmutably(map, closure));
        setHasChanges(true);
      }
    };
  }, [dispatch]);

  const nextId = useNextId();

  const addClosure = useMemo(() => {
    return {
      memoizedFunction: (source: number, target: number) => {
        dispatch((map) => {
          return addClosureImmutably(
            map,
            source,
            target,
            defaultClosureTemplate,
            nextId
          );
        });
        setHasChanges(true);
      }
    };
  }, [dispatch, nextId]);

  useGlobalController({
    contextKey: removeEnrollment,
    listenerKey,
    initialValue: removeClosure
  });

  useGlobalController({
    contextKey: addEnrollment,
    listenerKey,
    initialValue: addClosure
  });

  const getCellData = useCallback((tableData: ClosureMap) => {
    return {
      memoizedFunction: (idReference: CellIdReference) => {
        const row = tableData[String(idReference.rowId)];
        return row ? row[String(idReference.columnId)] : undefined;
      }
    };
  }, []);

  return (
    <>
      <CellQueryManager
        tableData={currentState}
        getDataRetrievalMemoizedFunction={getCellData}
      />
      <VirtualizedTableWindowed
        {...tableProps}
        renderCell={MemoCell}
        renderSyncedRowCell={MemoClassCell}
        renderSyncedColumnCell={RenderOrganizationCell}
      />
    </>
  );
}

const MemoCell = memo(renderEnrollmentCell);
const ClassCell = (props: CellWrapperProps) => (
  <RenderOrganizationCell {...props} location={'columnId'} />
);
const MemoClassCell = memo(ClassCell);

const removeClosureImmutably = produce<ClosureMap, [ClosureDto]>(removeClosure);
const addClosureImmutably = produce(connectNodes);
