import { EntityClassMap } from '@/api/entity-class-map';
import { getPage } from '@/api/generated-actions/ServiceCategory';
import { LeafComponentProps } from '@/app/core/navTree';
import PathVariableSplit from '@/app/service-categories/[id]/work-schema-nodes/PathVariableSplit';
import ServiceCategory from '@/app/service-categories/[id]/ServiceCategory';
import { Link, LinkProps } from '@nextui-org/link';
import { Button } from '@nextui-org/button';
import { kebabCase } from 'lodash';
import pluralize from 'pluralize';
import { HasId } from '@/api/types';

async function Home({ pathVariables }: LeafComponentProps) {
  const dtoPage = await getPage({ page: 0, pageSize: 10 });

  return (
    <main className={'p-8'}>
      {dtoPage.content.map((serviceCategory) => (
        <LinkButton
          href={`${getCoreEntityLink(pathVariables[0])}/${serviceCategory.id}`}
          key={serviceCategory.id}
        >
          {serviceCategory.name}
        </LinkButton>
      ))}
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

export function getCoreEntityLink(entityClass: string, entity?: HasId) {
  return `/core/${kebabCase(entityClass)}${entity ? `/${entity.id}` : ''}`;
}

export function LinkButton({
  href,
  children
}: Pick<LinkProps, 'href' | 'children'>) {
  return (
    <Link href={href}>
      <Button variant={'light'} color={'primary'}>
        {children}
      </Button>
    </Link>
  );
}
