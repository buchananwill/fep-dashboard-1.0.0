import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Button } from '@nextui-org/button';
import { ObjectPlaceholder } from 'selective-context';

import React from 'react';

import {
  ComponentUndefined,
  GraphSelectiveContextKeys,
  MemoizedFunction,
  NodeModalContentProps,
  undefinedEditNodeData,
  useGraphDispatchAndListener,
  useGraphListener
} from 'react-d3-force-graph';
import { FocusToEdit } from '@/react-flow/components/generic/FocusToEdit';
import { OrganizationDto } from '@/api/dtos/OrganizationDtoSchema';

const listenerKey = 'details-content';

export default function OrganizationDetailsContent({
  onClose
}: NodeModalContentProps) {
  const {
    currentState: { memoizedFunction: commitEdit }
  } = useGraphListener<MemoizedFunction<OrganizationDto, void>>(
    GraphSelectiveContextKeys.editNodeData,
    listenerKey,
    undefinedEditNodeData
  );
  const { dispatchWithoutControl, currentState } =
    useGraphDispatchAndListener<OrganizationDto>(
      GraphSelectiveContextKeys.nodeInModal,
      listenerKey,
      ObjectPlaceholder as OrganizationDto
    );

  if (currentState === undefined)
    return <ComponentUndefined onClose={onClose} />;

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <FocusToEdit
          value={currentState.name}
          onValueChange={(value) =>
            dispatchWithoutControl((data) => ({ ...data, name: value }))
          }
        >
          {currentState.name}
        </FocusToEdit>
      </ModalHeader>
      <ModalBody>Some stuff about the organization.</ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button
          color="primary"
          onPress={() => {
            commitEdit(currentState);
            onClose();
          }}
        >
          Confirm Changes
        </Button>
      </ModalFooter>
    </>
  );
}
