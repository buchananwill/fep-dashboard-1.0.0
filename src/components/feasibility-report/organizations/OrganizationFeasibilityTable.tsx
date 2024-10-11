import { LeafComponentProps } from '@/app/core/navigation/data/types';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { getOrganizationLeafTotals } from '@/api/actions-custom/feasibilities';
import OrganizationFeasibility from '@/components/feasibility-report/organizations/OrganizationFeasibility';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import { ScrollShadow } from '@nextui-org/scroll-shadow';

export default async function OrganizationFeasibilityTable({
  pathVariables
}: LeafComponentProps) {
  const [cycleId] = getLastNVariables(pathVariables, 1);

  const totalAllocationFeasibilityDtos = await getOrganizationLeafTotals(
    parseInt(cycleId)
  );

  return (
    <div className={'h-[100vh] w-fit overflow-hidden p-4'}>
      <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
        <div className={'h-fit w-fit overflow-hidden rounded-lg shadow-small'}>
          <ScrollShadow
            className={
              'center-all-margin max-h-[90vh] w-fit overflow-auto p-2 pt-4'
            }
          >
            <table>
              <thead className={'sticky top-0 z-50 bg-white'}>
                <tr className={'border-1'}>
                  <th className={'pl-1'}>Size</th>
                  <th>Sum</th>
                  <th className={'pr-1'}>Residual</th>
                </tr>
              </thead>
              {totalAllocationFeasibilityDtos.map((feasibility) => (
                <OrganizationFeasibility
                  organizationTotalFeasibility={feasibility}
                  key={feasibility.organizationId}
                />
              ))}
            </table>
          </ScrollShadow>
        </div>
      </RootCard>
    </div>
  );
}
