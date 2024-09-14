import { RolePageProps } from '@/components/roles/types';
import { notFound } from 'next/navigation';
import SuitabilityPage, {
  KnowledgeLevelSeriesRoleTypeList,
  RoleTypeListComponent
} from '../../components/roles/suitability/SuitabilityPage';
import AvailabilityPage from '@/components/roles/availability/availabilityPage';
import { LeafComponentProps, NavTreeBranch } from '@/app/core/navigation/types';
import { LinkButton } from '@/components/LinkButton';
import { startCase } from 'lodash';
import { getCoreEntityLink } from '@/functions/getCoreEntityLink';

export default function RolePage(props: RolePageProps) {
  const {
    params: { roleAspect, roleCategory }
  } = props;

  switch (roleAspect) {
    case 'suitability': {
      if (roleCategory === 'user') return notFound();
      else return <SuitabilityPage params={props.params} />;
    }
    case 'availability': {
      if (roleCategory === 'provider') return <AvailabilityPage {...props} />;
      else return notFound();
    }
  }
}

export const rolePageTree: NavTreeBranch = {
  type: 'branch',
  component: RoleAspectMenu,
  children: {
    suitability: { type: 'leaf', component: RoleTypeListComponent },
    availability: { type: 'leaf', component: RoleTypeListComponent }
  }
};

export const RoleAspects = {
  suitability: SuitabilityPage,
  availability: AvailabilityPage
};

function RoleAspectMenu({ pathVariables, depth }: LeafComponentProps) {
  return Object.keys(RoleAspects).map((aspect) => {
    return (
      <LinkButton
        href={getCoreEntityLink(pathVariables.slice(0, depth), [aspect])}
        key={aspect}
      >
        {startCase(aspect)}
      </LinkButton>
    );
  });
}
