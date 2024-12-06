'use server';
import { BuildMetricDto } from '@/api/generated-types/generated-types_';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';

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
  BuildMetricDto,
  number
>(
  '/api/v3/build-metric'
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

}

