import { Button } from '@nextui-org/button';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import React, { useCallback, useMemo } from 'react';
import {
  findChildOfType,
  replaceChildInTree
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/knowledgeLevelGroupFunctions';
import {
  Bundle,
  NestedWorkNode
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { FocusToEdit } from '@/components/generic/FocusToEdit';
import { KnowledgeDomainGroupEdit } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/KnowledgeDomainGroupEdit';
import { DeSelectRemovedId } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/editSunburstHooks';
import { SelectionSplitRef } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/EditButtonGroup';
import { EditWorkNodeDetails } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/EditWorkNodeDetails';
import { useModalTreeCopy } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/useModalTreeCopy';

const listenerKey = 'bundleModal';

function BundleModalContent({ onClose }: { onClose: () => void }) {
  const { modalCopy, setModalCopy, path, confirmChanges } =
    useModalTreeCopy(onClose);

  const bundle = useMemo(() => {
    const childOfType = findChildOfType(
      modalCopy as NestedWorkNode,
      path,
      'bundle'
    );
    if (childOfType?.type === 'bundle') return childOfType as Bundle;
    else return undefined;
  }, [path, modalCopy]);

  const setName = useCallback(
    (newName: string) => {
      if (!bundle) return;

      setModalCopy((prevCopy) =>
        replaceChildInTree(prevCopy, bundle?.path ?? '', {
          ...bundle,
          name: newName
        })
      );
    },
    [setModalCopy, bundle]
  );
  if (!bundle) return null;

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <FocusToEdit onValueChange={setName} value={bundle.name ?? ''}>
          {bundle.name ?? 'no name'}
        </FocusToEdit>
      </ModalHeader>
      <ModalBody></ModalBody>
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

export function EditBundleDetails(props: {
  deselectRemovedId: DeSelectRemovedId;
  selectionLength: number;
  selectionSplitRef: SelectionSplitRef;
}) {
  return <EditWorkNodeDetails {...props} modalContent={BundleModalContent} />;
}
