'use client';
import { Tab, Tabs } from '@nextui-org/tabs';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { GenericDivProps } from '@/react-flow/components/nodes/BaseNode';
import WorkTaskTypeSelectorTable from '@/app/service-categories/[id]/work-task-types/_components/WorkTaskTypeSelectorTable';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { AssetRoleDto } from '@/api/dtos/AssetRoleDtoSchema';
import ProviderRoleSelectorTable from '@/app/service-categories/[id]/roles/providers/_components/ProviderRoleSelectorTable';

export default function TabbedSelectorTables({
  workTaskTypes,
  providerRoles,
  assetRoles,
  ...divProps
}: {
  workTaskTypes: WorkTaskTypeDto[];
  providerRoles?: ProviderRoleDto[];
  assetRoles?: AssetRoleDto[];
} & Omit<GenericDivProps, 'children'>) {
  return (
    <div {...divProps}>
      <Tabs>
        <Tab key={EntityClassMap.workTaskType} title={'Work Task Types'}>
          <WorkTaskTypeSelectorTable workTaskTypes={workTaskTypes} />
        </Tab>
        {providerRoles && (
          <Tab key={EntityClassMap.providerRole} title={'Providers'}>
            <ProviderRoleSelectorTable providerRoles={providerRoles} />
          </Tab>
        )}
        {assetRoles && (
          <Tab key={EntityClassMap.assetRole} title={'Assets'}>
            Assets!
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
