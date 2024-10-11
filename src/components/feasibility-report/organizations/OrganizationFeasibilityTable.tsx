import { LeafComponentProps } from '@/app/core/navigation/data/types';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { getOrganizationLeafTotals } from '@/api/actions-custom/feasibilities';
import OrganizationFeasibility from '@/components/feasibility-report/organizations/OrganizationFeasibility';
import { FeasibilityTable } from '@/components/feasibility-report/FeasibilityTable';

export default async function OrganizationFeasibilityTable({
  pathVariables,
  depth
}: LeafComponentProps) {
  const [cycleId] = getLastNVariables(pathVariables, 1);

  let intCycleId = 1;
  intCycleId = parseInt(cycleId);
  if (isNaN(intCycleId)) {
    intCycleId = 1;
  }

  const totalAllocationFeasibilityDtos =
    await getOrganizationLeafTotals(intCycleId);

  return (
    <FeasibilityTable
      pathVariables={pathVariables}
      depth={depth}
      headerCellContent={['Size', 'Sum', 'Residual']}
      bodyContent={
        <tbody>
          {totalAllocationFeasibilityDtos.map((feasibility) => (
            <OrganizationFeasibility
              organizationTotalFeasibility={feasibility}
              key={feasibility.organizationId}
            />
          ))}
        </tbody>
      }
    />
  );
}
