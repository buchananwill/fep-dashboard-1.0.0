'use server';
import { CarouselGroupOptionDto } from '@/api/generated-types/generated-types_';
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
  CarouselGroupOptionDto,
  number
>(
  '/api/v3/carousel-group-option'
);


const {
          getByRowIdListAndColumnIdList,
          getDtoTableByRowIdList,
          getColumnIdList,
          getByRowIdList,
          getIntersectionTable
} = generateIntersectionEndpointSet<
  CarouselGroupOptionDto,
  number,
  number
>(
  '/api/v2/carouselGroups/options'
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

