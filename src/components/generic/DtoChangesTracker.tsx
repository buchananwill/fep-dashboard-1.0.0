'use client';

import { Card, CardBody } from '@nextui-org/card';
import {
  PrimaryDtoControllerArrayProps,
  UnsavedChangesProps
} from 'dto-stores/dist/types';
import { HasIdClass } from '@/api/main';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import {
  EditAddDeleteDtoControllerArray,
  MasterChangesController
} from 'dto-stores';

function UnsavedChangesToast({
  handleCommit,
  unsavedFlag
}: UnsavedChangesProps) {
  return (
    <div className={'fixed z-30 w-fit h-fit top-4 right-4'}>
      {unsavedFlag && (
        <Card
          className={'w-fit group hover:opacity-75'}
          isPressable={true}
          onPress={handleCommit}
          isHoverable={true}
        >
          <CardBody
            className={'flex flex-row items-center overflow-hidden justify-end'}
          >
            <span
              className={
                'text-nowrap w-0 group-hover:w-fit  group-hover:text-black text-transparent group-hover:mr-2'
              }
            >
              Unsaved changes.
            </span>
            <ExclamationTriangleIcon
              className={'w-6 h-6 fill-red-500'}
            ></ExclamationTriangleIcon>
          </CardBody>
        </Card>
      )}
    </div>
  );
}

export function MasterChangesTrackWrapper() {
  return <MasterChangesController unsavedChangesToast={UnsavedChangesToast} />;
}
