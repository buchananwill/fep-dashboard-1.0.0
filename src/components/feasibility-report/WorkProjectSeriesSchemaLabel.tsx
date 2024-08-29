import {
  BaseLazyDtoUiProps,
  LazyDtoUiWrapper,
  LazyDtoUiWrapperProps
} from 'dto-stores';

import { HasId } from '@/api/types';
import { GenericDivProps } from '@/react-flow/components/nodes/BaseEditableNode';
import { HasNameDto } from '@/api/zod-schemas/HasNameDtoSchema';
import clsx from 'clsx';
import { useFloatingTooltip } from '@/app/service-categories/[id]/roles/_components/useFloatingTooltip';
import { TooltipMemo } from '@/app/service-categories/[id]/roles/_components/SimpleTooltip';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';
import { shortCodes } from '@/components/feasibility-report/shortCodes';

export function WorkProjectSeriesSchemaLabel({
  entity
}: BaseLazyDtoUiProps<WorkProjectSeriesSchemaDto>) {
  return entity.name;
}

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
  const subjectCode =
    entity.workTaskType.knowledgeDomain?.shortCode ??
    entity.workTaskType.knowledgeDomain?.name ??
    entity.name;
  const backgroundColor = getBackgroundColor(subjectCode);
  return (
    <div
      className={clsx(
        'pointer-events-none flex h-full w-full items-center justify-center duration-700 transition-colors-opacity',
        backgroundColor
      )}
    >
      {subjectCode}
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
