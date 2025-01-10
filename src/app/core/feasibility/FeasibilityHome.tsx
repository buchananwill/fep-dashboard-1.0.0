import { LinkButton } from '@/components/navigation/LinkButton';
import { startCase } from 'lodash';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-types/getRootCardLayoutId';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import OrganizationFeasibilityTable from '@/components/feasibility-report/organizations/OrganizationFeasibilityTable';

export const feasibilityBranch = {
  children: {
    organizations: { component: OrganizationFeasibilityTable }
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
