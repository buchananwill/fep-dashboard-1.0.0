import {
  bundleDepth,
  DeSelectRemovedId
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/editSunburstHooks';
import { SelectionSplitRef } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/EditButtonGroup';
import { useDisclosure } from '@nextui-org/use-disclosure';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/modal';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useGlobalDispatchAndListener } from 'selective-context';
import {
  klsgTemplate,
  KnowledgeLevelSeriesGroupContextKey
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/KnowledgeLevelSeriesGroupManager';
import { usePathSelectionListener } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/usePathSelectionListener';
import { findChildOfType } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/knowledgeLevelGroupFunctions';
import {
  Bundle,
  KnowledgeLevelSeriesGroup,
  NestedWorkNode
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { FocusToEdit } from '@/components/generic/FocusToEdit';
import { KnowledgeDomainGroupEdit } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/KnowledgeDomainGroupEdit';
import { useRefUpdatedEachRender } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/useRefUpdatedEachRender';

const listenerKey = 'bundleModal';

function BundleModalContent({ onClose }: { onClose: () => void }) {
  const { currentState, dispatchWithoutControl } = useGlobalDispatchAndListener(
    {
      contextKey: KnowledgeLevelSeriesGroupContextKey,
      listenerKey: listenerKey,
      initialValue: klsgTemplate
    }
  );
  const [modalCopy, setModalCopy] = useState(
    currentState as KnowledgeLevelSeriesGroup
  );
  const mutableRefObject = useRefUpdatedEachRender(modalCopy);

  const [path, splittedPath] = usePathSelectionListener(listenerKey);
  const bundle = useMemo(() => {
    const childOfType = findChildOfType(
      modalCopy as NestedWorkNode,
      path,
      'bundle'
    );
    if (childOfType?.type === 'bundle') return childOfType as Bundle;
    else return undefined;
  }, [path, modalCopy]);
  const [name, setName] = useState(bundle?.name ?? '');

  const confirmChanges = useCallback(() => {
    dispatchWithoutControl(mutableRefObject.current);
    onClose();
  }, [dispatchWithoutControl, mutableRefObject, onClose]);

  if (!bundle) return null;

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <FocusToEdit onValueChange={setName} value={name}>
          {name}
        </FocusToEdit>
      </ModalHeader>
      <ModalBody>
        {bundle.children.map((child) => (
          <KnowledgeDomainGroupEdit
            key={child.path}
            dispatch={setModalCopy}
            currentTree={modalCopy}
            currentPath={path}
            knowledgeDomainGroup={child}
          />
        ))}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Cancel
        </Button>
        <Button color="primary" onPress={confirmChanges}>
          Confirm
        </Button>
      </ModalFooter>
    </>
  );
}

export function EditBundleDetails({
  selectionLength
}: {
  deselectRemovedId: DeSelectRemovedId;
  selectionLength: number;
  selectionSplitRef: SelectionSplitRef;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const path = '';

  return (
    <>
      <Button
        onPress={onOpen}
        className={'rounded-none first:rounded-l-xl last:rounded-r-xl'}
        isDisabled={selectionLength < bundleDepth}
      >
        Edit
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => <BundleModalContent onClose={onClose} />}
        </ModalContent>
      </Modal>
    </>
  );
}
