import { Button } from '@mantine/core';
import React, { useMemo } from 'react';
import { findChildOfType } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/knowledgeLevelGroupFunctions';
import {
  KnowledgeDomainGroup,
  NestedWorkNode
} from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
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
      <div className="flex flex-col gap-1">
        {getStartCaseDomainAlias('knowledgeDomainGroup')}
      </div>
      <div className={'overflow-visible'}>
        {
          <KnowledgeDomainGroupEdit
            dispatch={setModalCopy}
            currentTree={modalCopy}
            currentPath={path}
            knowledgeDomainGroup={knowledgeDomainGroup}
          />
        }
      </div>
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
