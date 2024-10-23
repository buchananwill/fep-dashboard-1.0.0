import { BaseDtoUiProps, BaseLazyDtoUiProps } from 'dto-stores';

import { HasId } from '@/api/types';
import { GenericDivProps } from '@/components/react-flow/generic/components/nodes/BaseEditableNode';
import {
  HasNameDto,
  WorkTaskTypeDto
} from '@/api/generated-types/generated-types';
import clsx from 'clsx';
import { useFloatingTooltip } from '@/components/tooltip/useFloatingTooltip';
import { TooltipMemo } from '@/components/tooltip/SimpleTooltip';
import { getShortCodeColor } from '@/functions/getShortcodeColor';
import { SetOptional, SetRequired } from 'type-fest';

export function EntityWithWorkTaskTypeShortCode({
  entity
}: SetRequired<
  Partial<BaseLazyDtoUiProps<HasId & { workTaskType: WorkTaskTypeDto }>>,
  'entity'
>) {
  const subjectCode =
    entity.workTaskType.knowledgeDomain?.shortCode ??
    entity.workTaskType.knowledgeDomain?.name ??
    entity.workTaskType.name;
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
