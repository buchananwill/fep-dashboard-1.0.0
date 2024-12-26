import { camelCase } from 'lodash';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import { getLastNVariables } from '@/functions/getLastNVariables';
import { api } from '@/api/v3/clientApiV3';
import { EntityTypeKey } from '@/components/tables/types';
import { LinkButtonThatJoinsList } from '@/app/core/navigation/links/LinkButtonThatJoinsList';
import { singular } from 'pluralize';
import RootCard from '@/components/generic/RootCard';
import { getRootCardLayoutId } from '@/components/work-task-types/getRootCardLayoutId';
import classes from './organization-type-links.module.css';

export async function OrganizationTypeLinks({
  pathVariables,
  depth
}: LeafComponentProps) {
  const [entityClass] = getLastNVariables(pathVariables, 1);
  const entityTypeClass = camelCase(
    `${singular(entityClass)}Type`
  ) as EntityTypeKey;
  const entityTypeDtos = await api(entityTypeClass, 'getAll', {});

  console.log({ entityTypeDtos, entityClass, entityTypeClass, pathVariables });

  // @ts-ignore
  return (
    <RootCard layoutId={getRootCardLayoutId(pathVariables)}>
      <ul className={classes.linkList}>
        {entityTypeDtos.map((typeDto) => (
          <li key={typeDto.name}>
            <LinkButtonThatJoinsList
              link={['core', ...pathVariables, typeDto.name]}
              displayLabel={typeDto.name}
            />
          </li>
        ))}
      </ul>
    </RootCard>
  );
}
