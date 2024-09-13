'use server';
import { WorkSchemaNodeAssignmentDto } from '@/api/generated-types/generated-types';
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
  WorkSchemaNodeAssignmentDto,
  number
>(
  '/api/v2/workProjectSeriesSchemas/bundleAssignments'
);


const {
          getByRowIdListAndColumnIdList,
          getDtoTableByRowIdList,
          getColumnIdList,
          getByRowIdList,
          getIntersectionTable
} = generateIntersectionEndpointSet<
  WorkSchemaNodeAssignmentDto,
  number,
  number
>(
  '/api/v2/workProjectSeriesSchemas/bundleAssignments'
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

