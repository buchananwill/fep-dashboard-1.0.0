'use client';

import { Card, CardBody, CardHeader } from '@nextui-org/card';
import {
  DtoListControllerProps,
  UnsavedChangesProps
} from 'dto-stores/dist/types';
import { DtoIdListController } from 'dto-stores/dist/controllers/DtoIdListController';
import { HasId } from '@/app/api/main';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

function UnsavedChangesToast({
  handleCommit,
  unsavedFlag
}: UnsavedChangesProps) {
  return (
    <div className={'fixed z-30 w-fit h-fit top-4 right-4'}>
      {unsavedFlag && (
        <Card
          className={'w-fit h-16 hover:opacity-75'}
          isPressable={true}
          onPress={handleCommit}
          isHoverable={true}
        >
          {/*<CardHeader className={'justify-center'}></CardHeader>*/}
          <CardBody className={'flex flex-row items-center gap-1'}>
            Unsaved changes.
            <ExclamationTriangleIcon
              className={'w-6 h-6 inline fill-red-500'}
            ></ExclamationTriangleIcon>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export default function DtoChangesTracker<T extends HasId>({
  unsavedChangesComponent,
  ...props
}: DtoListControllerProps<T>) {
  return (
    <DtoIdListController
      unsavedChangesComponent={UnsavedChangesToast}
      {...props}
    />
  );
}
