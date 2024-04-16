import { HasId } from '@/app/api/main';
import { Link } from '@nextui-org/link';
import { DtoUiComponentProps } from 'dto-stores';
import { toKebabCase } from '@/utils/toKebabCase';
import pluralize from 'pluralize';

export default function LinkToEntityPage<T extends HasId>({
  entity,
  entityClass
}: DtoUiComponentProps<T>) {
  let resourceLocation = pluralize(toKebabCase(entityClass));

  return (
    <Link href={`${resourceLocation}/${entity.id}`}>
      {entityClass} : {entity.id}
    </Link>
  );
}
