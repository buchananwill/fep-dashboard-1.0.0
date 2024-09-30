import { Button } from '@nextui-org/button';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import React, { useCallback, useMemo } from 'react';
import {
  findChildOfType,
  replaceChildInTree
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/knowledgeLevelGroupFunctions';
import {
  Bundle,
  KnowledgeDomainGroup,
  NestedWorkNode
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { FocusToEdit } from '@/components/generic/FocusToEdit';
import { KnowledgeDomainGroupEdit } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/KnowledgeDomainGroupEdit';
import { DeSelectRemovedId } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/editSunburstHooks';
import { SelectionSplitRef } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/EditButtonGroup';
import { EditWorkNodeDetails } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/EditWorkNodeDetails';
import { useModalTreeCopy } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/useModalTreeCopy';
import { getStartCaseDomainAlias } from '@/api/getDomainAlias';

const listenerKey = 'bundleModal';

function KnowledgeDomainModalContent({ onClose }: { onClose: () => void }) {
  const { modalCopy, setModalCopy, path, confirmChanges } =
    useModalTreeCopy(onClose);

  const knowledgeDomainGroup = useMemo(() => {
    const childOfType = findChildOfType(
      modalCopy as NestedWorkNode,
      path,
      'knowledgeDomainGroup'
    );
    if (childOfType?.type === 'knowledgeDomainGroup')
      return childOfType as KnowledgeDomainGroup;
    else return undefined;
  }, [path, modalCopy]);

  // const setName = useCallback(
  //   (newName: string) => {
  //     if (!knowledgeDomainGroup) return;
  //
  //     setModalCopy((prevCopy) =>
  //       replaceChildInTree(prevCopy, knowledgeDomainGroup?.path ?? '', {
  //         ...knowledgeDomainGroup,
  //         name: newName
  //       })
  //     );
  //   },
  //   [setModalCopy, knowledgeDomainGroup]
  // );
  if (!knowledgeDomainGroup) return null;

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        {getStartCaseDomainAlias('knowledgeDomainGroup')}
      </ModalHeader>
      <ModalBody>
        {
          <KnowledgeDomainGroupEdit
            dispatch={setModalCopy}
            currentTree={modalCopy}
            currentPath={path}
            knowledgeDomainGroup={knowledgeDomainGroup}
          />
        }
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

export function EditKnowledgeDomainDetails(props: {
  deselectRemovedId: DeSelectRemovedId;
  selectionLength: number;
  selectionSplitRef: SelectionSplitRef;
}) {
  return (
    <EditWorkNodeDetails
      {...props}
      modalContent={KnowledgeDomainModalContent}
    />
  );
}
