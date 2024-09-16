import { LeafComponentProps, NavTreeBranch } from '@/app/core/navigation/types';
import { LinkButton } from '@/components/navigation/LinkButton';
import { getCoreEntityLink } from '@/functions/getCoreEntityLink';
import { startCase } from 'lodash';
import SuitabilityPage, {
  RoleTypeListComponent
} from '@/components/roles/suitability/SuitabilityPage';
import AvailabilityPage from '@/components/roles/availability/availabilityPage';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { notFound } from 'next/navigation';

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
  const [roleType] = getLastNVariables(pathVariables, 1);
  if (roleType === 'users') notFound();

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
