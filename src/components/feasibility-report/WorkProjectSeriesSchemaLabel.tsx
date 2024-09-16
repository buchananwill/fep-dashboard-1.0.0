import {
  BaseDtoUiProps,
  BaseLazyDtoUiProps,
  LazyDtoUiWrapper,
  LazyDtoUiWrapperProps
} from 'dto-stores';

import { HasId } from '@/api/types';
import { GenericDivProps } from '@/components/react-flow/generic/components/nodes/BaseEditableNode';
import { HasNameDto } from '@/api/zod-schemas/HasNameDtoSchema';
import clsx from 'clsx';
import { useFloatingTooltip } from '@/components/tooltip/useFloatingTooltip';
import { TooltipMemo } from '@/components/tooltip/SimpleTooltip';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';
import { getShortCodeColor } from '@/functions/getShortcodeColor';
import { SetOptional } from 'type-fest';

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
  dispatchWithoutControl,
  entityClass,
  dispatchDeletion,
  deleted,
  ...divProps
}: GenericDivProps &
  SetOptional<
    BaseDtoUiProps<HasNameDto & HasId>,
    'deleted' | 'dispatchDeletion'
  >) {
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
