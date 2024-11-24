import { SVGProps } from 'react';
import { camelCase } from 'lodash';
import { plural } from 'pluralize';
import { iconDefinitions } from '@/components/navigation/iconDefinitions';

export function EntityIcon({
  entityName,
  ...props
}: { entityName: string } & SVGProps<SVGSVGElement>) {
  const iconsKey = camelCase(plural(entityName));
  const IconsComponent =
    iconsKey in iconDefinitions &&
    iconDefinitions[iconsKey as keyof typeof iconDefinitions];

  return IconsComponent ? <IconsComponent {...props} /> : null;
}
