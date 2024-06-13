'use client';
import {
  EditAddDeleteDtoControllerArray,
  NamespacedHooks,
  useReadAnyDto
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { ProviderRoleTypeWorkTaskTypeSuitabilityDto } from '@/api/dtos/ProviderRoleTypeWorkTaskTypeSuitabilityDtoSchema';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { ProviderRoleSuitabilityApi } from '@/api/clientApi';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FixedSizeGrid, GridOnScrollProps } from 'react-window';
import { CellComponentMemo } from '@/app/service-categories/[id]/roles/providers/_components/CellComponent';
import {
  SyncedColumnCellMemo,
  SyncedRowCellMemo
} from '@/app/service-categories/[id]/roles/providers/_components/SyncedCell';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { isNotUndefined } from '@/api/main';
import AutoSizer from 'react-virtualized-auto-sizer';

const DefaultScrollBarSize = 20;
const defaultSyncColumnWidth = 100;
const defaultCellSize = 40;
export default function SuitabilityTableWindowed({
  providerRoleTypeId
}: {
  partyIdList: number[];
  providerRoleTypeId: number;
}) {
  const [scrollBarWidth, setScrollBarWidth] = useState(DefaultScrollBarSize);

  const listenerKey = useUuidListenerKey();
  const { currentState: selectedWTT } = NamespacedHooks.useListen(
    EntityClassMap.workTaskType,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray as number[]
  );
  const { currentState: selectedProviders } = NamespacedHooks.useListen(
    EntityClassMap.providerRole,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray as number[]
  );
  const { dispatchWithoutControl } = NamespacedHooks.useDispatchAndListen(
    EntityClassMap.providerRoleTypeWorkTaskTypeSuitability,
    KEY_TYPES.MASTER_LIST,
    listenerKey,
    EmptyArray as ProviderRoleTypeWorkTaskTypeSuitabilityDto[]
  );

  const readAnyProvider = useReadAnyDto<ProviderRoleDto>(
    EntityClassMap.providerRole
  );
  const [dataResponse, setDataResponse] = useState<
    ProviderRoleTypeWorkTaskTypeSuitabilityDto[][]
  >([]);

  useEffect(() => {
    const partyIdList = selectedProviders
      .map((pId) => readAnyProvider(pId))
      .filter(isNotUndefined)
      .map((pRole) => pRole.partyId);
    ProviderRoleSuitabilityApi.getTriIntersectionTable(
      partyIdList,
      selectedWTT,
      providerRoleTypeId
    ).then((idReferencedIntersectionTableDto) => {
      const flatList = Object.values(idReferencedIntersectionTableDto).flatMap(
        (list) => [...list]
      );
      dispatchWithoutControl(flatList);

      setDataResponse(Object.values(idReferencedIntersectionTableDto));
    });
  }, [
    dispatchWithoutControl,
    providerRoleTypeId,
    selectedWTT,
    readAnyProvider,
    selectedProviders
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
              entityClass={
                EntityClassMap.providerRoleTypeWorkTaskTypeSuitability
              }
              dtoList={EmptyArray}
              mergeInitialWithProp={true}
              updateServerAction={ProviderRoleSuitabilityApi.putList}
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
                    itemData={dataResponse}
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
