import {
  getCellRenderFunction,
  NextUiCellComponentProps
} from '@/components/tables/GetCellRenderFunction';
import {
  AssetRoleTypeDto,
  ProviderRoleTypeDto,
  ResourceRequirementItemDto
} from '@/api/generated-types/generated-types';
import { useCallback } from 'react';
import { useDtoStoreDispatch } from 'dto-stores';
import { ControlledSelector } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/ControlledSelector';
import { get } from 'lodash';
import { EntityClassMap } from '@/api/entity-class-map';
import { updateNestedValueWithLodash } from '@/functions/updateNestedValue';
import { SimpleValueToString } from '@/components/tables/SimpleValueToString';
import { DeleteEntity } from '@/components/tables/cells/DeleteEntity';

function RoleTypeCell({
  entity,
  path,
  entityClass
}: NextUiCellComponentProps<ResourceRequirementItemDto>) {
  const { dispatchWithoutListen } =
    useDtoStoreDispatch<ResourceRequirementItemDto>(entity.id, entityClass);

  const selectionCallback = useCallback(
    (updatedSelection: ProviderRoleTypeDto | AssetRoleTypeDto | undefined) => {
      if (!(path === 'providerRoleType' || path === 'assetRoleType')) return;
      dispatchWithoutListen((prevState) => {
        return updateNestedValueWithLodash(prevState, path, updatedSelection);
      });
    },
    [dispatchWithoutListen, path]
  );

  if (!(path === 'providerRoleType' || path === 'assetRoleType')) return null;

  return (
    <ControlledSelector<number, ProviderRoleTypeDto>
      labelPath={'name'}
      placeHolderOnlyNoLabel
      entityId={get(entity, path)?.id ?? null}
      entityClass={EntityClassMap[path]}
      selectionCallback={selectionCallback}
    />
  );
}

export const ResourceRequirementItemCells = getCellRenderFunction(
  'resourceRequirementItem',
  {
    workTaskTypeId: SimpleValueToString,
    providerRoleType: RoleTypeCell,
    assetRoleType: RoleTypeCell,
    id: DeleteEntity
  }
);
