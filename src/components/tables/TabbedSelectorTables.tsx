'use client';
import { Tab, Tabs } from '@nextui-org/tabs';
import { EntityClassMap } from '@/api/entity-class-map';
import { GenericDivProps } from '@/components/react-flow/generic/components/nodes/BaseEditableNode';
import WorkTaskTypeSelectorTable from '@/components/tables/selectorTables/WorkTaskTypeSelectorTable';
import { ProviderRoleDto } from '@/api/zod-schemas/ProviderRoleDtoSchema';
import { AssetRoleDto } from '@/api/zod-schemas/AssetRoleDtoSchema';
import ProviderRoleSelectorTable from '@/components/tables/selectorTables/ProviderRoleSelectorTable';
import AssetRoleSelectorTable from '@/components/tables/selectorTables/AssetRoleSelectorTable';
import { startCase } from 'lodash';
import WorkProjectSeriesSchemaSelectorTable from '@/components/tables/selectorTables/WorkProjectSeriesSchemaSelectorTable';
import OrganizationSelectorTable from '@/components/tables/selectorTables/OrganizationSelectorTable';
import {
  OrganizationDto,
  WorkProjectSeriesSchemaDto,
  WorkProjectSeriesWithSchemaLabelsDto,
  WorkTaskTypeDto
} from '@/api/generated-types/generated-types';
import WorkProjectSeriesSelectorTable from '@/components/tables/selectorTables/WorkProjectSeriesSelectorTable';
import { getDomainAlias } from '@/api/getDomainAlias';

export default function TabbedSelectorTables({
  workTaskTypes,
  providerRoles,
  assetRoles,
  workProjectSeriesSchemas,
  organizations,
  workProjectSeries,
  ...divProps
}: SelectorTableData & Omit<GenericDivProps, 'children'>) {
  return (
    <div {...divProps}>
      <Tabs>
        {workTaskTypes && (
          <Tab key={EntityClassMap.workTaskType} title={'Work Task Types'}>
            <WorkTaskTypeSelectorTable workTaskTypes={workTaskTypes} />
          </Tab>
        )}
        {providerRoles && (
          <Tab
            key={EntityClassMap.providerRole}
            title={getDomainAlias('Providers')}
          >
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
        {organizations && (
          <Tab
            key={EntityClassMap.organization}
            title={startCase(EntityClassMap.organization)}
          >
            <OrganizationSelectorTable organizations={organizations} />
          </Tab>
        )}
        {workProjectSeries && (
          <Tab
            key={EntityClassMap.workProjectSeries}
            title={startCase(getDomainAlias(EntityClassMap.workProjectSeries))}
          >
            <WorkProjectSeriesSelectorTable
              workProjectSeries={workProjectSeries}
            />
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

export interface SelectorTableData {
  workTaskTypes?: WorkTaskTypeDto[];
  providerRoles?: ProviderRoleDto[];
  assetRoles?: AssetRoleDto[];
  workProjectSeriesSchemas?: WorkProjectSeriesSchemaDto[];
  organizations?: OrganizationDto[];
  workProjectSeries?: WorkProjectSeriesWithSchemaLabelsDto[];
}
