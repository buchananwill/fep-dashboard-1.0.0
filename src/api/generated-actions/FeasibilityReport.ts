'use server';
import { generateBaseEndpointSet } from '../actions/template-base-endpoints';
import { FeasibilityReportDto } from '@/api/old-zod-schemas/FeasibilityReportDtoSchema';

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
} = generateBaseEndpointSet<FeasibilityReportDto, number>(
  '/api/v2/schedule/feasibilityReport'
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
};
