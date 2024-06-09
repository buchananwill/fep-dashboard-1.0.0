'use client';
import { KnowledgeLevelDto } from '@/api/dtos/KnowledgeLevelDtoSchema';
import {
  DtoStoreNumberInput,
  MergedDtoStoreNumberInputProps
} from '@/components/generic/DtoStoreNumberInput';
import { Chip } from '@nextui-org/chip';

export default function UserNumberInputRow(
  props: MergedDtoStoreNumberInputProps<UserRowState>
) {
  const { entity } = props;
  return (
    <>
      <Chip>{entity.name}</Chip>
      <DtoStoreNumberInput {...props} />
    </>
  );
}

export type UserRowState = KnowledgeLevelDto & { userCount: number };
