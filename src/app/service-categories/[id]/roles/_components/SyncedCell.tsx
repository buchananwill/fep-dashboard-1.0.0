import { GridChildComponentProps } from 'react-window';
import React, { forwardRef, memo, ReactElement } from 'react';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/literals';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import clsx from 'clsx';
import {
  SuitabilityCellData,
  SuitabilityConditions,
  SuitabilityEntity
} from '@/app/service-categories/[id]/roles/_components/SuitabilityTable';
import { useFloatingTooltip } from '@/app/service-categories/[id]/roles/_components/useFloatingTooltip';

const SyncedRowCell = ({
  style,
  columnIndex
}: GridChildComponentProps<SuitabilityCellData>) => {
  const uuidListenerKey = useUuidListenerKey();
  const readAnyWorkTaskType = useReadAnyDto<WorkTaskTypeDto>(
    EntityClassMap.workTaskType
  );
  const { currentState } = NamespacedHooks.useListen(
    EntityClassMap.workTaskType,
    KEY_TYPES.SELECTED,
    uuidListenerKey,
    EmptyArray as number[]
  );

  const wttId = currentState[columnIndex];

  const name = readAnyWorkTaskType(wttId)?.name ?? 'No Data Found';

  const tooltip = useFloatingTooltip(<TooltipMemo text={name} />, 'bottom');

  return (
    <div
      style={style}
      className={clsx(
        'border-x-1 first:border-l-0 ',
        columnIndex % 2 === 1 ? 'bg-purple-50' : 'bg-sky-50'
      )}
      {...tooltip}
    >
      <InnerCellComponent>{name}</InnerCellComponent>
    </div>
  );
};
export const SyncedRowCellMemo = memo(SyncedRowCell);

const SyncedColumnCell = ({
  style,
  rowIndex,
  data: {
    suitabilityCondition: { suitabilityType, displayNameAccessor }
  }
}: GridChildComponentProps<SuitabilityCellData>) => {
  const uuidListenerKey = useUuidListenerKey();
  const readAnyRole = useReadAnyDto<ProviderRoleDto>(suitabilityType);
  const { currentState } = NamespacedHooks.useListen(
    suitabilityType,
    KEY_TYPES.SELECTED,
    uuidListenerKey,
    EmptyArray as number[]
  );

  const roleId = currentState[rowIndex];
  const role = readAnyRole(roleId);

  const name = role
    ? (role[displayNameAccessor as keyof typeof role] as string)
    : 'No Data Found';
  const tooltip = useFloatingTooltip(<TooltipMemo text={name} />);

  return (
    <div
      style={style}
      className={' border-y-1 bg-white first:border-t-0'}
      {...tooltip}
    >
      <InnerCellComponent>{name}</InnerCellComponent>
    </div>
  );
};
export const SyncedColumnCellMemo = memo(SyncedColumnCell);

const InnerCellComponent = forwardRef<
  HTMLDivElement,
  {
    children: string | number | ReactElement;
  }
>(function InnerCellComponent({ children }, ref) {
  return (
    <div ref={ref} className={'relative flex h-full items-center align-middle'}>
      <div
        className={
          'mb-auto mt-auto inline-block h-fit w-full overflow-hidden overflow-ellipsis whitespace-nowrap p-1 text-sm   '
        }
      >
        {children}
      </div>
    </div>
  );
});

export const TooltipMemo = memo(SimpleTooltip);

function SimpleTooltip({ text }: { text: string }) {
  return (
    <div
      className={
        'pointer-events-none rounded-md border border-amber-300 bg-amber-50 p-2 text-black'
      }
    >
      {text}
    </div>
  );
}
