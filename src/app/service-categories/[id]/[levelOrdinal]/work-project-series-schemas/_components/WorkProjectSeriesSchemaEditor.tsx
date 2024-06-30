'use client';
import { BaseDtoUiProps } from 'dto-stores';
import { AdjustAllocation } from './AdjustAllocation';

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

import { TwoStageClick } from '@/components/generic/TwoStageClick';
import React from 'react';
import RenameModal from '@/components/modals/RenameModal';
import { Button } from '@nextui-org/button';
import { DeletedOverlay } from '@/components/overlays/deleted-overlay';
import { useRenameEntity } from '@/components/modals/nameSetter';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { SetOptional } from 'type-fest';
import { DtoStoreNumberInput } from '@/components/generic/DtoStoreNumberInput';
import { DtoStoreStringInput } from '@/components/generic/DtoStoreStringInput';

export const WorkProjectSeriesSchemaEditor = (
  props: SetOptional<BaseDtoUiProps<WorkProjectSeriesSchemaDto>, 'deleted'>
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
    dispatchWithoutControl
  );

  return (
    <div className={'relative grid grid-cols-4 items-center'}>
      {dispatchDeletion && (
        <DeletedOverlay
          show={deleted ?? false}
          handleUnDelete={() =>
            dispatchDeletion((state) => state.filter((id) => id != model.id))
          }
        />
      )}

      <div className={'flex items-center'}>
        {dispatchDeletion && (
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
          className={'px-unit-2'}
          endContent={<PencilSquareIcon className={'p-1.5'} />}
        >
          <span className={'... truncate text-left'}>{model.name}</span>
        </Button>
      </div>
      <div className={'col-span-2 px-2'}>
        <AdjustAllocation {...props}></AdjustAllocation>
      </div>
      <div className={'grid grid-cols-3'}>
        <DtoStoreStringInput {...props} stringKey={'shortCode'} />
        <DtoStoreNumberInput<WorkProjectSeriesSchemaDto>
          {...props}
          numberKey={'workProjectBandwidth'}
          min={0}
        />
        <DtoStoreNumberInput<WorkProjectSeriesSchemaDto>
          {...props}
          numberKey={'userToProviderRatio'}
          min={1}
        />
      </div>

      <RenameModal
        {...renameEntityProps}
        onCancel={() => renameEntityProps.dispatchTextChange(model.name)}
      />
    </div>
  );
};
