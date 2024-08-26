'use client';
import NestedWorkNodeChildSelector from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/NestedWorkNodeChildSelector';
import { usePathSelectionListener } from '@/components/work-schema-nodes/nivo-sunburst-chart/create/selection/usePathSelectionListener';
import { DiscriminatorOrder } from '@/components/work-schema-nodes/nivo-sunburst-chart/nested-lesson-bundle-data';

export default function Selectors() {
  const [path, splitSelectionPath] = usePathSelectionListener('selectors');

  console.log(path, splitSelectionPath);

  return (
    <div className={'flex flex-col gap-2'}>
      {DiscriminatorOrder.map((discriminator, index) => {
        if (index === 0) return null;
        return (
          <NestedWorkNodeChildSelector
            selectionPath={path}
            splittedPath={splitSelectionPath}
            discriminator={discriminator}
            discriminatorIndex={index}
            placeholder={discriminator}
            key={index}
            aria-label={`select child of ${discriminator}`}
          />
        );
      })}
    </div>
  );
}
