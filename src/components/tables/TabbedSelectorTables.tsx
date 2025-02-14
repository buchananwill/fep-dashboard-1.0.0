'use client';
import { GenericDivProps } from '@/components/react-flow/generic/components/nodes/BaseEditableNode';
import WorkProjectSelectorTable from '@/components/tables/selectorTables/WorkProjectSelectorTable';
import { useMemo } from 'react';
import { isNotUndefined } from '@/api/main';
import { startCase } from 'lodash';
import { getDomainAlias } from '@/api/getDomainAlias';
import WorkTypeSelectorTable from '@/components/tables/selectorTables/WorkTypeSelectorTable';
import ProviderRoleSelectorTable from '@/components/tables/selectorTables/ProviderRoleSelectorTable';
import AssetRoleSelectorTable from '@/components/tables/selectorTables/AssetRoleSelectorTable';
import OrganizationSelectorTable from '@/components/tables/selectorTables/OrganizationSelectorTable';
import WorkSchemaSelectorTable from '@/components/tables/selectorTables/WorkSchemaSelectorTable';
import {
  EntityTypeKey,
  TabbedTablesDataProps,
  TableComponentMap
} from '@/components/tables/types';
import { RenderTable } from '@/components/tables/RenderTable';
import KnowledgeDomainSelectorTable from '@/components/tables/selectorTables/KnowledgeDomainSelectorTable';
import KnowledgeLevelSelectorTable from '@/components/tables/selectorTables/KnowledgeLevelSelectorTable';
import { Tabs } from '@mantine/core';

export default function TabbedSelectorTables({
  data,
  ...divProps
}: { data: TabbedTablesDataProps } & Omit<GenericDivProps, 'children'>) {
  const TabItems = useMemo(() => {
    return Object.keys(TableMap)
      .map((key) => key as EntityTypeKey)
      .filter((id) => isNotUndefined(data[id]))
      .map((entityTypeKey) => ({ id: entityTypeKey }) as { id: EntityTypeKey });
  }, [data]);

  const tabs = useMemo(() => {
    return TabItems.map(({ id }) => {
      return (
        <Tabs.Tab key={id} value={id}>
          {startCase(getDomainAlias(id))}
        </Tabs.Tab>
      );
    });
  }, [TabItems]);

  const panels = useMemo(() => {
    return TabItems.map(({ id }) => (
      <Tabs.Panel value={id} key={`tab:${id}`}>
        <RenderTable type={id} data={data} tableMap={TableMap} />
      </Tabs.Panel>
    ));
  }, [TabItems, data]);

  return (
    <div {...divProps}>
      <Tabs defaultValue={TabItems[0]?.id}>
        <Tabs.List>{tabs}</Tabs.List>
        {panels}
      </Tabs>
    </div>
  );
}

const TableMap = {
  workProject: WorkProjectSelectorTable,
  workType: WorkTypeSelectorTable,
  providerRole: ProviderRoleSelectorTable,
  assetRole: AssetRoleSelectorTable,
  organization: OrganizationSelectorTable,
  workSchema: WorkSchemaSelectorTable,
  knowledgeDomain: KnowledgeDomainSelectorTable,
  knowledgeLevel: KnowledgeLevelSelectorTable
} as const satisfies TableComponentMap;
