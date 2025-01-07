import { IdInnerCellProps } from '@/components/tables/core-table-types';
import EditTextWithModalCell from '../generic/EditTextWithModalCell';
import { useCallback } from 'react';
import { NamespacedHooks, useReadAnyDto, useWriteAnyDto } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { isNotUndefined } from '@/api/main';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/client-literals';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { IdWrapper } from '@/api/types';
import {
  OrganizationWorkHierarchyDto,
  WorkSchemaNodeManualDefinitionDto
} from '@/api/generated-types/generated-types_';
import { spliceAndReplace } from '@/functions/splice-and-replace';

export function EditWorkSchemaNodeNameCell({
  onChange,
  entityClass,
  value,
  ...props
}: IdInnerCellProps<string>) {
  const listenerKey = useUuidListenerKey();
  const { currentState: workSchemaNodeIdList } = NamespacedHooks.useListen<
    string[]
  >(entityClass, KEY_TYPES.ID_LIST, listenerKey, EmptyArray);

  const readAnyDto = useReadAnyDto<
    IdWrapper<WorkSchemaNodeManualDefinitionDto>
  >(EntityClassMap.workSchemaNodeManualDefinition);
  const writeAnyDto = useWriteAnyDto<
    IdWrapper<WorkSchemaNodeManualDefinitionDto>
  >(EntityClassMap.workSchemaNodeManualDefinition);

  const updateChildNames = useCallback(
    (update: string) => {
      if (onChange) {
        const idListToUpdate = workSchemaNodeIdList
          .map((id) => readAnyDto(id))
          .filter(isNotUndefined)
          .filter((wsn) => wsn.data.parentNodeName === value)
          .map((wsn) => wsn.id);
        idListToUpdate.forEach((id) => {
          writeAnyDto(id, (prev) => ({
            ...prev,
            data: {
              ...prev.data,
              parentNodeName: spliceAndReplace(
                prev.data.parentNodeName!,
                value,
                update
              )
            }
          }));
        });
        onChange(update);
      }
    },
    [value, onChange, readAnyDto, writeAnyDto, workSchemaNodeIdList]
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
