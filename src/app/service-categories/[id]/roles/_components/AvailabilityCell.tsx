'use client';
import { ProviderRoleAvailabilityDto } from '@/api/dtos/ProviderRoleAvailabilityDtoSchema';
import clsx from 'clsx';
import { useGlobalListener } from 'selective-context';
import { GridChildComponentProps } from 'react-window';
import { CellIdReference } from '@/app/service-categories/[id]/schedule/[scheduleId]/work-project-series-assignments/CellQueryManager';
import { BaseDtoUiProps, DtoUiWrapper } from 'dto-stores';
import { DtoStoreNumberInput } from '@/components/generic/DtoStoreNumberInput';
import { EntityClassMap } from '@/api/entity-class-map';
import { ObjectPlaceholder } from '@/api/literals';

function getAvailabilityColor(availabilityCode: number) {
  switch (availabilityCode) {
    case 0:
      return 'bg-gray-200';
    case 1:
      return 'bg-rose-200';
    case 2:
      return 'bg-amber-200';
    case 3:
      return 'bg-emerald-200';
  }
}

const numberOfAvailabilityCodeTypes = 4;

export function AvailabilityCell({
  data,
  rowIndex,
  columnIndex,
  style
}: GridChildComponentProps<CellIdReference[][]>) {
  const referenceElement = data[rowIndex][columnIndex];

  const { currentState } = useGlobalListener<
    Record<string, Record<string, string>>
  >({
    contextKey: 'cellIdMap',
    initialValue: ObjectPlaceholder,
    listenerKey: `${rowIndex}:${columnIndex}`
  });

  const entityId =
    currentState[referenceElement.rowId][referenceElement.columnId];

  return (
    <div style={style} className={'flex h-full w-full'}>
      {entityId ? (
        <DtoUiWrapper
          entityClass={EntityClassMap.providerRoleAvailability}
          entityId={parseInt(entityId)}
          renderAs={InnerCell}
        />
      ) : (
        ''
      )}
    </div>
  );
}

function InnerCell(props: BaseDtoUiProps<ProviderRoleAvailabilityDto>) {
  const availabilityColor = getAvailabilityColor(props.entity.availabilityCode);

  return (
    <DtoStoreNumberInput<ProviderRoleAvailabilityDto>
      className={clsx(
        'mb-auto ml-auto mr-auto mt-auto max-h-[92%] max-w-[92%] text-center',
        availabilityColor
      )}
      numberKey={'availabilityCode'}
      min={0}
      max={3}
      {...props}
    />
  );
}
