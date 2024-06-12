'use client';
import { EditAddDeleteDtoControllerArray, NamespacedHooks } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { ProviderRoleTypeWorkTaskTypeSuitabilityDto } from '@/api/dtos/ProviderRoleTypeWorkTaskTypeSuitabilityDtoSchema';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { ProviderRoleSuitabilityApi } from '@/api/clientApi';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FixedSizeGrid, GridOnScrollProps } from 'react-window';
import { CellComponentMemo } from '@/app/service-categories/[id]/roles/providers/_components/CellComponent';
import { SyncedCellMemo } from '@/app/service-categories/[id]/roles/providers/_components/SyncedCell';

const squareSize = 500;
export default function SuitabilityTableWindowed({
  partyIdList,
  providerRoleTypeId
}: {
  partyIdList: number[];
  providerRoleTypeId: number;
}) {
  const listenerKey = useUuidListenerKey();
  const { currentState: selectedWTT } = NamespacedHooks.useListen(
    EntityClassMap.workTaskType,
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
  const [dataResponse, setDataResponse] = useState<
    ProviderRoleTypeWorkTaskTypeSuitabilityDto[][]
  >([]);

  useEffect(() => {
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
  }, [dispatchWithoutControl, providerRoleTypeId, partyIdList, selectedWTT]);

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

  const rowCount = dataResponse?.length ?? 0;
  const columnCount = dataResponse[0]?.length ?? 0;

  return (
    <>
      <EditAddDeleteDtoControllerArray
        entityClass={EntityClassMap.providerRoleTypeWorkTaskTypeSuitability}
        dtoList={EmptyArray}
        mergeInitialWithProp={true}
        updateServerAction={ProviderRoleSuitabilityApi.putList}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateAreas: `'. stickyRow' 'stickyCol main'`,
          gridTemplateRows: '40px 1fr',
          gridTemplateColumns: '100px 1fr'
        }}
      >
        <div style={{ gridArea: 'stickyRow' }}>
          <FixedSizeGrid
            style={{ overflowX: 'hidden' }}
            ref={syncedRow}
            columnWidth={40}
            rowHeight={40}
            columnCount={columnCount}
            height={40}
            rowCount={1}
            width={squareSize}
          >
            {SyncedCellMemo}
          </FixedSizeGrid>
        </div>

        <div style={{ gridArea: 'stickyCol' }}>
          <FixedSizeGrid
            style={{ overflowY: 'hidden' }}
            ref={syncedColumn}
            columnWidth={100}
            rowHeight={40}
            columnCount={1}
            height={squareSize}
            rowCount={rowCount}
            width={100}
          >
            {SyncedCellMemo}
          </FixedSizeGrid>
        </div>
        <div style={{ gridArea: 'main' }}>
          <FixedSizeGrid
            onScroll={onScroll}
            itemData={dataResponse}
            overscanRowCount={4}
            overscanColumnCount={4}
            columnWidth={40}
            rowHeight={40}
            columnCount={columnCount}
            height={squareSize}
            rowCount={rowCount}
            width={squareSize}
          >
            {CellComponentMemo}
          </FixedSizeGrid>
        </div>
      </div>
    </>
  );
}
