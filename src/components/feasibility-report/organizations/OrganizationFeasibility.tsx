import { OrganizationLeafTotalAllocationFeasibilityDto } from '@/api/generated-types/generated-types';
import OrganizationSummary from '@/components/organizations/OrganizationSummary';
import OrganizationAllocationFeasibility from '@/components/feasibility-report/organizations/OrganizationAllocationFeasibility';
import OrganizationCycleSubspanGroupFeasibilities from '@/components/feasibility-report/organizations/OrganizationCycleSubspanGroupFeasibilities';

export default function OrganizationFeasibility({
  organizationTotalFeasibility
}: {
  organizationTotalFeasibility: OrganizationLeafTotalAllocationFeasibilityDto;
}) {
  return (
    <tbody className={'border-1 border-default-200 p-1'}>
      <tr>
        <th colSpan={3}>
          <OrganizationSummary
            organizationId={organizationTotalFeasibility.organizationId}
          />
        </th>
      </tr>

      <OrganizationAllocationFeasibility
        size={'All'}
        residual={organizationTotalFeasibility.residualCycleSubspanCount}
        sum={organizationTotalFeasibility.totalAllocationAllSizes}
      />
      <OrganizationCycleSubspanGroupFeasibilities
        totalFeasibility={organizationTotalFeasibility}
      />
    </tbody>
  );
}
