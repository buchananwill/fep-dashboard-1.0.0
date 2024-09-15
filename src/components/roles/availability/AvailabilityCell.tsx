'use client';
import clsx from 'clsx';
import { useGlobalListener } from 'selective-context';
import { GridChildComponentProps } from 'react-window';
import { CellIdReference } from '@/components/grids/CellQueryManager';
import { BaseDtoUiProps, DtoUiWrapper } from 'dto-stores';
import { DtoStoreNumberInput } from '@/components/generic/DtoStoreNumberInput';
import { EntityClassMap } from '@/api/entity-class-map';
import { ObjectPlaceholder } from '@/api/literals';
import {
  ProviderRoleAvailabilityDto,
  RoleAvailabilityDto
} from '@/api/generated-types/generated-types';
import { AvailabilityType } from '@/components/roles/availability/AvailabilityType';
import { CellWrapperProps } from '@/components/grids/getCellIdReference';
import { startCase } from 'lodash';
import React from 'react';

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

export function GenericAvailabilityCell({
  data,
  rowIndex,
  columnIndex,
  style,
  type
}: GridChildComponentProps<CellIdReference[][]> & { type: AvailabilityType }) {
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
    <div
      style={style}
      className={'flex h-full w-full border-b border-r first:border-l'}
    >
      {entityId ? (
        <DtoUiWrapper
          entityClass={`${startCase(type)}RoleAvailability`}
          entityId={parseInt(entityId)}
          renderAs={InnerCell}
        />
      ) : (
        ''
      )}
    </div>
  );
}

const ProviderAvailabilityCell = (props: CellWrapperProps) => {
  return <GenericAvailabilityCell {...props} type={'provider'} />;
};
const AssetAvailabilityCell = (props: CellWrapperProps) => {
  return <GenericAvailabilityCell {...props} type={'asset'} />;
};

export const MemoProviderRoleAvailabilityCell = React.memo(
  ProviderAvailabilityCell
);
export const MemoAssetRoleAvailabilityCell = React.memo(AssetAvailabilityCell);

function InnerCell(props: BaseDtoUiProps<RoleAvailabilityDto>) {
  const availabilityColor = getAvailabilityColor(props.entity.availabilityCode);
  console.log(props.entity);

  return (
    <DtoStoreNumberInput<RoleAvailabilityDto>
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
