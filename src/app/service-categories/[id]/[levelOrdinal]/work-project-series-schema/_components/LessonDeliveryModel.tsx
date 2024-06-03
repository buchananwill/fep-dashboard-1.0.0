'use client';
import { BaseDtoUiProps } from 'dto-stores';
import { isNotUndefined } from '@/api/main';
import { AdjustAllocation } from './AdjustAllocation';

import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

import { TwoStageClick } from '@/components/generic/TwoStageClick';
import React from 'react';
import RenameModal from '@/components/modals/RenameModal';
import { Button } from '@nextui-org/button';
import { DtoStoreStringValueEdit } from '@/components/generic/DtoStoreStringValueEdit';
import { DtoStoreNumberInput } from '@/components/generic/DtoStoreNumberInput';
import { DeletedOverlay } from '@/components/overlays/deleted-overlay';
import { useRenameEntity } from '@/components/modals/nameSetter';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { SetOptional } from 'type-fest';

const numberEditClassNames =
  'text-right no-spinner rounded-xl px-2 mx-1 bg-default-100 hover:bg-default-200';
export const LessonDeliveryModel = (
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
    'curriculumDeliveryModel',
    dispatchWithoutControl
  );

  return (
    <div className={'grid grid-cols-4 items-center relative'}>
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
          <span className={'text-left truncate ...'}>{model.name}</span>
        </Button>
      </div>
      <div className={'col-span-2 px-2'}>
        <AdjustAllocation {...props}></AdjustAllocation>
      </div>
      <div className={'grid grid-cols-3'}>
        <DtoStoreStringValueEdit
          entity={model}
          entityClass={entityClass}
          valueAccessor={(dto) => dto.shortCode || ''}
          producer={(value, entity) => ({ ...entity, shortCode: value })}
          listenerKey={`${model.id}:shortCode`}
        />
        <DtoStoreNumberInput<WorkProjectSeriesSchemaDto, string>
          entityId={model.id}
          entityClass={entityClass}
          numberUpdater={(wpss, value) => ({
            ...wpss,
            workProjectBandwidth: value
          })}
          numberAccessor={(wpss) => wpss.workProjectBandwidth}
          className={numberEditClassNames}
        />
        <DtoStoreNumberInput<WorkProjectSeriesSchemaDto, string>
          entityId={model.id}
          entityClass={entityClass}
          numberUpdater={(wpss, value) => ({
            ...wpss,
            userToProviderRatio: value
          })}
          numberAccessor={(wpss) => wpss.userToProviderRatio}
          className={numberEditClassNames}
        />
      </div>

      <RenameModal
        {...renameEntityProps}
        onCancel={() => renameEntityProps.dispatchTextChange(model.name)}
      />
    </div>
  );
};
