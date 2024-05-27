'use client';
import CycleSubspanGroupEdit, {
  CycleSubspanGroupEditDto
} from '@/app/cycles/edit/[id]/cycleSubspanGroups/_components/CycleSubspanGroupEdit';
import {
  DtoUiWrapperListView,
  DtoUiWrapperListViewProps
} from '@/components/generic/DtoUiWrapperListView';
import { JSX } from 'react/jsx-runtime';
import IntrinsicAttributes = JSX.IntrinsicAttributes;

export default function UiWrapper(
  props: Omit<
    DtoUiWrapperListViewProps<CycleSubspanGroupEditDto, IntrinsicAttributes>,
    'renderAs'
  >
) {
  return <DtoUiWrapperListView {...props} renderAs={CycleSubspanGroupEdit} />;
}
