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
import React, { useMemo } from 'react';
import { CheckCircleIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

function getAvailabilityBgColor(availabilityCode: number) {
  switch (availabilityCode) {
    case 0:
      return 'bg-rose-50';
    case 1:
      return 'bg-gray-50';
    case 2:
      return 'bg-amber-50';
    case 3:
      return 'bg-emerald-50';
  }
}
function getAvailabilityTextColor(availabilityCode: number) {
  switch (availabilityCode) {
    case 0:
      return 'text-rose-500';
    case 1:
      return 'text-gray-500';
    case 2:
      return 'text-amber-500';
    case 3:
      return 'text-emerald-500';
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
  const availabilityBgColor = getAvailabilityBgColor(
    props.entity.availabilityCode
  );
  const availabilityTextColor = getAvailabilityTextColor(
    props.entity.availabilityCode
  );

  const Icon = useMemo(() => {
    return AvailabilityIcons[props.entity.availabilityCode];
  }, [props.entity.availabilityCode]);

  return (
    <div className={'relative flex h-full w-full'}>
      <DtoStoreNumberInput<RoleAvailabilityDto>
        className={clsx(
          'mb-auto ml-auto mr-auto mt-auto h-full w-full text-center',
          availabilityBgColor
        )}
        numberKey={'availabilityCode'}
        min={0}
        max={3}
        {...props}
      />
      <div className={'pointer-events-none absolute h-full w-full p-0.5'}>
        <Icon
          className={clsx(
            'rounded-lg',
            availabilityBgColor,
            availabilityTextColor
          )}
        ></Icon>
      </div>
    </div>
  );
}

const AvailabilityIcons = [
  NoSymbolIcon,
  XMarkIcon,
  QuestionMarkCircleIcon,
  CheckCircleIcon
] as const;
