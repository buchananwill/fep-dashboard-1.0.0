import { Tab, Tabs } from '@nextui-org/tabs';
import { FC, useMemo } from 'react';
import { CollectionItemChooserProps } from '@/components/types/collectionItemChooserProps';
import { useGlobalListener } from 'selective-context';
import { HasId } from '@/api/types';
import { initialMap } from '@/app/_literals';
import { HasName } from 'react-d3-force-wrapper';

export interface InnerWrapperProps {
  collectionEntityClass: string;
  collectionItemChooser: FC<CollectionItemChooserProps>;
  itemContextKeys: string[];
}

export default function InnerWrapper<T extends HasId & HasName>({
  collectionItemChooser: ItemChooser,
  itemContextKeys,
  collectionEntityClass
}: InnerWrapperProps) {
  const { currentState } = useGlobalListener<Map<string, T>>({
    contextKey: `${collectionEntityClass}:masterMap`,
    initialValue: initialMap as Map<string, T>,
    listenerKey: 'innerWrapper'
  });

  const items = useMemo(() => {
    return [...currentState.values()];
  }, [currentState]);

  return (
    <Tabs
      aria-label={'collection tabs'}
      size={'lg'}
      items={items}
      isVertical={true}
      destroyInactiveTabPanel={false}
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
