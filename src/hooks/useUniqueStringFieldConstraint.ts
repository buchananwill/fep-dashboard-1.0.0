import { HasId } from '@/api/types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { useCallback } from 'react';
import { get } from 'lodash';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';

export function useUniqueStringFieldConstraint<T extends HasId>(
  entityClass: string,
  entity: T,
  path: TypedPaths<T, string>
) {
  const readAnyDto = useReadAnyDto<T>(entityClass);

  const { currentState } = NamespacedHooks.useListen<(string | number)[]>(
    entityClass,
    KEY_TYPES.ID_LIST,
    `${entityClass}.${entity.id}.${path}`,
    EmptyArray
  );

  return useCallback(
    (input: string | undefined | null) => {
      if (!input) {
        return {};
      }
      for (let id of currentState) {
        const dto = readAnyDto(id);
        if (dto) {
          const currentValue = get(dto, path);
          if (currentValue === input && dto.id !== entity.id) {
            return {
              error: true,
              errorMessage: `Duplicate value with ${entityClass} ${id}`
            };
          }
        }
      }
      return {};
    },
    [readAnyDto, entityClass, entity.id, path, currentState]
  );
}
