import {
  GraphSelectiveContextKeys,
  MemoizedFunction,
  NodeModalContentProps,
  undefinedEditNodeData,
  useGraphDispatchAndListener,
  useGraphListener,
  useLinkContext
} from 'react-d3-force-wrapper';
import { ObjectPlaceholder } from 'selective-context';
import {
  CarouselOptionDto,
  WorkProjectSeriesSchemaDto,
  WorkSchemaNodeDto
} from '@/api/generated-types/generated-types';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { FocusToEdit } from '@/components/generic/FocusToEdit';
import { listenerKeyDetailsContent } from '@/app/_literals';
import { Button } from '@nextui-org/button';
import React, { useMemo } from 'react';
import {
  BaseLazyDtoUiProps,
  EditAddDeleteDtoControllerArray,
  LazyDtoUiWrapper,
  NamespacedHooks
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import WorkSchemaNodeModalTable from '@/components/work-project-series-schema/_components/WorkSchemaNodeModalTable';
import EntityPropertyCheckbox from '@/components/generic/EntityPropertyCheckbox';
import WorkProjectionSeriesSchemaSummary from '@/components/work-project-series-schema/_components/WorkProjectSeriesSchemaSummary';
import { Spinner } from '@nextui-org/spinner';
import { DtoStoreNumberInput } from '@/components/generic/DtoStoreNumberInput';
import { BooleanPropertyKey, NumberPropertyKey } from '@/types';
import { getIdFromLinkReference } from 'react-d3-force-wrapper/dist/editing/functions/resetLinks';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/clientApi';

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
  const { links } = useLinkContext();
  const allowSchema = useMemo(() => {
    return (
      links.every(
        (dLink) =>
          getIdFromLinkReference(dLink.source) !== String(currentState.id)
      ) &&
      currentState.carouselOptionId === undefined &&
      currentState.resolutionMode !== 'CAROUSEL'
    );
  }, [
    links,
    currentState.id,
    currentState.carouselOptionId,
    currentState.resolutionMode
  ]);

  const { currentState: schemaList } = NamespacedHooks.useListen(
    EntityClassMap.workProjectSeriesSchema,
    KEY_TYPES.MASTER_LIST,
    listenerKey,
    EmptyArray as WorkProjectSeriesSchemaDto[]
  );

  const { data, isPending } = useQuery({
    queryKey: [EntityClassMap.workProjectSeriesSchema, 'all'],
    queryFn: () => Api.WorkProjectSeriesSchema.getAll()
  });

  return (
    <>
      <ModalHeader className={'p-2'}></ModalHeader>
      <ModalBody className={'flex w-full flex-col'}>
        {isPending ? (
          <Spinner></Spinner>
        ) : data === undefined ? (
          <div>Error.</div>
        ) : (
          <>
            <EditAddDeleteDtoControllerArray
              entityClass={EntityClassMap.workProjectSeriesSchema}
              dtoList={data}
            />
            <div className={'grid grid-cols-2 gap-1'}>
              <div>
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
                {checkboxProperties.map((prop) => (
                  <EntityPropertyCheckbox
                    key={prop}
                    booleanKey={prop}
                    entity={currentState}
                    entityClass={EntityClassMap.workSchemaNode}
                    dispatchWithoutControl={dispatchWithoutControl}
                  />
                ))}
                {numberProperties.map((prop) => (
                  <label key={prop} className={'flex w-full justify-between'}>
                    <span className={'inline-block grow'}>{prop}:</span>
                    <DtoStoreNumberInput
                      numberKey={prop}
                      entity={currentState}
                      entityClass={EntityClassMap.workSchemaNode}
                      dispatchWithoutControl={dispatchWithoutControl}
                      min={prop === 'priority' ? 0 : 1}
                      allowFloat={true}
                    />
                  </label>
                ))}
              </div>
              {(currentState.workProjectSeriesSchemaId ||
                currentState.carouselOptionId) && (
                <div
                  className={'m-1 flex flex-col rounded-lg p-2 shadow-small'}
                >
                  Leaf Content:
                  {currentState.workProjectSeriesSchemaId && (
                    <LazyDtoUiWrapper
                      renderAs={WorkProjectionSeriesSchemaSummary}
                      entityId={currentState.workProjectSeriesSchemaId}
                      entityClass={EntityClassMap.workProjectSeriesSchema}
                      whileLoading={() => <Spinner />}
                    />
                  )}
                  {currentState.carouselOptionId && (
                    <LazyDtoUiWrapper
                      renderAs={CarouselOptionSummary}
                      entityId={currentState.carouselOptionId}
                      entityClass={EntityClassMap.carouselOption}
                      whileLoading={() => <Spinner />}
                    />
                  )}
                </div>
              )}
            </div>

            {allowSchema && (
              <WorkSchemaNodeModalTable
                workSchemaNode={currentState}
                entities={schemaList}
                selectionMode={'single'}
                dispatchWithoutControl={dispatchWithoutControl}
              />
            )}
          </>
        )}
      </ModalBody>
      <ModalFooter className={'p-2'}>
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

const checkboxProperties: BooleanPropertyKey<WorkSchemaNodeDto>[] = [
  'allowBundle',
  'preferCarousel'
];

const numberProperties: NumberPropertyKey<WorkSchemaNodeDto>[] = [
  'dominanceFactor',
  'priority'
];

function CarouselOptionSummary({
  entity
}: BaseLazyDtoUiProps<CarouselOptionDto>) {
  return (
    <LazyDtoUiWrapper
      renderAs={WorkProjectionSeriesSchemaSummary}
      entityId={entity.workProjectSeriesSchemaId}
      entityClass={EntityClassMap.workProjectSeriesSchema}
      whileLoading={() => <Spinner />}
    />
  );
}
