'use client';
import {
  CommitServerAction,
  EditAddDeleteDtoControllerArray,
  NamespacedHooks,
  useReadAnyDto
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  AssetRoleTypeWorkTypeSuitabilityDto,
  ProviderRoleTypeWorkTypeSuitabilityDto
} from '@/api/generated-types/generated-types_';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray, ObjectPlaceholder } from '@/api/client-literals';

import React, { useEffect, useMemo, useState } from 'react';
import {
  SyncedColumnCellMemo,
  SyncedRowCellMemo
} from '@/components/grids/SyncedCell';
import { ProviderRoleDto } from '@/api/generated-types/generated-types_';
import { isNotUndefined } from '@/api/main';
import { Api } from '@/api/clientApi_';
import VirtualizedTableWindowed from '@/components/grids/VirtualizedTableWindowed';
import { CellComponentMemo } from '@/components/grids/CellComponent';
import { useGlobalController } from 'selective-context';
import { CellIndex } from '@/components/grids/createRowIdColumnIdCells';
import { DropResult } from '@/components/work-types/GenericSuitabilityCell';
import {
  dropResultContextKey,
  hoverTargetCellIndex
} from '@/components/work-types/WorkTypeMatrix';

export type RoleTypes = (typeof EntityClassMap)[
  | 'assetRole'
  | 'providerRole'
  | 'userRole'];

export type SuitabilityEntityTypes = (typeof EntityClassMap)[
  | 'assetRoleTypeWorkTypeSuitability'
  | 'providerRoleTypeWorkTypeSuitability'];

export type SuitabilityEntity =
  | ProviderRoleTypeWorkTypeSuitabilityDto
  | AssetRoleTypeWorkTypeSuitabilityDto;

export interface SuitabilityTableProps {
  suitabilityType: RoleTypes;
  roleTypeId: number;
}

export interface SuitabilityConditions {
  suitabilityEntityType: SuitabilityEntityTypes;
  suitabilityType: RoleTypes;
  baseEntityIdAccessor: 'partyId' | 'assetId';
  displayNameAccessor: 'partyName' | 'assetName';
  api: (typeof SuitabilityApis)[keyof typeof SuitabilityApis];
}

const SuitabilityApis = {
  ProviderRole: Api.ProviderRoleTypeWorkTypeSuitability,
  AssetRole: Api.AssetRoleTypeWorkTypeSuitability
} as const;

export const AssetSuitabilityCondition: SuitabilityConditions = {
  suitabilityEntityType: EntityClassMap.assetRoleTypeWorkTypeSuitability,
  suitabilityType: EntityClassMap.assetRole,
  baseEntityIdAccessor: 'assetId',
  displayNameAccessor: 'assetName',
  api: Api.AssetRoleTypeWorkTypeSuitability
} as const;
export const ProviderSuitabilityCondition: SuitabilityConditions = {
  suitabilityEntityType: EntityClassMap.providerRoleTypeWorkTypeSuitability,
  suitabilityType: EntityClassMap.providerRole,
  baseEntityIdAccessor: 'partyId',
  displayNameAccessor: 'partyName',
  api: Api.ProviderRoleTypeWorkTypeSuitability
};

export interface SuitabilityCellData {
  suitabilityCondition: SuitabilityConditions;
  dataResponse: SuitabilityEntity[][];
}

export default function SuitabilityTable({
  roleTypeId,
  suitabilityType
}: SuitabilityTableProps) {
  const suitabilityCondition =
    suitabilityType === 'AssetRole'
      ? AssetSuitabilityCondition
      : ProviderSuitabilityCondition;
  const { api, baseEntityIdAccessor, suitabilityEntityType } =
    suitabilityCondition;

  const listenerKey = useUuidListenerKey();
  const { currentState: selectedWTT } = NamespacedHooks.useListen(
    EntityClassMap.workType,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray as number[]
  );
  const { currentState: selectedRoles } = NamespacedHooks.useListen(
    suitabilityType,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray as number[]
  );
  const { dispatchWithoutControl } = NamespacedHooks.useDispatchAndListen(
    suitabilityEntityType,
    KEY_TYPES.MASTER_LIST,
    listenerKey,
    EmptyArray as SuitabilityEntity[]
  );

  useGlobalController({
    contextKey: hoverTargetCellIndex,
    initialValue: ObjectPlaceholder as CellIndex,
    listenerKey
  });
  useGlobalController({
    contextKey: dropResultContextKey,
    initialValue: ObjectPlaceholder as DropResult,
    listenerKey
  });

  const readAnyRole = useReadAnyDto<ProviderRoleDto>(suitabilityType);
  const baseEntityIdList = useMemo(() => {
    return selectedRoles
      .map((eId) => readAnyRole(eId))
      .filter(isNotUndefined)
      .map(
        (role) => role[baseEntityIdAccessor as keyof ProviderRoleDto] as number
      );
  }, [selectedRoles, baseEntityIdAccessor, readAnyRole]);

  const [dataResponse, setDataResponse] = useState<SuitabilityEntity[][]>([]);
  useEffect(() => {
    api
      .getTriIntersectionTable(baseEntityIdList, selectedWTT, roleTypeId)
      .then((idReferencedIntersectionTableDto) => {
        const flatList = Object.values(
          idReferencedIntersectionTableDto
        ).flatMap((list) => [...list]);
        dispatchWithoutControl(flatList);

        setDataResponse(Object.values(idReferencedIntersectionTableDto));
      });
  }, [
    baseEntityIdList,
    api,
    baseEntityIdAccessor,
    dispatchWithoutControl,
    roleTypeId,
    selectedWTT
  ]);

  const itemData = useMemo(() => {
    return {
      dataResponse,
      suitabilityCondition
    };
  }, [dataResponse, suitabilityCondition]);

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={suitabilityEntityType}
        dtoList={EmptyArray}
        mergeInitialWithProp={true}
        updateServerAction={
          api.putList as CommitServerAction<
            SuitabilityEntity,
            SuitabilityEntity[]
          >
        }
      />
      <VirtualizedTableWindowed
        rowIdList={selectedRoles}
        columnIdList={selectedWTT}
        itemData={itemData}
        renderCell={CellComponentMemo}
        renderSyncedRowCell={SyncedRowCellMemo}
        renderSyncedColumnCell={SyncedColumnCellMemo}
      />
    </>
  );
}
