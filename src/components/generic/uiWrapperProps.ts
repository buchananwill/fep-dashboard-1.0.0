import { HasId } from '@/api/main';
import { DtoUiArrayProps } from 'dto-stores';

export type uiWrapperListViewProps<T extends HasId, Props> = DtoUiArrayProps<
  T,
  Props
> & { entityList: T[] };
