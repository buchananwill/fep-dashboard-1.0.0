import { ResourceRequirementItemDto } from '@/api/generated-types/generated-types_';
import { useCallback, useMemo } from 'react';
import { NamespacedHooks } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { updateNestedValueWithLodash } from '@/functions/updateNestedValue';
import { DeleteEntity } from '@/components/tables/cells-v2/generic/DeleteEntity';
import {
  CellComponentRecord,
  EntityInnerCellProps
} from '@/components/tables/core-table-types';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { EmptyArray } from '@/api/literals';
import { Select } from '@mantine/core';
import { AnyValueToString } from '@/components/tables/cells-v2/generic/AnyValueToString';
import { getCellRenderFunction } from '@/components/tables/cells-v2/generic/GetCellRenderFunction';
import { get } from 'lodash';

function RoleTypeCell({
  entity,
  columnKey,
  dispatchWithoutControl
}: EntityInnerCellProps<
  ResourceRequirementItemDto,
  number,
  'providerRoleType' | 'assetRoleType'
>) {
  const listenerKey = useUuidListenerKey();
  const entityTypeClass = EntityClassMap[columnKey];
  const value = get(entity, columnKey);
  const { currentState: typeDtoList } = NamespacedHooks.useListen(
    entityTypeClass,
    KEY_TYPES.MASTER_LIST,
    listenerKey,
    EmptyArray as Required<ResourceRequirementItemDto>[typeof columnKey][]
  );

  const onChange = useCallback(
    (value: string | null) => {
      const found = typeDtoList.find((dto) => dto.name === value);
      if (!found) return;
      dispatchWithoutControl((prevState) => {
        return updateNestedValueWithLodash(prevState, columnKey, found);
      });
    },
    [columnKey, dispatchWithoutControl, typeDtoList]
  );
  const options = useMemo(() => {
    return typeDtoList.map((dto) => dto.name);
  }, [typeDtoList]);

  if (!(columnKey === 'providerRoleType' || columnKey === 'assetRoleType'))
    return null;

  return <Select data={options} value={value?.name} onChange={onChange} />;
}

const ResourceRequirementItemCellMap: CellComponentRecord<ResourceRequirementItemDto> =
  {
    workTaskTypeId: { type: 'IdInnerCell', component: AnyValueToString },
    providerRoleType: { type: 'EntityInnerCell', component: RoleTypeCell },
    assetRoleType: { type: 'EntityInnerCell', component: RoleTypeCell },
    id: { type: 'CustomCell', component: DeleteEntity }
  };

export const ResourceRequirementItemCells = getCellRenderFunction(
  'resourceRequirementItem',
  ResourceRequirementItemCellMap
);
