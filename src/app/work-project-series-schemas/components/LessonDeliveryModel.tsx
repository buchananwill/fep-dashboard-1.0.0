'use client';
import { DtoUiComponentProps } from 'dto-stores';
import { isNotUndefined } from '../../api/main';
import { AdjustAllocation } from './AdjustAllocation';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Button } from '@nextui-org/button';
import { TwoStageClick } from '@/components/generic/TwoStageClick';
import { DtoStoreStringValueEdit } from '@/components/generic/DtoStoreStringValueEdit';
import React from 'react';
import { EntityNamesMap } from '@/app/api/entity-names-map';
import RenameModal from '@/components/modals/RenameModal';
import { useRenameEntity } from '@/components/modals/useRenameEntity';

export const LessonDeliveryModel = (
  props: DtoUiComponentProps<WorkProjectSeriesSchemaDto>
) => {
  const {
    entity: model,
    deleted,
    dispatchWithoutControl,
    dispatchDeletion,
    entityClass
  } = props;

  const renameEntityProps = useRenameEntity(
    entityClass,
    model,
    'curriculumDeliveryModel',
    dispatchWithoutControl
  );

  return (
    <div className={'grid grid-cols-4 items-center'}>
      {/*{isNotUndefined(dispatchDeletion) && (*/}
      {/*  <DeletedOverlay*/}
      {/*    show={deleted}*/}
      {/*    handleUnDelete={() =>*/}
      {/*      dispatchDeletion((state) => state.filter((id) => id != model.id))*/}
      {/*    }*/}
      {/*  />*/}
      {/*)}*/}

      <div className={'flex items-center'}>
        {isNotUndefined(dispatchDeletion) && (
          <TwoStageClick
            standardAppearance={'light'}
            onPress={() => dispatchDeletion((state) => [...state, model.id])}
            isIconOnly
          >
            {' '}
            <TrashIcon className={'h-4 w-4'}></TrashIcon>
          </TwoStageClick>
        )}

        <Button
          onPress={() => renameEntityProps.onOpen()}
          // size={'sm'}
          className={'px-unit-2'}
          endContent={<PencilSquareIcon className={'p-1'} />}
        >
          <span className={'text-left truncate ...'}>{model.name}</span>
        </Button>
      </div>
      <div className={'col-span-2'}>
        <AdjustAllocation {...props}></AdjustAllocation>
      </div>

      <RenameModal
        {...renameEntityProps}
        onCancel={() => renameEntityProps.dispatch()(model.name)}
      >
        thing
      </RenameModal>
    </div>
  );
};
