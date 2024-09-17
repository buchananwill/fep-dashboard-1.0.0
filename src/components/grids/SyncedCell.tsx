import { GridChildComponentProps } from 'react-window';
import React, { forwardRef, memo, ReactElement } from 'react';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/literals';
import { ProviderRoleDto } from '@/api/generated-types/generated-types';
import clsx from 'clsx';
import { SuitabilityCellData } from '@/components/roles/suitability/SuitabilityTable';
import { useFloatingTooltip } from '@/components/tooltip/useFloatingTooltip';
import { TooltipMemo } from '@/components/tooltip/SimpleTooltip';
import { WorkTaskTypeDto } from '@/api/generated-types/generated-types';

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

  const workTaskType = readAnyWorkTaskType(wttId);

  const name = workTaskType
    ? `${workTaskType.knowledgeDomain?.shortCode ?? workTaskType.knowledgeDomain?.name}:${workTaskType.knowledgeLevel?.levelOrdinal}`
    : 'No Data Found';

  const tooltip = useFloatingTooltip(<TooltipMemo text={name} />, 'bottom');

  return (
    <div
      style={style}
      className={clsx(
        'border-x-1 first:border-l-0',
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
          'mb-auto mt-auto inline-block h-fit w-full overflow-hidden overflow-ellipsis whitespace-nowrap p-0.5 text-xs   '
        }
      >
        {children}
      </div>
    </div>
  );
});
