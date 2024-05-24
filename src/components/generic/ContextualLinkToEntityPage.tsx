'use client';
import { HasId } from '@/api/main';
import { Link } from '@nextui-org/link';
import { DtoUiComponentProps } from 'dto-stores';
import { toKebabCase } from '@/utils/toKebabCase';
import pluralize from 'pluralize';
import { useContext } from 'react';
import { ResourcePathContext } from '@/components/providers/resource-context/resource-context-creator';

import { useTextAccessor } from '@/components/providers/text-accessor-context/textAccessorContextCreator';

export default function ContextualLinkToEntityPage<T extends HasId>({
  entity,
  entityClass
}: DtoUiComponentProps<T>) {
  let resourceLocation = pluralize(toKebabCase(entityClass));
  let contextPath = useContext(ResourcePathContext);
  const { accessor } = useTextAccessor<T>();

  const url =
    '/' + [...contextPath, resourceLocation, `${entity.id}`].join('/');

  return (
    <Link href={url}>
      {entityClass} : {accessor(entity)}
    </Link>
  );
}
