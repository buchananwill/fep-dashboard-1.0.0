import { memo } from 'react';
import LeafNode from '@/components/react-flow/work-schema-node/LeafNode';
import CarouselOptionNode from '@/components/react-flow/work-schema-node/CarouselOptionNode';
import CarouselNode from '@/components/react-flow/work-schema-node/CarouselNode';
import CarouselGroupNode from '@/components/react-flow/work-schema-node/CarouselGroupNode';
import OpenNode from '@/components/react-flow/work-schema-node/OpenNode';

const OpenMemo = memo(OpenNode);
const LeafMemo = memo(LeafNode);
const CarouselOptionMemo = memo(CarouselOptionNode);
const CarouselMemo = memo(CarouselNode);
const CarouselGroupMemo = memo(CarouselGroupNode);

export const workSchemaNodeTypesUi = {
  OPEN: OpenMemo,
  LEAF: LeafMemo,
  CAROUSEL: CarouselMemo,
  SERIAL: LeafMemo,
  CAROUSEL_OPTION: CarouselOptionMemo,
  CAROUSEL_GROUP: CarouselGroupMemo
} as const;

export type WorkSchemaNodeType = keyof typeof workSchemaNodeTypesUi;
