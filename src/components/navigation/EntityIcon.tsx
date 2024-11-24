import { SVGProps } from 'react';
import { camelCase } from 'lodash';
import { iconDefinitions } from '@/components/navigation/iconDefinitions';

export function EntityIcon({
  entityName,
  ...props
}: { entityName: string } & SVGProps<SVGSVGElement>) {
  const iconsKey = camelCase(entityName);

  const IconsComponent =
    iconsKey in iconDefinitions &&
    iconDefinitions[iconsKey as keyof typeof iconDefinitions];

  return IconsComponent ? <IconsComponent {...props} /> : null;
}
