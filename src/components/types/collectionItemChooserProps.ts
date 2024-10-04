import { Identifier } from 'dto-stores';

export interface CollectionItemChooserProps {
  collectionId: Identifier;
  entityClass: string;
  referencedItemContextKeys: string[];
}
