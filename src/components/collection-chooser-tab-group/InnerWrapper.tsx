import { Tab, Tabs } from '@nextui-org/tabs';
import { FC } from 'react';
import { CollectionItemChooserProps } from '@/components/collectionItemChooserProps';
import { useGlobalListener } from 'selective-context';
import { HasNameDto } from '@/api/zod-schemas/HasNameDtoSchema';
import { HasUuid } from '@/api/types';
import { initialMap } from '@/app/_literals';

export interface InnerWrapperProps {
  collectionEntityClass: string;
  collectionItemChooser: FC<CollectionItemChooserProps>;
  itemContextKeys: string[];
}

export default function InnerWrapper<T extends HasUuid & HasNameDto>({
  collectionItemChooser: ItemChooser,
  itemContextKeys,
  collectionEntityClass
}: InnerWrapperProps) {
  const { currentState } = useGlobalListener<Map<string, T>>({
    contextKey: `${collectionEntityClass}:masterMap`,
    initialValue: initialMap as Map<string, T>,
    listenerKey: 'innerWrapper'
  });

  return (
    <Tabs
      aria-label={'collection tabs'}
      size={'lg'}
      items={[...currentState.values()]}
      isVertical={true}
    >
      {(item) => (
        <Tab key={item.id} title={item.name}>
          <div className={'flex'}>
            <ItemChooser
              collectionId={item.id}
              entityClass={collectionEntityClass}
              referencedItemContextKeys={itemContextKeys}
            />
          </div>
        </Tab>
      )}
    </Tabs>
  );
}
