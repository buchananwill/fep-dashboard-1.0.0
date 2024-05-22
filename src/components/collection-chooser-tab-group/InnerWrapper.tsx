import { Tab, Tabs } from '@nextui-org/tabs';
import { FC } from 'react';
import { CollectionItemChooserProps } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/_functions/collectionItemChooserProps';
import {
  ObjectPlaceholder,
  useSelectiveContextGlobalListener,
  useSelectiveContextListenerGroupGlobal
} from 'selective-context';
import { StringObjectRecord } from '@/api/string-object-record';
import { HasId } from '@/api/main';
import { HasNameDto } from '@/app/api/dtos/HasNameDtoSchema';

export interface InnerWrapperProps<T> {
  collectionEntityClass: string;
  collectionItemChooser: FC<CollectionItemChooserProps>;
  itemContextKeys: string[];
}

export default function InnerWrapper<T extends HasId & HasNameDto>({
  collectionItemChooser: ItemChooser,
  itemContextKeys,
  collectionEntityClass
}: InnerWrapperProps<T>) {
  const { currentState } = useSelectiveContextGlobalListener<
    StringObjectRecord<T>
  >({
    contextKey: `${collectionEntityClass}:stringMap`,
    initialValue: ObjectPlaceholder,
    listenerKey: 'innerWrapper'
  });

  return (
    <Tabs
      aria-label={'collection tabs'}
      size={'lg'}
      items={Object.values(currentState)}
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
