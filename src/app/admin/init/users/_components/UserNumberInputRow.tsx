'use client';
import { KnowledgeLevelDto } from '@/api/generated-types/generated-types';
import {
  DtoStoreNumberInput,
  MergedDtoStoreNumberInputProps
} from '@/components/generic/DtoStoreNumberInput';
import { Badge } from '@mantine/core';

export default function UserNumberInputRow(
  props: Omit<MergedDtoStoreNumberInputProps<UserRowState>, 'max' | 'min'>
) {
  const { entity } = props;
  return (
    <>
      <Badge>{entity.name}</Badge>
      <DtoStoreNumberInput {...props} min={0} max={300} step={1} />
    </>
  );
}

export type UserRowState = KnowledgeLevelDto & { howMany: number };
