import { HasId } from '@/api/types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { Identifier, NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { useCallback } from 'react';
import { get } from 'lodash';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/client-literals';

export function useUniqueStringFieldConstraint<T extends HasId>(
  entityClass: string,
  entityId: Identifier,
  path: TypedPaths<T, string | undefined>,
  allowEmpty = true
) {
  const readAnyDto = useReadAnyDto<T>(entityClass);

  const { currentState } = NamespacedHooks.useListen<(string | number)[]>(
    entityClass,
    KEY_TYPES.ID_LIST,
    `${entityClass}.${entityId}.${path}`,
    EmptyArray
  );

  return useCallback(
    (input: string | undefined | null) => {
      if (!input || input.trim() === '') {
        if (allowEmpty) return {};
        else
          return {
            error: true,
            errorMessage: `Empty value not allowed`
          };
      }
      for (let id of currentState) {
        const dto = readAnyDto(id);
        if (dto) {
          const currentValue = get(dto, path);
          if (currentValue === input && dto.id !== entityId) {
            return {
              error: true,
              errorMessage: `Duplicate value with ${entityClass} ${id}`
            };
          }
        }
      }
      return {};
    },
    [readAnyDto, entityClass, entityId, path, currentState, allowEmpty]
  );
}
