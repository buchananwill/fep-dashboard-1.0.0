'use client';
import { Tab, Tabs } from '@nextui-org/tabs';
import { EntityClassMap } from '@/api/entity-class-map';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { GenericDivProps } from '@/react-flow/components/nodes/BaseEditableNode';
import WorkTaskTypeSelectorTable from '@/components/tables/entity/WorkTaskTypeSelectorTable';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { AssetRoleDto } from '@/api/dtos/AssetRoleDtoSchema';
import ProviderRoleSelectorTable from '@/components/tables/entity/ProviderRoleSelectorTable';
import AssetRoleSelectorTable from '@/components/tables/entity/AssetRoleSelectorTable';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { startCase } from 'lodash';
import WorkProjectSeriesSchemaSelectorTable from '@/components/tables/entity/WorkProjectSeriesSchemaSelectorTable';
import OrganizationSelectorTable from '@/components/tables/entity/OrganizationSelectorTable';
import {
  OrganizationDto,
  WorkProjectSeriesWithSchemaLabelsDto
} from '@/api/generated-types/generated-types_';
import { WorkProjectSeriesLeanDto } from '@/components/work-project-series-metrics/WorkProjectSeriesTableDataFetcher';
import WorkProjectSeriesSelectorTable from '@/components/tables/entity/WorkProjectSeriesSelectorTable';

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
            key={EntityClassMap.organization}
            title={startCase(EntityClassMap.organization)}
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
