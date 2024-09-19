import {
  LeafComponentProps,
  NavTreeBranch,
  NavTreeNode
} from '@/app/core/navigation/types';
import { LinkButton } from '@/components/navigation/LinkButton';
import { getCoreEntityLink } from '@/functions/getCoreEntityLink';
import { startCase } from 'lodash';
import SuitabilityPage, {
  RoleTypeListComponent
} from '@/components/roles/suitability/SuitabilityPage';
import AvailabilityPage from '@/components/roles/availability/availabilityPage';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { notFound } from 'next/navigation';
import CreateRolePage from '@/components/roles/create-role/CreateRolePage';

const roleTypeBranches: NavTreeNode = {
  suitability: { type: 'leaf', component: RoleTypeListComponent },
  availability: { type: 'leaf', component: RoleTypeListComponent },
  createNewRole: { type: 'leaf', component: CreateRolePage }
};

export const rolePageTree: NavTreeBranch = {
  type: 'branch',
  component: RoleAspectMenu,
  children: roleTypeBranches
};
export const RoleAspects = {
  suitability: SuitabilityPage,
  availability: AvailabilityPage
};

function RoleAspectMenu({ pathVariables, depth }: LeafComponentProps) {
  const [roleType] = getLastNVariables(pathVariables, 1);
  if (roleType === 'users') notFound();

  return Object.keys(roleTypeBranches).map((aspect) => {
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
