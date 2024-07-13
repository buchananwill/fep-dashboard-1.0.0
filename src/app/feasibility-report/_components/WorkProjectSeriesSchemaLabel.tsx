import {
  BaseLazyDtoUiProps,
  LazyDtoUiWrapper,
  LazyDtoUiWrapperProps
} from 'dto-stores';

import { HasId } from '@/api/types';
import { GenericDivProps } from '@/react-flow/components/nodes/BaseEditableNode';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { HasNameDto } from '@/api/dtos/HasNameDtoSchema';

export function WorkProjectSeriesSchemaLabel({
  entity
}: BaseLazyDtoUiProps<WorkProjectSeriesSchemaDto>) {
  return entity.name;
}

export function WorkProjectSeriesSchemaCode({
  entity
}: BaseLazyDtoUiProps<WorkProjectSeriesSchemaDto>) {
  return entity.shortCode ?? entity.name.substring(0, 4);
}
export function NamedEntityLabel({
  entity
}: GenericDivProps & BaseLazyDtoUiProps<HasNameDto & HasId>) {
  return <div>{entity.name}</div>;
}

export function NamedEntityLabelWrapper(
  props: Omit<
    LazyDtoUiWrapperProps<HasNameDto & HasId, GenericDivProps>,
    'renderAs' | 'whileLoading'
  >
) {
  return (
    <LazyDtoUiWrapper
      renderAs={NamedEntityLabel}
      {...props}
      whileLoading={() => '...loading'}
    />
  );
}
