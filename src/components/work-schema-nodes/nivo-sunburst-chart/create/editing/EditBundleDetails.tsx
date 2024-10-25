import { Button } from '@mantine/core';
import React, { ChangeEvent, useCallback, useMemo } from 'react';
import {
  findChildOfType,
  replaceChildInTree
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/knowledgeLevelGroupFunctions';
import {
  Bundle,
  NestedWorkNode
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { FocusToEdit } from '@/components/generic/FocusToEdit';
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
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!bundle) return;

      setModalCopy((prevCopy) =>
        replaceChildInTree(prevCopy, bundle?.path ?? '', {
          ...bundle,
          name: e.target.value
        })
      );
    },
    [setModalCopy, bundle]
  );
  if (!bundle) return null;

  return (
    <>
      <div className="flex flex-col gap-1">
        <FocusToEdit onChange={setName} value={bundle.name ?? ''}>
          {bundle.name ?? 'no name'}
        </FocusToEdit>
      </div>
      <div></div>
      <div>
        <Button color="danger" variant="light" onClick={onClose}>
          Cancel
        </Button>
        <Button color="primary" onClick={confirmChanges}>
          Confirm
        </Button>
      </div>
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
