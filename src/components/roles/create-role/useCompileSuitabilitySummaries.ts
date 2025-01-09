import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { CreateRoleCell } from '@/components/work-types/suitabilityMatrixCell';
import { CellEntityClass } from '@/components/roles/suitability/SuitabilityCellManager';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/client-literals';
import { useReadAnyDtoTyped } from '@/api/typed-dto-store-hooks';
import { useCallback } from 'react';
import { isNotUndefined } from '@/api/main';
import {
  RoleData,
  SuitabilityPostRequest,
  SuitabilitySummaryDto
} from '@/api/generated-types/generated-types_';
import { listenerKey } from '@/components/roles/create-role/CreateRoleForm';

export function useCompileSuitabilitySummaries(
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
    const roleTypeNames = getRoleTypeNames();
    const wttNameStrings = getWttNameStrings();
    const withoutRoleTypeNames = cellIdList
      .map((id) => readAnyDto(id))
      .filter(isNotUndefined)
      .filter((cell) => cell.rating > 0)
      .map((cell) => {
        const knowledgeLevel = readAnyKnowledgeLevel(cell.knowledgeLevelId);
        const knowledgeDomain = readAnyKnowledgeDomain(cell.knowledgeDomainId);
        if (knowledgeLevel && knowledgeDomain) {
          const suitabilityRequest: Omit<
            SuitabilitySummaryDto,
            'taskTypeName' | 'roleTypeName'
          > = {
            knowledgeDomainName: knowledgeDomain.name,
            knowledgeLevelName: knowledgeLevel.name,
            rating: cell.rating
          };
          return suitabilityRequest;
        } else return undefined;
      })
      .filter(isNotUndefined)
      .flatMap((sSum) => {
        return wttNameStrings.map((wttName) => ({
          ...sSum,
          taskTypeName: wttName
        }));
      });
    const response = {} as Record<string, RoleData>;
    roleTypeNames.forEach((roleTypeName) => {
      const suitabilitySummaries: SuitabilitySummaryDto[] =
        withoutRoleTypeNames.map((sSum) => ({ ...sSum, roleTypeName }));
      response[roleTypeName] = {
        suitabilities: suitabilitySummaries,
        availabilities: []
      };
    });
    return response;
  }, [
    cellIdList,
    getRoleTypeNames,
    getWttNameStrings,
    readAnyDto,
    readAnyKnowledgeDomain,
    readAnyKnowledgeLevel
  ]);
}
