import { LinkButton } from '@/app/service-categories/LinkButton';
import { navTreeData } from '@/app/core/navigation/navTreeData';
import CreateFeasibilityReportPage from '@/app/scheduling/feasibility-report/CreateFeasibilityReportPage';
import { ViewFeasibilityReportHome } from '@/app/scheduling/feasibility-report/[id]/ViewFeasibilityReportHome';
import { NavTreeBranch } from '@/app/core/navigation/types';
import { startCase } from 'lodash';

export const feasibilityBranch: NavTreeBranch = {
  type: 'branch',
  children: {
    create: { type: 'leaf', component: CreateFeasibilityReportPage },
    view: { type: 'leaf', component: ViewFeasibilityReportHome }
  },
  component: FeasibilityHome
};

export default function FeasibilityHome() {
  return Object.keys(feasibilityBranch.children).map((childKey) => (
    <LinkButton href={`/core/feasibility/${childKey}`} key={childKey}>
      {startCase(childKey)}
    </LinkButton>
  ));
}
