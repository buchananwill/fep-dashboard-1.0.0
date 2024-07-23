'use client';
import {
  CommitServerAction,
  EditAddDeleteDtoControllerArray,
  NamespacedHooks,
  useReadAnyDto
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { ProviderRoleTypeWorkTaskTypeSuitabilityDto } from '@/api/dtos/ProviderRoleTypeWorkTaskTypeSuitabilityDtoSchema';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';

import React, { useEffect, useMemo, useState } from 'react';
import {
  SyncedColumnCellMemo,
  SyncedRowCellMemo
} from '@/app/service-categories/[id]/roles/_components/SyncedCell';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { isNotUndefined } from '@/api/main';
import { AssetRoleWorkTaskSuitabilityDto } from '@/api/dtos/AssetRoleWorkTaskSuitabilityDtoSchema';
import { Api } from '@/api/clientApi_';
import VirtualizedTableWindowed from '@/app/scheduling/[scheduleId]/work-project-series-assignments/VirtualizedTableWindowed';
import { CellComponentMemo } from '@/app/service-categories/[id]/roles/_components/CellComponent';

const DefaultScrollBarSize = 20;
const defaultSyncColumnWidth = 100;
const defaultCellSize = 40;

export type SuitabilityTypes = (typeof EntityClassMap)[
  | 'assetRole'
  | 'providerRole'
  | 'userRole'];

export type SuitabilityEntityTypes = (typeof EntityClassMap)[
  | 'assetRoleTypeWorkTaskTypeSuitability'
  | 'providerRoleTypeWorkTaskTypeSuitability'];

export type SuitabilityEntity =
  | ProviderRoleTypeWorkTaskTypeSuitabilityDto
  | AssetRoleWorkTaskSuitabilityDto;

export interface SuitabilityTableProps {
  suitabilityType: SuitabilityTypes;
  roleTypeId: number;
}

export interface SuitabilityConditions {
  suitabilityEntityType: SuitabilityEntityTypes;
  suitabilityType: SuitabilityTypes;
  baseEntityIdAccessor: 'partyId' | 'assetId';
  displayNameAccessor: 'partyName' | 'assetName';
  api: (typeof SuitabilityApis)[keyof typeof SuitabilityApis];
}

const SuitabilityApis = {
  ProviderRole: Api.ProviderRoleTypeWorkTaskTypeSuitability,
  AssetRole: Api.AssetRoleTypeWorkTaskTypeSuitability
} as const;

export const AssetSuitabilityCondition: SuitabilityConditions = {
  suitabilityEntityType: EntityClassMap.assetRoleTypeWorkTaskTypeSuitability,
  suitabilityType: EntityClassMap.assetRole,
  baseEntityIdAccessor: 'assetId',
  displayNameAccessor: 'assetName',
  api: Api.AssetRoleTypeWorkTaskTypeSuitability
} as const;
export const ProviderSuitabilityCondition: SuitabilityConditions = {
  suitabilityEntityType: EntityClassMap.providerRoleTypeWorkTaskTypeSuitability,
  suitabilityType: EntityClassMap.providerRole,
  baseEntityIdAccessor: 'partyId',
  displayNameAccessor: 'partyName',
  api: Api.ProviderRoleTypeWorkTaskTypeSuitability
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
    EntityClassMap.workTaskType,
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

  const readAnyRole = useReadAnyDto<ProviderRoleDto>(suitabilityType);
  const [dataResponse, setDataResponse] = useState<SuitabilityEntity[][]>([]);

  const itemData = useMemo(() => {
    return {
      dataResponse,
      suitabilityCondition
    };
  }, [dataResponse, suitabilityCondition]);

  const baseEntityIdList = useMemo(() => {
    return selectedRoles
      .map((eId) => readAnyRole(eId))
      .filter(isNotUndefined)
      .map(
        (role) => role[baseEntityIdAccessor as keyof ProviderRoleDto] as number
      );
  }, [selectedRoles, baseEntityIdAccessor, readAnyRole]);

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

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={suitabilityEntityType}
        dtoList={EmptyArray}
        mergeInitialWithProp={true}
        updateServerAction={
          api.putList as CommitServerAction<SuitabilityEntity>
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
