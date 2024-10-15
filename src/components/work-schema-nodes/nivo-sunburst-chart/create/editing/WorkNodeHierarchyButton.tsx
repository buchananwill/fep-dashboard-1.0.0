import { KnowledgeLevelSeriesGroupContextKey } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import { useGlobalDispatch } from 'selective-context';
import React, { SetStateAction, useCallback } from 'react';
import { Button, ButtonProps } from '@nextui-org/button';
import clsx from 'clsx';
import { WorkNodeHierarchy } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export type WorkNodeHierarchyProducer = SetStateAction<WorkNodeHierarchy>;

export default function WorkNodeHierarchyButton({
  editCommand,
  children,
  className,
  ...buttonProps
}: { editCommand: WorkNodeHierarchyProducer } & Pick<
  ButtonProps,
  'className' | 'children' | 'isDisabled'
>) {
  const { dispatchWithoutListen: dispatch } =
    useGlobalDispatch<WorkNodeHierarchy>(KnowledgeLevelSeriesGroupContextKey);

  const onPress = useCallback(() => {
    dispatch(editCommand);
  }, [editCommand, dispatch]);

  return (
    <Button
      {...buttonProps}
      onPress={onPress}
      className={clsx(
        className,
        'rounded-none first:rounded-l-xl last:rounded-r-xl'
      )}
    >
      {children}
    </Button>
  );
}
export const MemoEditButton = React.memo(WorkNodeHierarchyButton);
