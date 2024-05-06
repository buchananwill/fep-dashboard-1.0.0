'use server';
import { CarouselOrderItemDto } from '../dtos/CarouselOrderItemDtoSchema';
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
} = generateBaseEndpointSet<CarouselOrderItemDto, number>(
  '/api/v2/carousels/orders/items'
);

const {
  getByRowIdListAndColumnIdList,
  getColumnIdList,
  getByRowIdList,
  getIntersectionTable
} = generateIntersectionEndpointSet<CarouselOrderItemDto, string, string>(
  '/api/v2/carousels/orders/items'
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
