'use client';
import { NestedWorkNodeDiscriminator } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { useDeselectRemovedId } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/editSunburstHooks';
import React, { MutableRefObject, useMemo } from 'react';
import { useGlobalDispatch } from 'selective-context';
import { SelectionPathKey } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/SelectionController';
import BundleButtonGroup, {
  ButtonEditGroupProps
} from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/BundleButtonGroup';
import LeafEditGroup from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/LeafEditButtonGroup';
import LeafListButtonGroup from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/LeafListButtonGroup';
import KnowledgeDomainGroupButtons from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/KnowledgeDomainGroupButtons';

export type SelectionSplitRef = MutableRefObject<string[]>;
function EditButtonGroupInternal({
  groupTarget,
  selectionSplitRef,
  selectionLength
}: {
  groupTarget: NestedWorkNodeDiscriminator;
  selectionSplitRef: SelectionSplitRef;
  selectionLength: number;
}) {
  const { dispatchWithoutListen } = useGlobalDispatch(SelectionPathKey);
  const deselectRemovedId = useDeselectRemovedId(
    selectionSplitRef,
    dispatchWithoutListen
  );

  const Component = useMemo(() => {
    return ButtonGroups[groupTarget] ?? null;
  }, [groupTarget]);

  return (
    Component && (
      <Component
        selectionLength={selectionLength}
        deselectRemovedId={deselectRemovedId}
        selectionSplitRef={selectionSplitRef}
      />
    )
  );
}

export const EditButtonGroup = React.memo(EditButtonGroupInternal);

type ButtonGroupMap = {
  [Property in NestedWorkNodeDiscriminator]: (
    props: ButtonEditGroupProps
  ) => React.ReactNode;
};

const ButtonGroups: Partial<ButtonGroupMap> = {
  leaf: LeafEditGroup,
  leafList: LeafListButtonGroup,
  bundle: BundleButtonGroup,
  knowledgeDomainGroup: KnowledgeDomainGroupButtons
};
