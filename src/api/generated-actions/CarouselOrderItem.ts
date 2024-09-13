'use server';
import { CarouselOrderItemDto } from '@/api/generated-types/generated-types';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { generateIntersectionEndpointSet } from '../actions/template-intersection-endpoints';

const {
getPage,
getAll,
getIdList,
deleteIdList,
postList,
putList,
getOne,
postOne,
putOne,
deleteOne,
getDtoListByBodyList,
getDtoListByParamList,
getDtoListByExampleList
} = generateBaseEndpointSet<
  CarouselOrderItemDto,
  number
>(
  '/api/v2/carouselGroups/orders/items'
);


const {
          getByRowIdListAndColumnIdList,
          getDtoTableByRowIdList,
          getColumnIdList,
          getByRowIdList,
          getIntersectionTable
} = generateIntersectionEndpointSet<
  CarouselOrderItemDto,
  string,
  number
>(
  '/api/v2/carouselGroups/orders/items'
);

export {
    getPage,
getAll,
getIdList,
deleteIdList,
postList,
putList,
getOne,
postOne,
putOne,
deleteOne,
getDtoListByBodyList,
getDtoListByParamList,
getDtoListByExampleList
,           getByRowIdListAndColumnIdList,
          getDtoTableByRowIdList,
          getColumnIdList,
          getByRowIdList,
          getIntersectionTable

}

