'use server';
import { getWithoutBody } from '@/api/actions/template-actions';
import { constructUrl } from '@/api/actions/template-base-endpoints';
import {
  OrganizationLeafCycleSubspanGroupFeasibilityDto,
  OrganizationLeafTotalAllocationFeasibilityDto
} from '@/api/generated-types/generated-types';

export const getOrganizationLeafTotals = (cycleId: number) =>
  getWithoutBody<OrganizationLeafTotalAllocationFeasibilityDto[]>(
    constructUrl(
      `/api/v2/schedule/feasibilityReport/organizationLeafTotals/${cycleId}`
    )
  );
export const getOrganizationLeafCycleSubspanGroups = (
  cycleId: number,
  organizationId: number
) =>
  getWithoutBody<OrganizationLeafCycleSubspanGroupFeasibilityDto[]>(
    constructUrl(
      `/api/v2/schedule/feasibilityReport/organizationLeafCycleSubspanGroups/${cycleId}/${organizationId}`
    )
  );
