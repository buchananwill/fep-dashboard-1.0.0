import { memo } from 'react';
import LeafNode from '@/components/react-flow/work-schema-node/components/LeafNode';
import CarouselOptionNode from '@/components/react-flow/work-schema-node/components/CarouselOptionNode';
import CarouselNode from '@/components/react-flow/work-schema-node/components/CarouselNode';
import CarouselGroupNode from '@/components/react-flow/work-schema-node/components/CarouselGroupNode';
import OpenNode from '@/components/react-flow/work-schema-node/components/OpenNode';

const OpenMemo = memo(OpenNode);
const LeafMemo = memo(LeafNode);
const CarouselOptionMemo = memo(CarouselOptionNode);
const CarouselMemo = memo(CarouselNode);
const CarouselGroupMemo = memo(CarouselGroupNode);

export const workSchemaNodeTypesUi = {
  OPEN: OpenMemo,
  LEAF: LeafNode,
  CAROUSEL: CarouselMemo,
  SERIAL: OpenMemo,
  CAROUSEL_OPTION: CarouselOptionMemo,
  CAROUSEL_GROUP: CarouselGroupMemo
} as const;

export type WorkSchemaNodeType = keyof typeof workSchemaNodeTypesUi;
