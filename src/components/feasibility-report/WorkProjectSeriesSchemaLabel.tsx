import {
  BaseLazyDtoUiProps,
  LazyDtoUiWrapper,
  LazyDtoUiWrapperProps
} from 'dto-stores';

import { HasId } from '@/api/types';
import { GenericDivProps } from '@/react-flow/components/nodes/BaseEditableNode';
import { WorkProjectSeriesSchemaDto } from '@/api/zod-schemas/WorkProjectSeriesSchemaDtoSchema';
import { HasNameDto } from '@/api/zod-schemas/HasNameDtoSchema';
import clsx from 'clsx';
import { useFloatingTooltip } from '@/app/service-categories/[id]/roles/_components/useFloatingTooltip';
import { TooltipMemo } from '@/app/service-categories/[id]/roles/_components/SimpleTooltip';

export function WorkProjectSeriesSchemaLabel({
  entity
}: BaseLazyDtoUiProps<WorkProjectSeriesSchemaDto>) {
  return entity.name;
}

const shortCodes = [
  'Ar',
  'Bi',
  'Cc',
  'Ch',
  'Cm',
  'Dr',
  'Dt',
  'Ec',
  'El',
  'Fp',
  'Fr',
  'Ga',
  'Ge',
  'Gg',
  'Gp',
  'Hi',
  'La',
  'Ld',
  'Mf',
  'Mm',
  'Mp',
  'Mu',
  'PE',
  'Pe',
  'Ph',
  'Ps',
  'Py',
  'Rs'
];

const bgColorString = [
  'bg-red-400',
  'bg-orange-400',
  'bg-amber-400',
  'bg-yellow-400',
  'bg-lime-400',
  'bg-green-400',
  'bg-emerald-400',
  'bg-teal-400',
  'bg-cyan-400',
  'bg-sky-400',
  'bg-blue-400',
  'bg-indigo-400',
  'bg-violet-400',
  'bg-purple-400',
  'bg-fuchsia-400',
  'bg-pink-400',
  'bg-rose-400'
];

function getBackgroundColor(subjectCode: string) {
  const shortCodeIndex = shortCodes.indexOf(subjectCode);
  if (shortCodeIndex === -1) return 'bg-white';
  else return bgColorString[shortCodeIndex % bgColorString.length];
}

export function WorkProjectSeriesSchemaCode({
  entity
}: BaseLazyDtoUiProps<WorkProjectSeriesSchemaDto>) {
  const subjectCode = entity.name ?? '';
  const backgroundColor = getBackgroundColor(subjectCode);
  return (
    <div
      className={clsx(
        'pointer-events-none flex h-full w-full items-center justify-center duration-700 transition-colors-opacity',
        backgroundColor
      )}
    >
      {entity.name ? entity.name.substring(0, 2) : ''}
    </div>
  );
}
export function NamedEntityLabel({
  entity,
  ...divProps
}: GenericDivProps & BaseLazyDtoUiProps<HasNameDto & HasId>) {
  const tooltip = useFloatingTooltip(<TooltipMemo text={entity.name} />);
  return (
    <div {...tooltip} {...divProps}>
      {entity.name}
    </div>
  );
}

export function NamedEntityLabelWrapper(
  props: Omit<
    LazyDtoUiWrapperProps<HasNameDto & HasId, GenericDivProps>,
    'renderAs' | 'whileLoading'
  >
) {
  return (
    <LazyDtoUiWrapper
      renderAs={NamedEntityLabel}
      {...props}
      whileLoading={() => '...loading'}
    />
  );
}
