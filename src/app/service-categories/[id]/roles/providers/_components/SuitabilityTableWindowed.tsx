'use client';
import {
  EditAddDeleteDtoControllerArray,
  LazyDtoUiWrapper,
  NamespacedHooks
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import NumberEditCellList from '@/app/service-categories/[id]/roles/_components/NumberEditCellList';
import { ProviderRoleTypeWorkTaskTypeSuitabilityDto } from '@/api/dtos/ProviderRoleTypeWorkTaskTypeSuitabilityDtoSchema';
import clsx from 'clsx';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { ProviderRoleSuitabilityApi } from '@/api/clientApi';
import {
  CSSProperties,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  BaseDtoStoreNumberInputProps,
  ConditionalNumberClassName,
  DtoStoreNumberInput,
  DtoStoreNumberInputWrapper
} from '@/components/generic/DtoStoreNumberInput';
import {
  areEqual,
  FixedSizeGrid,
  GridChildComponentProps,
  GridOnScrollProps
} from 'react-window';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import React from 'react';

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

  console.log(`grid: ${columnCount} cols : ${rowCount} rows`);
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

const conditionalNumberFormatting: ConditionalNumberClassName[] = [
  { startAt: -1, className: 'opacity-50' },
  { startAt: 0, className: '' },
  { startAt: 1, className: ' bg-red-100' },
  { startAt: 2, className: ' bg-amber-100' },
  { startAt: 3, className: ' bg-yellow-100' },
  { startAt: 4, className: ' bg-emerald-100' }
];

const CellComponent = ({
  columnIndex,
  rowIndex,
  style,
  data
}: {
  columnIndex: number;
  rowIndex: number;
  style: CSSProperties;
  data: ProviderRoleTypeWorkTaskTypeSuitabilityDto[][];
}) => {
  console.log('re-rendering cell');
  const datumElement = data[rowIndex][columnIndex];

  const id = datumElement?.id;

  return (
    <div style={style}>
      <LazyDtoUiWrapper<
        ProviderRoleTypeWorkTaskTypeSuitabilityDto,
        BaseDtoStoreNumberInputProps<ProviderRoleTypeWorkTaskTypeSuitabilityDto>
      >
        entityClass={EntityClassMap.providerRoleTypeWorkTaskTypeSuitability}
        renderAs={DtoStoreNumberInput}
        whileLoading={() => (
          <div className={'relative'}>
            <PendingOverlay pending={true} />
          </div>
        )}
        numberKey={'rating'}
        min={0}
        allowFloat={true}
        onFocus={() => console.log(datumElement)}
        className={clsx('h-[95%] w-[95%] p-2 text-sm')}
        conditionalValueClassNames={conditionalNumberFormatting}
        entityId={id}
      />
    </div>
  );
};

const CellComponentMemo = React.memo(CellComponent, areEqual);

const SyncedCell = ({ style }: GridChildComponentProps) => (
  <div style={style}>
    <div className={'flex h-full items-center align-middle'}>
      <span className={'mb-auto mt-auto inline-block h-fit w-full truncate'}>
        Header
      </span>
    </div>
  </div>
);

const SyncedCellMemo = memo(SyncedCell);
