import { OrganizationLeafTotalAllocationFeasibilityDto } from '@/api/generated-types/generated-types';
import OrganizationSummary from '@/components/feasibility-report/organizations/OrganizationSummary';
import OrganizationAllocationFeasibility from '@/components/feasibility-report/organizations/OrganizationAllocationFeasibility';
import OrganizationCycleSubspanGroupFeasibilities from '@/components/feasibility-report/organizations/OrganizationCycleSubspanGroupFeasibilities';
import { Suspense } from 'react';

import { Loading } from '@/components/feasibility-report/Loading';

export default function OrganizationFeasibility({
  organizationTotalFeasibility
}: {
  organizationTotalFeasibility: OrganizationLeafTotalAllocationFeasibilityDto;
}) {
  return (
    <
      // className={'border-1 border-default-200 p-1'}
    >
      <OrganizationSummary
        organizationId={organizationTotalFeasibility.organizationId}
      />

      <OrganizationAllocationFeasibility
        size={'All'}
        residual={organizationTotalFeasibility.residualCycleSubspanCount}
        sum={organizationTotalFeasibility.totalAllocationAllSizes}
      />

      <OrganizationCycleSubspanGroupFeasibilities
        totalFeasibility={organizationTotalFeasibility}
      />
    </>
  );
}
