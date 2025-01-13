import { BaseDtoUiProps, BaseLazyDtoUiProps } from 'dto-stores';

import { HasId } from '@/api/types';
import { GenericDivProps } from '@/components/react-flow/generic/components/nodes/BaseEditableNode';
import {
  HasNameDto,
  WorkTypeDto
} from '@/api/generated-types/generated-types_';
import clsx from 'clsx';
import { usePopoverSingleton } from '@/components/tooltip/usePopoverSingleton';
import { TooltipMemo } from '@/components/tooltip/SimpleTooltip';
import { getShortCodeColor } from '@/functions/getShortcodeColor';
import { SetOptional, SetRequired } from 'type-fest';
import { parseToCssRgba } from '@/functions/parseToCssRgba';

export function EntityWithWorkTypeShortCode({
  entity
}: SetRequired<
  Partial<BaseLazyDtoUiProps<HasId & { workType: WorkTypeDto }>>,
  'entity'
>) {
  const subjectCode =
    entity.workType.knowledgeDomain?.shortCode ??
    entity.workType.knowledgeDomain?.name ??
    entity.workType.workTypeCategory.name;
  const cssRgba = parseToCssRgba(entity.workType.knowledgeDomain?.color);
  return (
    <div
      className={clsx(
        'transition-colors-opacity pointer-events-none flex h-full w-full items-center justify-center duration-700'
      )}
      style={{ backgroundColor: cssRgba }}
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
  const tooltip = usePopoverSingleton(<TooltipMemo text={entity.name} />);
  return (
    <div {...tooltip} {...divProps}>
      {entity.name}
    </div>
  );
}
