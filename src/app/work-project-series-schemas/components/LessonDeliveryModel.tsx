'use client';
import { DtoUiComponentProps } from 'dto-stores';
import { isNotUndefined } from '../../api/main';
import { AdjustAllocation } from './AdjustAllocation';
import { WorkProjectSeriesSchemaDto } from '@/app/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

import { TwoStageClick } from '@/components/generic/TwoStageClick';
import React from 'react';
import RenameModal from '@/components/modals/RenameModal';
import { useRenameEntity } from '@/components/modals/useRenameEntity';
import { Button } from '@nextui-org/button';
import { DtoStoreStringValueEdit } from '@/components/generic/DtoStoreStringValueEdit';
import { DtoStoreNumberInput } from '@/components/generic/DtoStoreNumberInput';
import { DeletedOverlay } from '@/components/overlays/deleted-overlay';

const numberEditClassNames =
  'text-right no-spinner rounded-xl px-2 mx-1 bg-default-100 hover:bg-default-200';
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
    <div className={'grid grid-cols-4 items-center relative'}>
      {isNotUndefined(dispatchDeletion) && (
        <DeletedOverlay
          show={deleted}
          handleUnDelete={() =>
            dispatchDeletion((state) => state.filter((id) => id != model.id))
          }
        />
      )}

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
          entityType={entityClass}
          valueAccessor={(dto) => dto.shortCode || ''}
          producer={(value, entity) => ({ ...entity, shortCode: value })}
          listenerKey={`${model.id}:shortCode`}
        />
        <DtoStoreNumberInput<WorkProjectSeriesSchemaDto, string>
          entityId={model.id}
          entityType={entityClass}
          numberUpdater={(wpss, value) => ({
            ...wpss,
            workProjectBandwidth: value
          })}
          numberAccessor={(wpss) => wpss.workProjectBandwidth}
          listenerKey={'projectBandwidthEdit'}
          className={numberEditClassNames}
        />
        <DtoStoreNumberInput<WorkProjectSeriesSchemaDto, string>
          entityId={model.id}
          entityType={entityClass}
          numberUpdater={(wpss, value) => ({
            ...wpss,
            userToProviderRatio: value
          })}
          numberAccessor={(wpss) => wpss.userToProviderRatio}
          listenerKey={'userRatioEdit'}
          className={numberEditClassNames}
        />
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
