'use client';
import { Tab, Tabs } from '@nextui-org/tabs';
import { EntityClassMap } from '@/api/entity-class-map';
import { GenericDivProps } from '@/components/react-flow/generic/components/nodes/BaseEditableNode';
import WorkTaskTypeSelectorTable from '@/components/tables/selectorTables/WorkTaskTypeSelectorTable';
import { ProviderRoleDto } from '@/api/generated-types/generated-types';
import { AssetRoleDto } from '@/api/generated-types/generated-types';
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
import { EntityTypeMap } from '@/api/entity-type-map';
import { ReactNode, useMemo } from 'react';
import pluralize from 'pluralize';
import { isNotUndefined } from '@/api/main';
import { Simplify } from 'type-fest';

export default function TabbedSelectorTables({
  data,
  ...divProps
}: { data: SelectorTableDataProps } & Omit<GenericDivProps, 'children'>) {
  return (
    <div {...divProps}>
      <Tabs items={Object.entries(data)}>
        {data.workTaskType && (
          <Tab key={EntityClassMap.workTaskType} title={'Work Task Types'}>
            <WorkTaskTypeSelectorTable entities={data.workTaskType} />
          </Tab>
        )}
        {data.providerRole && (
          <Tab
            key={EntityClassMap.providerRole}
            title={getDomainAlias('Providers')}
          >
            <ProviderRoleSelectorTable entities={data.providerRole} />
          </Tab>
        )}
        {data.assetRole && (
          <Tab key={EntityClassMap.assetRole} title={'Assets'}>
            <AssetRoleSelectorTable entities={data.assetRole} />
          </Tab>
        )}
        {data.workProjectSeriesSchema && (
          <Tab
            key={EntityClassMap.workProjectSeriesSchema}
            title={startCase(EntityClassMap.workProjectSeriesSchema)}
          >
            <WorkProjectSeriesSchemaSelectorTable
              entities={data.workProjectSeriesSchema}
            />
          </Tab>
        )}
        {data.organization && (
          <Tab
            key={EntityClassMap.organization}
            title={startCase(EntityClassMap.organization)}
          >
            <OrganizationSelectorTable entities={data.organization} />
          </Tab>
        )}
        {data.workProjectSeries && (
          <Tab
            key={EntityClassMap.workProjectSeries}
            title={startCase(getDomainAlias(EntityClassMap.workProjectSeries))}
          >
            <WorkProjectSeriesSelectorTable entities={data.workProjectSeries} />
          </Tab>
        )}
      </Tabs>
    </div>
  );
}

export type SelectorTableDataProps = {
  [key in keyof EntityTypeMap]?: EntityTypeMap[key][];
};
