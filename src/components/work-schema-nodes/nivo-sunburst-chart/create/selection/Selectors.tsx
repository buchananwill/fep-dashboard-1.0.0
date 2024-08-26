'use client';
import NestedWorkNodeChildSelector from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/NestedWorkNodeChildSelector';
import { usePathSelectionListener } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/usePathSelectionListener';
import { DiscriminatorOrder } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';
import { EditButtonGroup } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/editing/EditButtonGroup';
import { useRefUpdatedEachRender } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/useRefUpdatedEachRender';

export default function Selectors() {
  const [path, splitSelectionPath] = usePathSelectionListener('selectors');
  const selectionLength = splitSelectionPath.length;
  const splitSelectionRef = useRefUpdatedEachRender(splitSelectionPath);

  return (
    <>
      {DiscriminatorOrder.map((discriminator, index) => {
        if (index === 0) return null;
        return (
          <div key={index} className={'grid grid-cols-2 gap-2'}>
            <div className={'flex'}>
              <EditButtonGroup
                groupTarget={discriminator}
                selectionSplitRef={splitSelectionRef}
                selectionLength={selectionLength}
              />
            </div>
            <NestedWorkNodeChildSelector
              selectionPath={path}
              splittedPath={splitSelectionPath}
              discriminator={discriminator}
              discriminatorIndex={index}
              placeholder={discriminator}
              aria-label={`select child of ${discriminator}`}
            />
          </div>
        );
      })}
    </>
  );
}
