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
import { CSSProperties, useCallback, useEffect, useState } from 'react';
import {
  BaseDtoStoreNumberInputProps,
  ConditionalNumberClassName,
  DtoStoreNumberInput,
  DtoStoreNumberInputWrapper
} from '@/components/generic/DtoStoreNumberInput';
import { areEqual, FixedSizeGrid } from 'react-window';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import React from 'react';

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
  const { currentState: suitabilities, dispatchWithoutControl } =
    NamespacedHooks.useDispatchAndListen(
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
        className={
          'max-h-[75vh] max-w-6xl overflow-y-auto rounded-lg border-4 p-2'
        }
      >
        <FixedSizeGrid
          itemData={dataResponse}
          overscanRowCount={4}
          overscanColumnCount={4}
          columnWidth={40}
          rowHeight={40}
          columnCount={columnCount}
          height={500}
          rowCount={rowCount}
          width={500}
        >
          {CellComponentMemo}
        </FixedSizeGrid>
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
