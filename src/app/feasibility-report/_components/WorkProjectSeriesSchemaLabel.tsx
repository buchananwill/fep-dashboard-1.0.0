import { BaseLazyDtoUiProps } from 'dto-stores';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { HasNameDto } from '@/api/dtos/HasNameDtoSchema';
import { HasId } from '@/api/types';
import { GenericDivProps } from '@/react-flow/components/nodes/BaseEditableNode';

export function WorkProjectSeriesSchemaLabel({
  entity
}: BaseLazyDtoUiProps<WorkProjectSeriesSchemaDto>) {
  return entity.name;
}
export function NamedEntityLabel({
  entity
}: GenericDivProps & BaseLazyDtoUiProps<HasNameDto & HasId>) {
  return <div>{entity.name}</div>;
}
