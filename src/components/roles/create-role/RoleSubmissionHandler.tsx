'use client';
import {
  HasName,
  RolePostRequest,
  SuitabilityPostRequest
} from '@/api/generated-types/generated-types';
import { useGlobalController } from 'selective-context';
import { RoleEntity } from '@/components/roles/types';
import { getCreationContextKey } from '@/components/roles/create-role/RoleBaseDetails';
import { useMemo } from 'react';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { CellEntityClass } from '@/components/roles/suitability/SuitabilityCellManager';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { SuitabilityMatrixCell } from '@/components/work-task-types/WorkTaskTypeMatrixCell';
import { isNotUndefined } from '@/api/main';
import { useEffectSyncToMemo } from 'react-d3-force-wrapper';
import {
  useReadAnyDtoTyped,
  useReadSelectedEntities
} from '@/api/typed-dto-store-hooks';
import { HasNumberId } from '@/api/types';

const listenerKey = 'create-controller';
export const WorkTaskTypeName = 'WorkTaskTypeName';
export default function RoleSubmissionHandler<T>({
  createRoleAction,
  roleEntityType
}: {
  createRoleAction?: (postRequest: RolePostRequest<T>) => Promise<any>;
  roleEntityType: RoleEntity;
}) {
  const readAnyDto = useReadAnyDto<SuitabilityMatrixCell>(CellEntityClass);
  const { currentState: cellIdList } = NamespacedHooks.useListen<string[]>(
    CellEntityClass,
    KEY_TYPES.ID_LIST,
    listenerKey,
    EmptyArray
  );
  const { currentState: wttTaskNameIdList } = NamespacedHooks.useListen(
    WorkTaskTypeName,
    KEY_TYPES.SELECTED,
    listenerKey,
    EmptyArray
  );
  const readAnyWttName = useReadAnyDto<HasName & HasNumberId>(WorkTaskTypeName);
  const roleTypeNames = useReadSelectedEntities(`${roleEntityType}RoleType`);
  const readAnyKnowledgeDomain = useReadAnyDtoTyped('knowledgeDomain');
  // const readAnyKnowledgeLevelSeries = useReadAnyDtoTyped(
  //   'knowledgeLevelSeries'
  // );
  const readAnyKnowledgeLevel = useReadAnyDtoTyped('knowledgeLevel');

  const submitRequest = useMemo(() => {
    return {
      memoizedFunction: async (baseEntity: T) => {
        if (!createRoleAction) console.error('no action');
        else {
          const wttNames = wttTaskNameIdList
            .map((id) => readAnyWttName(id))
            .filter(isNotUndefined)
            .map((name) => name.name);

          const suitabilityRequests = cellIdList
            .map((id) => readAnyDto(id))
            .filter(isNotUndefined)
            .filter((cell) => cell.value > 0)
            .map((cell) => {
              const knowledgeLevel = readAnyKnowledgeLevel(
                cell.knowledgeLevelId
              );
              const knowledgeDomain = readAnyKnowledgeDomain(
                cell.knowledgeDomainId
              );
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
                    workTaskTypeNames: wttNames
                  },
                  rating: cell.value,
                  roleTypeNames: roleTypeNames().map((type) => type.name)
                };
                return suitabilityRequest;
              } else return undefined;
            })
            .filter(isNotUndefined);
          const request: RolePostRequest<T> = {
            baseEntity,
            availabilities: [],
            suitabilities: suitabilityRequests
          };
          console.log(request);
          await createRoleAction(request);
        }
      }
    };
  }, [
    createRoleAction,
    cellIdList,
    readAnyDto,
    readAnyKnowledgeDomain,
    readAnyKnowledgeLevel,
    wttTaskNameIdList,
    readAnyWttName,
    roleTypeNames
  ]);

  const { dispatch } = useGlobalController({
    contextKey: getCreationContextKey(roleEntityType),
    initialValue: submitRequest,
    listenerKey
  });
  useEffectSyncToMemo(dispatch, submitRequest);

  return null;
}
