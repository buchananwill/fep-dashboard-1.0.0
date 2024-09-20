'use client';
import {
  AvailabilityPostRequest,
  HasName,
  RolePostRequest,
  SuitabilityPostRequest
} from '@/api/generated-types/generated-types';
import { useGlobalController, useGlobalReadAny } from 'selective-context';
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
import { EditableEvents } from '@/components/roles/create-role/useEditableEvents';
import { OutlookEvent } from '@/api/microsoft-graph/helperTypes';
import { DayOfWeekArray } from '@/api/date-and-time';
import { DateTimeTimeZone } from '@microsoft/microsoft-graph-types';
import { RequiredDeep } from 'type-fest';
import { format } from 'date-fns';

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
  const readAnyKnowledgeLevel = useReadAnyDtoTyped('knowledgeLevel');
  const readAny = useGlobalReadAny();

  const submitRequest = useMemo(() => {
    return {
      memoizedFunction: async (baseEntity: T) => {
        if (!createRoleAction) console.error('no action');
        else {
          const rtNames = roleTypeNames().map((type) => type.name);
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
                  roleTypeNames: rtNames
                };
                return suitabilityRequest;
              } else return undefined;
            })
            .filter(isNotUndefined);
          const events = readAny(EditableEvents) as OutlookEvent[];
          const availabilityRequests = events
            .map((event) => outlookEventToAvailability(event))
            .map((availability) => ({
              ...availability,
              roleTypeNames: rtNames
            }));

          const request: RolePostRequest<T> = {
            baseEntity,
            availabilities: availabilityRequests,
            suitabilities: suitabilityRequests
          };
          console.log(request);
          const response = await createRoleAction(request);
          console.log(response);
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

function getDayOfWeek(dateTimeTimeZone: RequiredDeep<DateTimeTimeZone>) {
  return DayOfWeekArray[
    (new Date(dateTimeTimeZone.dateTime).getDay() + 6) % 7
  ].toUpperCase() as DayOfWeek;
}

function toLocalTime(dateTimeString: string) {
  return format(new Date(dateTimeString), 'HH:mm');
}

function outlookEventToAvailability(
  event: OutlookEvent
): AvailabilityPostRequest {
  const { start, end } = event;
  if (!start || !end || !start.dateTime || !end.dateTime)
    throw new Error('Start or end missing' + JSON.stringify(event));
  return {
    roleTypeNames: [],
    startTime: toLocalTime(start.dateTime),
    endTime: toLocalTime(end.dateTime),
    availabilityCode: 'TRUE',
    day: getDayOfWeek(start as RequiredDeep<DateTimeTimeZone>)
  };
}
