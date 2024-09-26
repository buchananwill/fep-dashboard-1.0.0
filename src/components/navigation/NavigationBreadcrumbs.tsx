'use client';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { startCase } from 'lodash';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';

import { getDomainAlias } from '@/api/getDomainAlias';
import { useGlobalDispatch } from 'selective-context';
import { useMemo } from 'react';
import { useEffectSyncToMemo } from 'react-d3-force-wrapper';
import { JSX } from 'react/jsx-runtime';
import { HasUuidDtoSchema } from '@/api/generated-schemas/schemas';

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
        {pathVariables.map((pathVariable, index) => (
          <BreadcrumbItem
            className={'text-default-700'}
            key={index}
            href={`/core/${pathVariables.slice(0, index + 1).join('/')}`}
          >
            {isUuid(pathVariable)
              ? pathVariable
              : startCase(getDomainAlias(pathVariable))}
          </BreadcrumbItem>
        ))}
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
