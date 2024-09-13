import { NextUiCellComponentProps } from '@/app/work-project-series-schemas/_components/GetCellRenderFunction';
import { WorkProjectSeriesSchemaDto } from '@/api/generated-types/generated-types';
import { useDtoStoreDispatch } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { useRenameEntity } from '@/components/modals/nameSetter';
import { Button } from '@nextui-org/button';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { getValue } from '@/functions/allowingNestedFiltering';
import RenameModal from '@/components/modals/RenameModal';
import React from 'react';

export function RenameWpss({
  entity,
  path
}: NextUiCellComponentProps<WorkProjectSeriesSchemaDto>) {
  const { dispatchWithoutListen } = useDtoStoreDispatch(
    entity.id,
    EntityClassMap.workProjectSeriesSchema
  );

  const renameEntityProps = useRenameEntity(
    EntityClassMap.workProjectSeriesSchema,
    entity,
    dispatchWithoutListen
  );

  return (
    <>
      <Button
        onPress={renameEntityProps.onOpen}
        className={'px-unit-2 m-0 h-10 max-w-md'}
        endContent={<PencilSquareIcon className={'p-1.5'} />}
      >
        <span className={'... truncate text-left'}>
          {getValue(entity, path) as string}
        </span>
      </Button>{' '}
      <RenameModal
        {...renameEntityProps}
        onCancel={() => renameEntityProps.dispatchTextChange(entity.name)}
      />
    </>
  );
}
