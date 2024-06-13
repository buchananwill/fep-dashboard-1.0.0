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
import {
  AssetRoleSuitabilityApi,
  ProviderRoleSuitabilityApi
} from '@/api/clientApi';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { FixedSizeGrid, GridOnScrollProps } from 'react-window';
import { CellComponentMemo } from '@/app/service-categories/[id]/roles/providers/_components/CellComponent';
import {
  SyncedColumnCellMemo,
  SyncedRowCellMemo
} from '@/app/service-categories/[id]/roles/_components/SyncedCell';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { isNotUndefined } from '@/api/main';
import AutoSizer from 'react-virtualized-auto-sizer';
import { AssetRoleWorkTaskSuitabilityDto } from '@/api/dtos/AssetRoleWorkTaskSuitabilityDtoSchema';

const DefaultScrollBarSize = 20;
const defaultSyncColumnWidth = 100;
const defaultCellSize = 40;

export type SuitabilityTypes = (typeof EntityClassMap)[
  | 'assetRole'
  | 'providerRole'];

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
  ProviderRole: ProviderRoleSuitabilityApi,
  AssetRole: AssetRoleSuitabilityApi
} as const;

export const AssetSuitabilityCondition: SuitabilityConditions = {
  suitabilityEntityType: EntityClassMap.assetRoleTypeWorkTaskTypeSuitability,
  suitabilityType: EntityClassMap.assetRole,
  baseEntityIdAccessor: 'assetId',
  displayNameAccessor: 'assetName',
  api: AssetRoleSuitabilityApi
} as const;
export const ProviderSuitabilityCondition: SuitabilityConditions = {
  suitabilityEntityType: EntityClassMap.providerRoleTypeWorkTaskTypeSuitability,
  suitabilityType: EntityClassMap.providerRole,
  baseEntityIdAccessor: 'partyId',
  displayNameAccessor: 'partyName',
  api: ProviderRoleSuitabilityApi
};

const SuitabilityConditionContext = 'suitabilityCondition';
export default function SuitabilityTableWindowed({
  roleTypeId,
  suitabilityType
}: SuitabilityTableProps) {
  const suitabilityCondition =
    suitabilityType === 'AssetRole'
      ? AssetSuitabilityCondition
      : ProviderSuitabilityCondition;
  const { api, baseEntityIdAccessor, suitabilityEntityType } =
    suitabilityCondition;

  const [scrollBarWidth, setScrollBarWidth] = useState(DefaultScrollBarSize);

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

  useEffect(() => {
    const baseEntityIdList = selectedRoles
      .map((eId) => readAnyRole(eId))
      .filter(isNotUndefined)
      .map(
        (role) => role[baseEntityIdAccessor as keyof ProviderRoleDto] as number
      );
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
    api,
    baseEntityIdAccessor,
    dispatchWithoutControl,
    roleTypeId,
    selectedWTT,
    readAnyRole,
    selectedRoles
  ]);

  const syncedRow = useRef<FixedSizeGrid | null>(null);
  const syncedColumn = useRef<FixedSizeGrid | null>(null);

  const onScroll = useCallback(
    ({
      scrollTop,
      scrollUpdateWasRequested,
      scrollLeft
    }: GridOnScrollProps) => {
      if (!scrollUpdateWasRequested) {
        if (syncedColumn.current && syncedRow.current) {
          syncedColumn.current.scrollTo({ scrollLeft: 0, scrollTop });
          syncedRow.current.scrollTo({ scrollLeft, scrollTop: 0 });
        }
      }
    },
    []
  );

  const onResize = useCallback(() => {
    setScrollBarWidth(getScrollbarWidth());
  }, []);

  const rowCount = dataResponse?.length ?? 0;
  const columnCount = dataResponse[0]?.length ?? 0;

  return (
    <AutoSizer onResize={onResize}>
      {({ height, width }) => {
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
            <div
              style={{
                display: 'grid',
                gridTemplateAreas: `'. stickyRow' 'stickyCol main'`,
                gridTemplateRows: '40px 1fr',
                gridTemplateColumns: '100px 1fr',
                gap: '4px'
              }}
            >
              <div
                style={{ gridArea: 'stickyRow' }}
                className={'overflow-hidden rounded-md border-2 bg-default-100'}
              >
                <FixedSizeGrid
                  style={{ overflowX: 'hidden' }}
                  ref={syncedRow}
                  columnWidth={defaultCellSize}
                  rowHeight={defaultCellSize}
                  columnCount={columnCount}
                  height={defaultCellSize}
                  rowCount={1}
                  width={width - (defaultSyncColumnWidth + scrollBarWidth)}
                >
                  {SyncedRowCellMemo}
                </FixedSizeGrid>
              </div>

              <div
                style={{ gridArea: 'stickyCol' }}
                className={'overflow-hidden rounded-md border-2 bg-default-100'}
              >
                <FixedSizeGrid
                  style={{ overflowY: 'hidden' }}
                  ref={syncedColumn}
                  columnWidth={defaultSyncColumnWidth}
                  rowHeight={defaultCellSize}
                  columnCount={1}
                  height={height - (defaultCellSize + scrollBarWidth)}
                  rowCount={rowCount}
                  width={defaultSyncColumnWidth}
                  itemData={suitabilityCondition}
                >
                  {SyncedColumnCellMemo}
                </FixedSizeGrid>
              </div>
              <div
                style={{ gridArea: 'main' }}
                className={'overflow-clip rounded-md border-2'}
              >
                <div className={'h-fit w-fit'}>
                  <FixedSizeGrid
                    onScroll={onScroll}
                    itemData={itemData}
                    overscanRowCount={4}
                    overscanColumnCount={4}
                    columnWidth={defaultCellSize}
                    rowHeight={defaultCellSize}
                    columnCount={columnCount}
                    height={height - defaultCellSize}
                    rowCount={rowCount}
                    width={width - defaultSyncColumnWidth}
                  >
                    {CellComponentMemo}
                  </FixedSizeGrid>
                </div>
              </div>
            </div>
          </>
        );
      }}
    </AutoSizer>
  );
}

function getScrollbarWidth() {
  // Create a temporary div container and append it into the body
  const container = document.createElement('div');
  // Force scrollbar on the container
  container.style.visibility = 'hidden';
  container.style.overflow = 'scroll';

  // Add an inner div container
  const inner = document.createElement('div');
  container.appendChild(inner);

  // Append the container to the body
  document.body.appendChild(container);

  // Calculate the width based on the difference between the container's full width and the child inner element width
  const scrollbarWidth = container.offsetWidth - inner.offsetWidth;

  // Remove the temporary elements from the DOM
  document.body.removeChild(container);

  return scrollbarWidth;
}
