import { RoleData } from '@/api/generated-types/generated-types_';
import { useCallback } from 'react';

export function usePropagateRoleDataChange({
  compileAvailabilitiesWithoutSetting,
  propagateRoleDataChange,
  compileSuitabilityRequestWithoutSetting
}: {
  compileSuitabilityRequestWithoutSetting: () => Record<string, RoleData>;
  compileAvailabilitiesWithoutSetting: () => Record<string, RoleData>;
  propagateRoleDataChange: (update: Record<string, RoleData>) => void;
}) {
  return useCallback(() => {
    const suitabilities = compileSuitabilityRequestWithoutSetting();
    const availabilities = compileAvailabilitiesWithoutSetting();
    const combinedData = {} as Record<string, RoleData>;
    Object.entries(suitabilities).forEach(([key, value]) => {
      combinedData[key] = {
        suitabilities: value.suitabilities,
        availabilities: combinedData[key]?.availabilities ?? []
      };
    });
    Object.entries(availabilities).forEach(([key, value]) => {
      combinedData[key] = {
        availabilities: value.availabilities,
        suitabilities: combinedData[key]?.suitabilities ?? []
      };
    });
    propagateRoleDataChange(combinedData);
  }, [
    compileSuitabilityRequestWithoutSetting,
    compileAvailabilitiesWithoutSetting,
    propagateRoleDataChange
  ]);
}
