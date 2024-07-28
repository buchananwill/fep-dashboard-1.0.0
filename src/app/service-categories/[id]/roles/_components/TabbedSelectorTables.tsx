'use client';
import { Tab, Tabs } from '@nextui-org/tabs';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { GenericDivProps } from '@/react-flow/components/nodes/BaseEditableNode';
import WorkTaskTypeSelectorTable from '@/app/service-categories/[id]/work-task-types/_components/WorkTaskTypeSelectorTable';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { AssetRoleDto } from '@/api/dtos/AssetRoleDtoSchema';
import ProviderRoleSelectorTable from '@/app/service-categories/[id]/roles/_components/ProviderRoleSelectorTable';
import AssetRoleSelectorTable from '@/app/service-categories/[id]/roles/_components/AssetRoleSelectorTable';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { startCase } from 'lodash';
import WorkProjectSeriesSchemaSelectorTable from '@/app/work-project-series-schemas/_components/WorkProjectSeriesSchemaSelectorTable';

export default function TabbedSelectorTables({
  workTaskTypes,
  providerRoles,
  assetRoles,
  workProjectSeriesSchemas,
  ...divProps
}: {
  workTaskTypes?: WorkTaskTypeDto[];
  providerRoles?: ProviderRoleDto[];
  assetRoles?: AssetRoleDto[];
  workProjectSeriesSchemas?: WorkProjectSeriesSchemaDto[];
} & Omit<GenericDivProps, 'children'>) {
  return (
    <div {...divProps}>
      <Tabs>
        {workTaskTypes && (
          <Tab key={EntityClassMap.workTaskType} title={'Work Task Types'}>
            <WorkTaskTypeSelectorTable workTaskTypes={workTaskTypes} />
          </Tab>
        )}
        {providerRoles && (
          <Tab key={EntityClassMap.providerRole} title={'Providers'}>
            <ProviderRoleSelectorTable providerRoles={providerRoles} />
          </Tab>
        )}
        {assetRoles && (
          <Tab key={EntityClassMap.assetRole} title={'Assets'}>
            <AssetRoleSelectorTable assetRoles={assetRoles} />
          </Tab>
        )}
        {workProjectSeriesSchemas && (
          <Tab
            key={EntityClassMap.workProjectSeriesSchema}
            title={startCase(EntityClassMap.workProjectSeriesSchema)}
          >
            <WorkProjectSeriesSchemaSelectorTable
              workProjectSeriesSchemas={workProjectSeriesSchemas}
            />
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
