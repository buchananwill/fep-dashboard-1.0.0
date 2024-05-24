import { Tab, Tabs } from '@nextui-org/tabs';
import { FC } from 'react';
import { CollectionItemChooserProps } from '@/app/service-categories/[id]/[levelOrdinal]/bundles/_functions/collectionItemChooserProps';
import { useGlobalListener } from 'selective-context';
import { HasUuid } from '@/api/main';
import { HasNameDto } from '@/api/dtos/HasNameDtoSchema';
import { initialMap } from '@/components/react-flow/organization/OrganizationDetailsContent';

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

  console.log(currentState);

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
