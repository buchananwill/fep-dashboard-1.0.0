import { Modal, ModalContent, ModalProps } from '@nextui-org/react';

import { ReactNode } from 'react';

import {
  ComponentUndefined,
  fallback,
  GraphSelectiveContextKeys,
  MemoizedFunction,
  useGraphDispatchAndListener,
  useGraphListener
} from 'react-d3-force-wrapper';

export type NodeDetailsModalProps = Pick<ModalProps, 'className'>;

const listenerKey = 'modal';
export function NodeDetailsModal(nodeDetailsModalProps: NodeDetailsModalProps) {
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

  return (
    <Modal
      {...nodeDetailsModalProps}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior={'inside'}
      size={'5xl'}
    >
      <ModalContent className={'p-2'}>
        {(onClose) => (
          <>
            {NodeModalContent === undefined ? (
              <ComponentUndefined onClose={onClose} />
            ) : (
              <NodeModalContent onClose={onClose} />
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
