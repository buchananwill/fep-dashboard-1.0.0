import { OrganizationLeafTotalAllocationFeasibilityDto } from '@/api/generated-types/generated-types';
import { getOrganizationLeafCycleSubspanGroups } from '@/api/actions-custom/feasibilities';
import OrganizationAllocationFeasibility from '@/components/feasibility-report/organizations/OrganizationAllocationFeasibility';

export default async function OrganizationCycleSubspanGroupFeasibilities({
  totalFeasibility
}: {
  totalFeasibility: OrganizationLeafTotalAllocationFeasibilityDto;
}) {
  const groupFeasibilityDtos = await getOrganizationLeafCycleSubspanGroups(
    totalFeasibility.cycleId,
    totalFeasibility.organizationId
  );

  return groupFeasibilityDtos.map((dto) => (
    <OrganizationAllocationFeasibility
      residual={dto.residualCycleSubspanGroupsPerSize}
      size={String(dto.rankSize)}
      sum={dto.rankSizeInheritedAllocation}
      key={`${dto.organizationId}:${dto.rankSize}`}
    />
  ));
}
