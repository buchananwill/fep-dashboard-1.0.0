import {
  GraphSelectiveContextKeys,
  MemoizedFunction,
  NodeModalContentProps,
  undefinedEditNodeData,
  useGraphDispatchAndListener,
  useGraphListener
} from 'react-d3-force-wrapper';
import { ObjectPlaceholder } from 'selective-context';
import { WorkSchemaNodeDto } from '@/api/dtos/WorkSchemaNodeDtoSchema';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { FocusToEdit } from '@/react-flow/components/generic/FocusToEdit';
import { listenerKeyDetailsContent } from '@/app/_literals';
import { Button } from '@nextui-org/button';
import React from 'react';
import { NamespacedHooks } from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { WorkProjectSeriesSchemaDto } from '@/api/dtos/WorkProjectSeriesSchemaDtoSchema';
import WorkProjectSeriesSchemaSelectTable from '@/app/service-categories/[id]/[levelOrdinal]/work-project-series-schemas/_components/WorkProjectSeriesSchemaSelectTable';

const listenerKey = 'workSchemaNodeModalContent';

export default function WorkSchemaNodeDetailsContent({
  onClose
}: Partial<NodeModalContentProps>) {
  const onCloseDefined = onClose ? onClose : () => {};

  const {
    currentState: { memoizedFunction: commitEdit }
  } = useGraphListener<MemoizedFunction<WorkSchemaNodeDto, void>>(
    GraphSelectiveContextKeys.editNodeData,
    listenerKeyDetailsContent,
    undefinedEditNodeData
  );
  const { dispatchWithoutControl, currentState } =
    useGraphDispatchAndListener<WorkSchemaNodeDto>(
      GraphSelectiveContextKeys.nodeInModal,
      listenerKeyDetailsContent,
      ObjectPlaceholder as WorkSchemaNodeDto
    );

  const { currentState: schemaList } = NamespacedHooks.useListen(
    EntityClassMap.workProjectSeriesSchema,
    KEY_TYPES.MASTER_LIST,
    listenerKey,
    EmptyArray as WorkProjectSeriesSchemaDto[]
  );

  return (
    <>
      <ModalHeader>
        <FocusToEdit
          value={currentState.name ?? ''}
          label={'Node Name'}
          size={'sm'}
          onValueChange={(value) =>
            dispatchWithoutControl((data) => ({ ...data, name: value }))
          }
        >
          {currentState.name ?? ''}
        </FocusToEdit>
      </ModalHeader>
      <ModalBody>
        <WorkProjectSeriesSchemaSelectTable
          entities={schemaList}
          selectionMode={'single'}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose}>
          Close
        </Button>
        <Button
          color="primary"
          onPress={() => {
            commitEdit(currentState);
            onCloseDefined();
          }}
        >
          Confirm Changes
        </Button>
      </ModalFooter>
    </>
  );
}
