import { LeafComponentProps } from '@/app/core/navTree';
import { Api } from '@/api/clientApi';
import { getCoreEntityLink } from '@/app/service-categories/ServiceCategoriesHome';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { startCase } from 'lodash';
import { LinkButton } from '@/app/service-categories/LinkButton';

export async function ServiceCategoryLinks({
  pathVariables,
  depth
}: LeafComponentProps) {
  const all = await Api.ServiceCategory.getAll();
  return (
    <Card>
      <CardHeader>{startCase(pathVariables[depth - 1])}</CardHeader>
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
