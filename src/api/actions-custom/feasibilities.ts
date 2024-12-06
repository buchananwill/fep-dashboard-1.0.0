'use server';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import {
  OrganizationLeafCycleSubspanGroupFeasibilityDto,
  OrganizationLeafTotalAllocationFeasibilityDto,
  ResourceFlowResponse,
  TaskAreaPerKnowledgeDomainDto
} from '@/api/generated-types/generated-types_';

const feasibilityEndpoint = `/api/v2/schedule/feasibilityReport`;

export const getOrganizationLeafTotals = async (cycleId: number) => {
  return getWithoutBody<OrganizationLeafTotalAllocationFeasibilityDto[]>(
    constructUrl(`${feasibilityEndpoint}/organizationLeafTotals/${cycleId}`)
  );
};
export const getOrganizationLeafCycleSubspanGroups = async (
  cycleId: number,
  organizationId: number
) =>
  getWithoutBody<OrganizationLeafCycleSubspanGroupFeasibilityDto[]>(
    constructUrl(
      `${feasibilityEndpoint}/organizationLeafCycleSubspanGroups/${cycleId}/${organizationId}`
    )
  );

export const getKnowledgeDomainTaskAreas = async () =>
  getWithoutBody<TaskAreaPerKnowledgeDomainDto[]>(
    constructUrl(`${feasibilityEndpoint}/taskAreaPerKnowledgeDomain`)
  );

export const getKnowledgeDomainResourceFlowResponse = async (
  knowledgeDomainId: number
) =>
  getWithoutBody<ResourceFlowResponse>(
    constructUrl(`${feasibilityEndpoint}/knowledgeDomains/${knowledgeDomainId}`)
  );
