import {
  BaseLazyDtoUiProps,
  LazyDtoUiWrapper,
  LazyDtoUiWrapperProps
} from 'dto-stores';

import { HasId } from '@/api/types';
import { GenericDivProps } from '@/react-flow/components/nodes/BaseEditableNode';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { HasNameDto } from '@/api/dtos/HasNameDtoSchema';
import clsx from 'clsx';

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

function getBackgroundColor(entity: WorkProjectSeriesSchemaDto) {
  const subjectCode = entity?.shortCode?.substring(0, 2) ?? entity.name ?? '';
  const shortCodeIndex = shortCodes.indexOf(subjectCode);
  if (shortCodeIndex === -1) return 'bg-white';
  else return bgColorString[shortCodeIndex % bgColorString.length];
}

export function WorkProjectSeriesSchemaCode({
  entity
}: BaseLazyDtoUiProps<WorkProjectSeriesSchemaDto>) {
  const backgroundColor = getBackgroundColor(entity);
  return (
    <div
      className={clsx(
        'pointer-events-none flex h-full w-full items-center justify-center',
        backgroundColor
      )}
    >
      {entity.shortCode
        ? entity.shortCode.substring(0, 2)
        : entity.name
          ? entity.name.substring(0, 2)
          : ''}
    </div>
  );
}
export function NamedEntityLabel({
  entity
}: GenericDivProps & BaseLazyDtoUiProps<HasNameDto & HasId>) {
  return <div>{entity.name}</div>;
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
