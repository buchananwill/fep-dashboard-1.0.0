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
import { WorkSchemaNodeDto } from '@/api/zod-schemas/WorkSchemaNodeDtoSchema_';
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { FocusToEdit } from '@/components/generic/FocusToEdit';
import { listenerKeyDetailsContent } from '@/app/_literals';
import { Button } from '@nextui-org/button';
import React, { useMemo } from 'react';
import {
  BaseLazyDtoUiProps,
  LazyDtoUiWrapper,
  NamespacedHooks
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { WorkProjectSeriesSchemaDto } from '@/api/zod-schemas/WorkProjectSeriesSchemaDtoSchema_';
import WorkSchemaNodeModalTable from '@/app/work-project-series-schemas/_components/WorkSchemaNodeModalTable';
import EntityPropertyCheckbox from '@/components/generic/EntityPropertyCheckbox';
import WorkProjectionSeriesSchemaSummary from '@/app/work-project-series-schemas/_components/WorkProjectSeriesSchemaSummary';
import { Spinner } from '@nextui-org/spinner';
import { DtoStoreNumberInput } from '@/components/generic/DtoStoreNumberInput';
import { BooleanPropertyKey, NumberPropertyKey } from '@/types';
import { getIdFromLinkReference } from 'react-d3-force-wrapper/dist/editing/functions/resetLinks';
import { CarouselOptionDto } from '@/api/zod-schemas/CarouselOptionDtoSchema';

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

  return (
    <>
      <ModalHeader className={'p-2'}></ModalHeader>
      <ModalBody className={'grid w-full grid-cols-2'}>
        <div className={'grid grid-cols-2 gap-1'}>
          <div className={'col-span-2'}>
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
          </div>
          <div className={'flex flex-col'}>
            {checkboxProperties.map((prop) => (
              <EntityPropertyCheckbox
                key={prop}
                booleanKey={prop}
                entity={currentState}
                entityClass={EntityClassMap.workSchemaNode}
                dispatchWithoutControl={dispatchWithoutControl}
              />
            ))}
          </div>
          <div>
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
              className={
                'col-span-2 flex flex-col rounded-lg border-2 p-2 drop-shadow'
              }
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
        <div className={'flex overflow-auto'}>
          {allowSchema && (
            <WorkSchemaNodeModalTable
              workSchemaNode={currentState}
              entities={schemaList}
              selectionMode={'single'}
              dispatchWithoutControl={dispatchWithoutControl}
            />
          )}
        </div>
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
