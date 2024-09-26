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
import { useCallback, useMemo } from 'react';
import { NamespacedHooks, useReadAnyDto } from 'dto-stores';
import { CellEntityClass } from '@/components/roles/suitability/SuitabilityCellManager';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
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
import { WorkTaskTypeName } from '@/components/roles/create-role/literals';
import { SuitabilityMatrixCell } from '@/components/work-task-types/suitabilityMatrixCell';

export function getDayOfWeek(dateTimeTimeZone: RequiredDeep<DateTimeTimeZone>) {
  return DayOfWeekArray[
    (new Date(dateTimeTimeZone.dateTime).getDay() + 6) % 7
  ].toUpperCase() as DayOfWeek;
}

export function toLocalTime(dateTimeString: string) {
  return format(new Date(dateTimeString), 'HH:mm:SS');
}

export function outlookEventToAvailability(
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
