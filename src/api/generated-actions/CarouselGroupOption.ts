'use server';
import { CarouselGroupOptionDto } from '../dtos/CarouselGroupOptionDtoSchema';
import { generateBaseEndpointSet } from '@/api/actions/template-base-endpoints';
import { generateIntersectionEndpointSet } from '@/api/actions/template-intersection-endpoints';

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
} = generateBaseEndpointSet<CarouselGroupOptionDto, number>(
  '/api/v2/carouselGroups/options'
);

const {
  getByRowIdListAndColumnIdList,
  getColumnIdList,
  getByRowIdList,
  getIntersectionTable
} = generateIntersectionEndpointSet<CarouselGroupOptionDto, string, string>(
  '/api/v2/carouselGroups/options'
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
  getDtoListByExampleList,
  getByRowIdListAndColumnIdList,
  getColumnIdList,
  getByRowIdList,
  getIntersectionTable
};
