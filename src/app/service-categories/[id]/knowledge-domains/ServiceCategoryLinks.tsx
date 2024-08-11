import { LeafComponentProps } from '@/app/core/navigation/types';
import { Api } from '@/api/clientApi_';
import { getCoreEntityLink } from '@/app/service-categories/ServiceCategoriesHome';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { startCase } from 'lodash';
import { LinkButton } from '@/app/service-categories/LinkButton';
import { getDomainAlias } from '@/api/getDomainAlias';

export async function ServiceCategoryLinks({
  pathVariables,
  depth
}: LeafComponentProps) {
  const all = await Api.ServiceCategory.getAll();
  return (
    <Card>
      <CardHeader>
        {startCase(getDomainAlias(pathVariables[depth - 1]))} - Service
        Categories
      </CardHeader>
      <CardBody>
        {all.map((serviceCategory) => (
          <LinkButton
            href={getCoreEntityLink(pathVariables.slice(0, depth), [
              serviceCategory.id
            ])}
            key={serviceCategory.id}
          >
            {serviceCategory.name}
          </LinkButton>
        ))}
      </CardBody>
    </Card>
  );
}
