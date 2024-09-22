import { useCallback } from 'react';
import { EditableEvents } from '@/components/roles/create-role/useEditableEvents';
import { OutlookEvent } from '@/api/microsoft-graph/helperTypes';
import { outlookEventToAvailability } from '@/components/roles/create-role/RoleSubmissionHandler';

export function useCompileAvailabilities(
  readAny: (contextKey: string) => unknown,
  getRoleTypeNames: () => string[]
) {
  return useCallback(() => {
    return (readAny(EditableEvents) as OutlookEvent[])
      .map((event) => outlookEventToAvailability(event))
      .map((availability) => ({
        ...availability,
        roleTypeNames: getRoleTypeNames()
      }));
  }, [readAny, getRoleTypeNames]);
}