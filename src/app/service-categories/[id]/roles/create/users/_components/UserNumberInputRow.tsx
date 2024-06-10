'use client';
import { KnowledgeLevelDto } from '@/api/dtos/KnowledgeLevelDtoSchema';
import {
  DtoStoreNumberInput,
  MergedDtoStoreNumberInputProps
} from '@/components/generic/DtoStoreNumberInput';
import { Chip } from '@nextui-org/chip';

export default function UserNumberInputRow(
  props: Omit<MergedDtoStoreNumberInputProps<UserRowState>, 'max' | 'min'>
) {
  const { entity } = props;
  return (
    <>
      <Chip>{entity.name}</Chip>
      <DtoStoreNumberInput {...props} min={0} max={300} step={1} />
    </>
  );
}

export type UserRowState = KnowledgeLevelDto & { howMany: number };
