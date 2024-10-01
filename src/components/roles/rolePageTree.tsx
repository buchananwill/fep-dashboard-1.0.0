import {
  LeafComponentProps,
  NavTreeBranch,
  NavTreeNode
} from '@/app/core/navigation/types';
import SuitabilityPage, {
  RoleTypeListComponent
} from '@/components/roles/suitability/SuitabilityPage';
import AvailabilityPage from '@/components/roles/availability/availabilityPage';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { notFound } from 'next/navigation';
import CreateRolePage from '@/components/roles/create-role/CreateRolePage';
import { getFirstNVariables } from '@/components/work-task-types/getRootCardLayoutId';
import { createLinksFromNavTree } from '@/app/core/navigation/createLinksFromNavTree';
import { getNavIndex } from '@/components/knowledge-levels/KnowledgeLevelSeriesLinks';
import { NavigationType } from '@/components/navigation/navLinkIcons';
import { NavLinkTreeButton } from '@/app/core/navigation/NavLinkTreeButton';
import { WrappedHeader } from '@/app/core/navigation/WrappedHeader';
import { WrappedLink } from '@/app/core/navigation/WrappedLink';

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

  const navLinkTree = createLinksFromNavTree(
    rolePageTree,
    ['core', ...getFirstNVariables(pathVariables, 1)],
    [getNavIndex(roleType as NavigationType)]
  );
  return (
    <div className={'p-4'}>
      <NavLinkTreeButton
        navLinkNode={navLinkTree}
        renderHeaderAs={WrappedHeader}
        renderLinkAs={WrappedLink}
      />
    </div>
  );
}
