import { getPage } from '@/api/generated-actions/ServiceCategory';
import { LeafComponentProps } from '@/app/core/navigation/types';
import PathVariableSplit from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import ServiceCategory from '@/app/service-categories/[id]/ServiceCategory';
import { kebabCase } from 'lodash';
import { LinkButton } from '@/app/service-categories/LinkButton';

async function Home({ pathVariables }: LeafComponentProps) {
  const dtoPage = await getPage({ page: 0, pageSize: 10 });

  return (
    <main className={'p-8'}>
      <div className={'flex flex-col gap-1'}>
        <LinkButton
          href={getCoreEntityLink(pathVariables, ['create'])}
          className={'border border-gray-400 p-4'}
        >
          Create
        </LinkButton>
        {dtoPage.content.map((serviceCategory) => (
          <LinkButton
            href={`${getCoreEntityLink(pathVariables.slice(0, 1), [String(serviceCategory.id)])}`}
            key={serviceCategory.id}
          >
            {serviceCategory.name}
          </LinkButton>
        ))}
      </div>
    </main>
  );
}

export default function ServiceCategoriesHome(props: LeafComponentProps) {
  return (
    <PathVariableSplit
      {...props}
      homeComponent={Home}
      subRouteComponent={ServiceCategory}
    />
  );
}

export function getCoreEntityLink(
  matchedPaths: string[],
  variables?: (string | number)[]
) {
  return `/core/${matchedPaths.map(kebabCase).join('/')}${variables ? `/${variables.join('/')}` : ''}`;
}
