'use client';
import { BaseDtoUiProps } from 'dto-stores';
import { AdjustAllocation } from './AdjustAllocation';

import { TrashIcon } from '@heroicons/react/24/outline';

import { TwoStageClick } from '@/components/generic/TwoStageClick';
import React from 'react';
import { DeletedOverlay } from '@/components/overlays/deleted-overlay';
import { SetOptional } from 'type-fest';
import { DtoStoreNumberInput } from '@/components/generic/DtoStoreNumberInput';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';
import { StringValueChip } from '@/app/work-project-series-schemas/_components/StringValueChip';
import { RenameWpss } from '@/app/work-project-series-schemas/_components/RenameWpss';

export const WorkProjectSeriesSchemaEditor = (
  props: SetOptional<BaseDtoUiProps<WorkProjectSeriesSchemaDto>, 'deleted'>
) => {
  const { entity: model, deleted, dispatchDeletion, entityClass } = props;

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
        <RenameWpss entity={model} path={'name'} entityClass={entityClass} />
      </div>
      <div className={'col-span-2 px-2'}>
        <AdjustAllocation {...props}></AdjustAllocation>
      </div>
      <div className={'grid grid-cols-3'}>
        <StringValueChip
          entity={model}
          entityClass={entityClass}
          path={'workTaskType.knowledgeDomain.shortCode'}
        />
        <DtoStoreNumberInput<WorkProjectSeriesSchemaDto>
          {...props}
          numberKey={'userToProviderRatio'}
          min={1}
        />
      </div>
    </div>
  );
};
