import { useCallback } from 'react';
import { EditableEvents } from '@/components/roles/create-role/useEditableEvents';
import { OutlookEvent } from '@/api/microsoft-graph/helperTypes';
import { outlookEventToAvailability } from '@/components/roles/create-role/RoleSubmissionHandler';
import { RoleData } from '@/api/generated-types/generated-types_';

export function useCompileAvailabilities(
  readAny: (contextKey: string) => unknown,
  getRoleTypeNames: () => string[]
): () => Record<string, RoleData> {
  return useCallback(() => {
    const response = {} as Record<string, RoleData>;
    getRoleTypeNames().forEach((roleTypeName) => {
      const summary = (readAny(EditableEvents) as OutlookEvent[])
        .map((event) => outlookEventToAvailability(event))
        .map((availability) => ({
          ...availability,
          roleTypeName
        }));
      response[roleTypeName] = { availabilities: summary, suitabilities: [] };
    });
    return response;
  }, [readAny, getRoleTypeNames]);
}
