import { RolePageProps } from '@/app/service-categories/[id]/roles/_components/types';
import { notFound } from 'next/navigation';
import SuitabilityPage, {
  ServiceCategoryRoleTypeList
} from '../../../_components/SuitabilityPage';
import AvailabilityPage from '@/app/service-categories/[id]/roles/_components/availabilityPage';
import {
  LeafComponentProps,
  NavTree,
  NavTreeBranch
} from '@/app/core/navigation/types';
import { LinkButton } from '@/app/service-categories/LinkButton';
import { getCoreEntityLink } from '@/app/service-categories/ServiceCategoriesHome';
import { startCase } from 'lodash';

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
    suitability: { type: 'leaf', component: ServiceCategoryRoleTypeList },
    availability: { type: 'leaf', component: ServiceCategoryRoleTypeList }
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
