import { cloneOrganizationNode } from './cloneOrganizationNode';
import { getGraphUpdaterWithNameDeDuplication } from './getGraphUpdaterWithNameDeDuplication';
import * as Organization from '@/api/generated-actions/Organization';
import { createDataNodeDtoSchema } from '@/api/zod-mods';
import { validateAssignmentDtos } from '@/components/react-flow/organization/validateAssignmentDtos';
import { middlewareCombiner } from '@/components/react-flow/generic/utils/graphMiddlewareCombiner';
import { OrganizationDtoSchema } from '@/api/zod-schemas/OrganizationDtoSchema_';

export const cloneFunctionWrapper = { memoizedFunction: cloneOrganizationNode };

export const organizationGraphUpdater = middlewareCombiner(
  [getGraphUpdaterWithNameDeDuplication, validateAssignmentDtos],
  Organization.putGraph
);

export const OrganizationDataNodeDtoSchema = createDataNodeDtoSchema(
  OrganizationDtoSchema
);
