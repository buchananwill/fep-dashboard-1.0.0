'use client';
import { LeafComponentProps } from '@/app/core/navigation/types';
import { startCase } from 'lodash';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';

import { getDomainAlias } from '@/api/getDomainAlias';
import { HasUuidDtoSchema } from '@/api/zod-schemas/HasUuidDtoSchema';
import { ZodError } from 'zod';

export default function NavigationBreadcrumbs({
  pathVariables
}: LeafComponentProps) {
  console.log('rendering breadcrumbs', pathVariables);

  return (
    <div
      className={
        'fixed bottom-0 left-1/2 z-50 flex justify-center rounded bg-white bg-opacity-80 p-2'
      }
      style={{ transform: 'translate(-50%, 0%)' }}
    >
      <Breadcrumbs>
        {pathVariables.map((pathVariable, index) => (
          <BreadcrumbItem
            key={index}
            href={`/core/${pathVariables.slice(0, index + 1).join('/')}`}
          >
            {isUuid(pathVariable)
              ? pathVariable
              : startCase(getDomainAlias(pathVariable))}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
}

function isUuid(testString: string) {
  try {
    HasUuidDtoSchema.parse({ id: testString });
    return true;
  } catch (e) {
    return false;
  }
}
