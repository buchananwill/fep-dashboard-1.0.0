'use client';
import CycleSubspanGroupEdit, {
  CycleSubspanGroupEditDto
} from '@/app/cycles/edit/[id]/cycleSubspanGroups/_components/CycleSubspanGroupEdit';
import { JSX } from 'react/jsx-runtime';
import { DtoUiListSome } from 'dto-stores';
import { useMemo } from 'react';
import IntrinsicAttributes = JSX.IntrinsicAttributes;
import { uiWrapperListViewProps } from '@/types';

export default function CycleSubspanGroupUiWrapper({
  entityList,
  ...props
}: Omit<
  uiWrapperListViewProps<CycleSubspanGroupEditDto, IntrinsicAttributes>,
  'renderAs'
>) {
  const entityIdList = useMemo(() => {
    return entityList.map((dto) => dto.id);
  }, [entityList]);

  return (
    <DtoUiListSome
      entityIdList={entityIdList}
      {...props}
      renderAs={CycleSubspanGroupEdit}
    />
  );
}
