'use server';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import {
  OrganizationLeafCycleSubspanGroupFeasibilityDto,
  OrganizationLeafTotalAllocationFeasibilityDto,
  ResourceFlowResponse,
  TaskAreaPerKnowledgeDomainDto
} from '@/api/generated-types/generated-types';

const feasibilityEndpoint = `/api/v2/schedule/feasibilityReport`;

export const getOrganizationLeafTotals = (cycleId: number) => {
  return getWithoutBody<OrganizationLeafTotalAllocationFeasibilityDto[]>(
    constructUrl(`${feasibilityEndpoint}/organizationLeafTotals/${cycleId}`)
  );
};
export const getOrganizationLeafCycleSubspanGroups = (
  cycleId: number,
  organizationId: number
) =>
  getWithoutBody<OrganizationLeafCycleSubspanGroupFeasibilityDto[]>(
    constructUrl(
      `${feasibilityEndpoint}/organizationLeafCycleSubspanGroups/${cycleId}/${organizationId}`
    )
  );

export const getKnowledgeDomainTaskAreas = () =>
  getWithoutBody<TaskAreaPerKnowledgeDomainDto[]>(
    constructUrl(`${feasibilityEndpoint}/taskAreaPerKnowledgeDomain`)
  );

export const getKnowledgeDomainResourceFlowResponse = (
  knowledgeDomainId: number
) =>
  getWithoutBody<ResourceFlowResponse>(
    constructUrl(`${feasibilityEndpoint}/knowledgeDomains/${knowledgeDomainId}`)
  );
