'use client';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { startCase } from 'lodash';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';

import { getDomainAlias } from '@/api/getDomainAlias';
import { HasUuidDtoSchema } from '@/api/zod-schemas/HasUuidDtoSchema';
import { useGlobalDispatch } from 'selective-context';
import { useMemo } from 'react';
import { useEffectSyncToMemo } from 'react-d3-force-wrapper';
import { JSX } from 'react/jsx-runtime';

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
  // <div
  //   className={
  //     'fixed bottom-0 left-1/2 z-50 flex justify-center rounded bg-white bg-opacity-80 p-2'
  //   }
  //   style={{ transform: 'translate(-50%, 0%)' }}
  // >
  //   <Breadcrumbs>
  //     {pathVariables.map((pathVariable, index) => (
  //       <BreadcrumbItem
  //         key={index}
  //         href={`/core/${pathVariables.slice(0, index + 1).join('/')}`}
  //       >
  //         {isUuid(pathVariable)
  //           ? pathVariable
  //           : startCase(getDomainAlias(pathVariable))}
  //       </BreadcrumbItem>
  //     ))}
  //   </Breadcrumbs>
  // </div>
}

function isUuid(testString: string) {
  try {
    HasUuidDtoSchema.parse({ id: testString });
    return true;
  } catch (e) {
    return false;
  }
}
