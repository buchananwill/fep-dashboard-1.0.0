import {
  bundleDepth,
  DeSelectRemovedId
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/editSunburstHooks';
import { SelectionSplitRef } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/EditButtonGroup';
import { Button, Modal } from '@mantine/core';
import React, { ReactNode } from 'react';
import { useDisclosure } from '@mantine/hooks';

export function EditWorkNodeDetails({
  selectionLength,
  modalContent: ModalContentProp
}: {
  deselectRemovedId: DeSelectRemovedId;
  selectionLength: number;
  selectionSplitRef: SelectionSplitRef;
  modalContent: (props: { onClose: () => void }) => ReactNode;
}) {
  const [opened, { open, close }] = useDisclosure();

  const path = '';

  return (
    <>
      <Button
        onClick={open}
        className={'rounded-none first:rounded-l-xl last:rounded-r-xl'}
        disabled={selectionLength < bundleDepth}
      >
        Edit
      </Button>
      <Modal opened={opened} onClose={close}>
        <ModalContentProp onClose={close} />
      </Modal>
    </>
  );
}
