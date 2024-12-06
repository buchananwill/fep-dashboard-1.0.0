import { IdInnerCellProps } from '@/components/tables/core-table-types';
import EditTextWithModalCell from '../generic/EditTextWithModalCell';
import { useCallback } from 'react';
import { NamespacedHooks, useReadAnyDto, useWriteAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { isNotUndefined } from '@/api/main';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { IdWrapper } from '@/api/types';
import { OrganizationWorkHierarchyDto } from '@/api/generated-types/generated-types_';
import { spliceAndReplace } from '@/functions/splice-and-replace';

export function EditOrganizationWorkHierarchyNameCell({
  onChange,
  entityClass,
  value,
  ...props
}: IdInnerCellProps<string>) {
  const listenerKey = useUuidListenerKey();
  const { currentState: organizationIdList } = NamespacedHooks.useListen<
    string[]
  >(entityClass, KEY_TYPES.ID_LIST, listenerKey, EmptyArray);

  const readAnyDto = useReadAnyDto<IdWrapper<OrganizationWorkHierarchyDto>>(
    EntityClassMap.organizationWorkHierarchy
  );
  const writeAnyDto = useWriteAnyDto<IdWrapper<OrganizationWorkHierarchyDto>>(
    EntityClassMap.organizationWorkHierarchy
  );

  const updateChildNames = useCallback(
    (update: string) => {
      if (onChange) {
        const idListToUpdate = organizationIdList
          .map((id) => readAnyDto(id))
          .filter(isNotUndefined)
          .filter((org) => org.data.parentNames?.includes(value))
          .map((org) => org.id);
        idListToUpdate.forEach((id) => {
          writeAnyDto(id, (prev) => ({
            ...prev,
            data: {
              ...prev.data,
              parentNames: spliceAndReplace(
                prev.data.parentNames!,
                value,
                update
              )
            }
          }));
        });
        onChange(update);
      }
    },
    [value, onChange, readAnyDto, writeAnyDto, organizationIdList]
  );

  return (
    <EditTextWithModalCell
      {...props}
      entityClass={entityClass}
      onChange={updateChildNames}
      value={value}
    />
  );
}
