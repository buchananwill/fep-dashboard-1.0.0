'use client';
import { startCase } from 'lodash';

import { getDomainAlias } from '@/api/getDomainAlias';
import { useGlobalDispatch } from 'selective-context';
import { useMemo } from 'react';
import { useEffectSyncToMemo } from 'react-d3-force-wrapper';
import { JSX } from 'react/jsx-runtime';
import { HasUuidDtoSchema } from '@/api/generated-schemas/schemas_';
import { LeafComponentProps } from '@/app/core/navigation/data/types';
import { Breadcrumbs } from '@mantine/core';
import { LinkButton } from '@/components/navigation/LinkButton';

export const navigationBreadcrumbs = 'navigation-breadcrumbs';
export default function NavigationBreadcrumbs({
  pathVariables
}: LeafComponentProps) {
  const { dispatchWithoutListen } = useGlobalDispatch<JSX.Element>(
    navigationBreadcrumbs
  );

  const breadCrumbsRender = useMemo(() => {
    return (
      <Breadcrumbs className={'h-4'}>
        {pathVariables.map((pathVariable, index) =>
          index + 1 === pathVariables.length ? (
            <span key={index}>
              {isUuid(pathVariable)
                ? pathVariable
                : startCase(getDomainAlias(pathVariable))}
            </span>
          ) : (
            <LinkButton
              href={`/core/${pathVariables.slice(0, index + 1).join('/')}`}
              key={index}
            >
              {isUuid(pathVariable)
                ? pathVariable
                : startCase(getDomainAlias(pathVariable))}
            </LinkButton>
          )
        )}
      </Breadcrumbs>
    );
  }, [pathVariables]);

  useEffectSyncToMemo(dispatchWithoutListen, breadCrumbsRender);

  return null;
}

function isUuid(testString: string) {
  try {
    HasUuidDtoSchema.parse({ id: testString });
    return true;
  } catch (e) {
    return false;
  }
}
