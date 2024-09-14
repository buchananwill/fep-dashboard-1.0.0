import { LinkButton } from '@/components/LinkButton';
import CreateFeasibilityReportPage from '@/app/core/feasibility/CreateFeasibilityReportPage';
import { ViewFeasibilityReportHome } from '@/app/core/feasibility/ViewFeasibilityReportHome';
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
