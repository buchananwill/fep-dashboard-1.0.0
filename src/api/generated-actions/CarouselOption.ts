'use server';
import { CarouselOptionDto } from '@/api/generated-types/generated-types';
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
  CarouselOptionDto,
  number
>(
  '/api/v2/carouselGroups/carousels/options'
);


const {
          getByRowIdListAndColumnIdList,
          getDtoTableByRowIdList,
          getColumnIdList,
          getByRowIdList,
          getIntersectionTable
} = generateIntersectionEndpointSet<
  CarouselOptionDto,
  string,
  number
>(
  '/api/v2/carouselGroups/carousels/options'
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

