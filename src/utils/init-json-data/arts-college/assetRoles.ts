import { AssetDto, AssetTypeDto } from '@/api/generated-types/generated-types';
import { isNotUndefined } from '@/api/main';
import { assetPostRequests } from '@/utils/init-json-data/arts-college/dataToTransform';

const assetType: AssetTypeDto = {
  name: 'room',
  id: 1,
  isMoveable: false
};
const assets: AssetDto[] = [
  { name: '3', id: 1, type: assetType },
  { name: '3a', id: 2, type: assetType },
  { name: '3b', id: 3, type: assetType },
  { name: '8', id: 4, type: assetType },
  { name: '14', id: 5, type: assetType },
  { name: '16', id: 6, type: assetType }
];

export const assetRoles = assetPostRequests
  .map((personRole, index) => {
    if (index < assets.length)
      return { ...personRole, baseEntity: assets[index] };
    else return undefined;
  })
  .filter(isNotUndefined);
