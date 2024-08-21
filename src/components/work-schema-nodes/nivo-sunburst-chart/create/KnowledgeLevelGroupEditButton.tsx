import {
  knowledgeLevelGroupContextKey,
  KnowledgeLevelGroupTemplate
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelGroupManager';
import { useGlobalDispatch } from 'selective-context';
import { SetStateAction, useCallback } from 'react';
import { Button, ButtonProps } from '@nextui-org/button';
import clsx from 'clsx';

export type KnowledgeLevelGroupProducer =
  SetStateAction<KnowledgeLevelGroupTemplate>;

export default function KnowledgeLevelGroupEditButton({
  editCommand,
  children,
  className,
  ...buttonProps
}: { editCommand: KnowledgeLevelGroupProducer } & Omit<
  ButtonProps,
  'onPress'
>) {
  const { dispatchWithoutListen: dispatch } =
    useGlobalDispatch<KnowledgeLevelGroupTemplate>(
      knowledgeLevelGroupContextKey
    );

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
