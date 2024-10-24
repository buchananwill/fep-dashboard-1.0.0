import {
  bundleDepth,
  DeSelectRemovedId
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/editSunburstHooks';
import { SelectionSplitRef } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/EditButtonGroup';
import { useDisclosure } from '@nextui-org/use-disclosure';
import { Button } from '@mantine/core';
import { Modal, ModalContent } from '@nextui-org/modal';
import React, { ReactNode } from 'react';

export function EditWorkNodeDetails({
  selectionLength,
  modalContent: ModalContentProp
}: {
  deselectRemovedId: DeSelectRemovedId;
  selectionLength: number;
  selectionSplitRef: SelectionSplitRef;
  modalContent: (props: { onClose: () => void }) => ReactNode;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const path = '';

  return (
    <>
      <Button
        onClick={onOpen}
        className={'rounded-none first:rounded-l-xl last:rounded-r-xl'}
        disabled={selectionLength < bundleDepth}
      >
        Edit
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => <ModalContentProp onClose={onClose} />}
        </ModalContent>
      </Modal>
    </>
  );
}
