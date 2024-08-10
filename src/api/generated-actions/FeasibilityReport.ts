'use server';
import { FeasibilityReportDto } from '@/api/zod-schemas/FeasibilityReportDtoSchema';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';

const {
getPage,
  getAll,
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
  FeasibilityReportDto,
  number
>(
  '/api/v2/schedule/feasibilityReport'
);


export {
    getPage,
  getAll,
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

