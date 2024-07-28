import { getWithoutBody } from './template-actions';
import { constructUrl } from './template-base-endpoints';

export interface WithTypeEndpointSet<T> {
  getByTypeIdList: (typeIdList: number[]) => Promise<T[]>;
}

async function getByTypeIdList<T>(idList: number[], url: string): Promise<T[]> {
  const idParamList = idList.join('&id=');
  return getWithoutBody<T[]>(`${url}/listByType?id=${idParamList}`);
}

export function generateWithTypeEndpointSet<T>(
  path: string | string[]
): WithTypeEndpointSet<T> {
  const generatedUrl = constructUrl(path);

  return {
    getByTypeIdList: (idList: number[]) =>
      getByTypeIdList<T>(idList, generatedUrl)
  };
}
