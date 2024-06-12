import { GridChildComponentProps } from 'react-window';
import React, { memo } from 'react';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/literals';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { ProviderRoleTypeWorkTaskTypeSuitabilityDto } from '@/api/dtos/ProviderRoleTypeWorkTaskTypeSuitabilityDtoSchema';

const SyncedCell = ({
  style,
  columnIndex,
  data
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
      <div className={'flex h-full items-center align-middle'}>
        <span
          className={
            'mb-auto mt-auto inline-block h-fit w-full overflow-hidden overflow-ellipsis whitespace-nowrap bg-white  p-1  hover:z-10 hover:w-fit hover:overflow-visible '
          }
        >
          {name}
        </span>
      </div>
    </div>
  );
};
export const SyncedCellMemo = memo(SyncedCell);
