import { InitJsonTemplateDto } from '@/api/generated-types/generated-types_';
import { ReactNode } from 'react';
import { AssetRoleRequestsTablePage } from '@/components/init-json-template/asset-role-requests/AssetRoleRequestsTable';
import { CarouselOrdersTablePage } from '@/components/init-json-template/carousel-order-summary/carousel-orders-table-page';
import { OrganizationWorkHierarchyTablePage } from '@/components/init-json-template/organization-work-hierarchy/OrganizationWorkHierarchyTablePage';
import { CycleModelTablePage } from '@/components/init-json-template/cycle-model/CycleModelTablePage';
import { ProviderRoleTablePage } from '@/components/init-json-template/provider-roles/ProviderRoleTablePage';
import { WorkSchemaNodeManualDefinitionTablePage } from '@/components/init-json-template/work-schema-node-manual-defintion-table/WorkSchemaNodeManualDefinitionTablePage';

export const InitJsonDataTypes: Record<string, null | InitJsonTemplatePage> = {
  KNOWLEDGE_DOMAIN: null,
  ASSET_TYPE: null,
  ORGANIZATION_TYPE_LIST: null,
  USER_ROLE_TYPE_LIST: null,
  ASSET_ROLE_TYPE_LIST: null,
  PROVIDER_ROLE_TYPE_LIST: null,
  CYCLE_DEFINITION: CycleModelTablePage,
  WORK_TASK_TYPE_NAME_STRINGS: null,
  KNOWLEDGE_LEVEL_SERIES_LIST: null,
  RESOURCE_REQUIREMENT_SUMMARY_LIST: null,
  WORK_SCHEMA_NODE: WorkSchemaNodeManualDefinitionTablePage,
  ORGANIZATION_WORK_HIERARCHY: OrganizationWorkHierarchyTablePage,
  AUTO_CAROUSEL_OPTIONS: null,
  CAROUSEL_ORDERS: CarouselOrdersTablePage,
  PROVIDER_ROLES: ProviderRoleTablePage,
  ASSET_ROLES: AssetRoleRequestsTablePage
} as const;

export type InitJsonTemplatePageProps = {
  initJsonTemplate: InitJsonTemplateDto;
};
export type InitJsonTemplatePage = (
  props: InitJsonTemplatePageProps
) => ReactNode;
