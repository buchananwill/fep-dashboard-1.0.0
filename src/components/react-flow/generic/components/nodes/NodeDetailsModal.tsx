import { ReactNode, useCallback } from 'react';

import {
  ComponentUndefined,
  fallback,
  GraphSelectiveContextKeys,
  MemoizedFunction,
  useGraphDispatchAndListener,
  useGraphListener
} from 'react-d3-force-wrapper';
import { Modal } from '@mantine/core';

const listenerKey = 'modal';
export function NodeDetailsModal(nodeDetailsModalProps: {}) {
  const { currentState: isOpen, dispatchWithoutControl: onOpenChange } =
    useGraphDispatchAndListener(
      GraphSelectiveContextKeys.nodeDetailsModalOpen,
      listenerKey,
      false
    );

  const {
    currentState: { memoizedFunction: NodeModalContent }
  } = useGraphListener<MemoizedFunction<{ onClose: () => void }, ReactNode>>(
    GraphSelectiveContextKeys.nodeModalContent,
    listenerKey,
    fallback
  );

  const onClose = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  return (
    <Modal
      size={'auto'}
      {...nodeDetailsModalProps}
      opened={isOpen}
      onClose={onClose}
    >
      <div className={'p-2'}>
        <>
          {NodeModalContent === undefined ? (
            <ComponentUndefined onClose={onClose} />
          ) : (
            <NodeModalContent onClose={onClose} />
          )}
        </>
      </div>
    </Modal>
  );
}
