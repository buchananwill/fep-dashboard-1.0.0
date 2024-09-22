import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { CreateRoleCell } from '@/components/work-task-types/suitabilityMatrixCell';
import { CellEntityClass } from '@/components/roles/suitability/SuitabilityCellManager';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { useReadAnyDtoTyped } from '@/api/typed-dto-store-hooks';
import { useCallback } from 'react';
import { isNotUndefined } from '@/api/main';
import { SuitabilityPostRequest } from '@/api/generated-types/generated-types';
import { listenerKey } from '@/components/roles/create-role/CreateRoleForm';

export function useCompileSuitabilityRequests(
  getWttNameStrings: () => string[],
  getRoleTypeNames: () => string[]
) {
  const readAnyDto = useReadAnyDto<CreateRoleCell>(CellEntityClass);
  const { currentState: cellIdList } = NamespacedHooks.useListen<string[]>(
    CellEntityClass,
    KEY_TYPES.ID_LIST,
    listenerKey,
    EmptyArray
  );
  const readAnyKnowledgeDomain = useReadAnyDtoTyped('knowledgeDomain');
  const readAnyKnowledgeLevel = useReadAnyDtoTyped('knowledgeLevel');

  return useCallback(() => {
    return cellIdList
      .map((id) => readAnyDto(id))
      .filter(isNotUndefined)
      .filter((cell) => cell.rating > 0)
      .map((cell) => {
        const knowledgeLevel = readAnyKnowledgeLevel(cell.knowledgeLevelId);
        const knowledgeDomain = readAnyKnowledgeDomain(cell.knowledgeDomainId);
        if (knowledgeLevel && knowledgeDomain) {
          const suitabilityRequest: SuitabilityPostRequest = {
            workTaskTypeMatrix: {
              knowledgeDomainDtoList: [knowledgeDomain],
              knowledgeLevelSeriesDtoList: [
                {
                  name: '',
                  id: knowledgeLevel.knowledgeLevelSeriesId,
                  knowledgeLevels: [knowledgeLevel]
                }
              ],
              workTaskTypeNames: getWttNameStrings()
            },
            rating: cell.rating,
            roleTypeNames: getRoleTypeNames()
          };
          return suitabilityRequest;
        } else return undefined;
      })
      .filter(isNotUndefined);
  }, [
    cellIdList,
    getRoleTypeNames,
    getWttNameStrings,
    readAnyDto,
    readAnyKnowledgeDomain,
    readAnyKnowledgeLevel
  ]);
}