import { LinkButton } from '@/components/navigation/LinkButton';
import CreateFeasibilityReportPage from '@/app/core/feasibility/CreateFeasibilityReportPage';
import { ViewFeasibilityReportHome } from '@/app/core/feasibility/ViewFeasibilityReportHome';
import { LeafComponentProps, NavTreeNode } from '@/app/core/navigation/types';
import { startCase } from 'lodash';
import RootCard from '@/app/core/navigation/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';

export const feasibilityBranch = {
  children: {
    create: { component: CreateFeasibilityReportPage },
    view: { component: ViewFeasibilityReportHome }
  },
  component: FeasibilityHome
} as const;

export default function FeasibilityHome(props: LeafComponentProps) {
  return (
    <div className={'p-4'}>
      <RootCard layoutId={getRootCardLayoutId(props.pathVariables)}>
        {Object.keys(feasibilityBranch.children).map((childKey) => (
          <LinkButton href={`/core/feasibility/${childKey}`} key={childKey}>
            {startCase(childKey)}
          </LinkButton>
        ))}
      </RootCard>
    </div>
  );
}
