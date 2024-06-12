import { GridChildComponentProps } from 'react-window';
import React, { memo, ReactElement } from 'react';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/literals';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { ProviderRoleTypeWorkTaskTypeSuitabilityDto } from '@/api/dtos/ProviderRoleTypeWorkTaskTypeSuitabilityDtoSchema';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';

const SyncedRowCell = ({
  style,
  columnIndex
}: GridChildComponentProps<ProviderRoleTypeWorkTaskTypeSuitabilityDto[][]>) => {
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

  return (
    <div style={style} className={'border-x-1 border-y-2 first:border-l-2 '}>
      <InnerCellComponent>{name}</InnerCellComponent>
    </div>
  );
};
export const SyncedRowCellMemo = memo(SyncedRowCell);

const SyncedColumnCell = ({
  style,
  rowIndex
}: GridChildComponentProps<ProviderRoleTypeWorkTaskTypeSuitabilityDto[][]>) => {
  const uuidListenerKey = useUuidListenerKey();
  const readAnyProviderRole = useReadAnyDto<ProviderRoleDto>(
    EntityClassMap.providerRole
  );
  const { currentState } = NamespacedHooks.useListen(
    EntityClassMap.providerRole,
    KEY_TYPES.SELECTED,
    uuidListenerKey,
    EmptyArray as number[]
  );

  const prId = currentState[rowIndex];

  const name = readAnyProviderRole(prId)?.partyName ?? 'No Data Found';

  return (
    <div style={style} className={'border-x-1 border-y-2 first:border-l-2 '}>
      <InnerCellComponent>{name}</InnerCellComponent>
    </div>
  );
};
export const SyncedColumnCellMemo = memo(SyncedColumnCell);

function InnerCellComponent({
  children
}: {
  children: string | number | ReactElement;
}) {
  return (
    <div className={'flex h-full items-center align-middle'}>
      <span
        className={
          'mb-auto mt-auto inline-block h-fit w-full overflow-hidden overflow-ellipsis whitespace-nowrap bg-white p-1  text-sm  hover:z-10 hover:w-fit hover:overflow-visible '
        }
      >
        {children}
      </span>
    </div>
  );
}
