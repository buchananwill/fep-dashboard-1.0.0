'use client';
import CycleSubspanGroupEdit, {
  CycleSubspanGroupEditDto
} from '@/app/cycles/edit/[id]/cycleSubspanGroups/_components/CycleSubspanGroupEdit';
import {
  DtoComponentWrapperListView,
  DtoComponentWrapperListViewProps
} from '@/components/generic/DtoComponentWrapperListView';

export default function UiWrapper(
  props: Omit<
    DtoComponentWrapperListViewProps<CycleSubspanGroupEditDto>,
    'eachAs'
  >
) {
  return (
    <DtoComponentWrapperListView {...props} eachAs={CycleSubspanGroupEdit} />
  );
}
