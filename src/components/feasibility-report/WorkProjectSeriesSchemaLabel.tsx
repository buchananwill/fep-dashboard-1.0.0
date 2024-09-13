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
import { getShortCodeColor } from '@/components/feasibility-report/getShortcodeColor';

export function WorkProjectSeriesSchemaLabel({
  entity
}: BaseLazyDtoUiProps<WorkProjectSeriesSchemaDto>) {
  return entity.name;
}

export function WorkProjectSeriesSchemaCode({
  entity
}: BaseLazyDtoUiProps<WorkProjectSeriesSchemaDto>) {
  const subjectCode =
    entity.workTaskType.knowledgeDomain?.shortCode ??
    entity.workTaskType.knowledgeDomain?.name ??
    entity.name;
  const backgroundColor = getShortCodeColor(subjectCode);
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
