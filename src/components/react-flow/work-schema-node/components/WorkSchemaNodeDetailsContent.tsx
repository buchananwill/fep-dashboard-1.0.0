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
import { CarouselOptionDto } from '@/api/generated-types/generated-types';
import { FocusToEdit } from '@/components/generic/FocusToEdit';
import { listenerKeyDetailsContent } from '@/app/_literals';
import { Button, Loader, Select } from '@mantine/core';
import React, { useEffect, useMemo } from 'react';
import {
  BaseLazyDtoUiProps,
  LazyDtoUiWrapper,
  NamespacedHooks
} from 'dto-stores';
import { EntityClassMap } from '@/api/entity-class-map';
import WorkSchemaNodeModalTable from '@/components/work-project-series-schema/_components/WorkSchemaNodeModalTable';
import EntityPropertyCheckbox from '@/components/generic/EntityPropertyCheckbox';
import WorkProjectionSeriesSchemaSummary from '@/components/work-project-series-schema/_components/WorkProjectSeriesSchemaSummary';

import { DtoStoreNumberInput } from '@/components/generic/DtoStoreNumberInput';
import { BooleanPropertyKey, NumberPropertyKey } from '@/types';
import { getIdFromLinkReference } from 'react-d3-force-wrapper/dist/editing/functions/resetLinks';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/api/clientApi';
import { KEY_TYPES } from 'dto-stores/dist/literals';
import { EmptyArray } from '@/api/literals';
import { WorkSchemaNodeDto } from '@/components/react-flow/generic/utils/adaptors';
import { useSelectApi } from '@/hooks/select-adaptors/useSelectApi';
import { SingleFlat } from '@/hooks/select-adaptors/selectApiTypes';
import { determineLocalResolution } from '@/components/react-flow/work-schema-node/functions/workSchemaNodeCallbacks';

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

  const { data, isPending } = useQuery({
    queryKey: [EntityClassMap.workProjectSeriesSchema, 'all'],
    queryFn: () => Api.WorkProjectSeriesSchema.getAll()
  });

  const dispatch = NamespacedHooks.useDispatch(
    EntityClassMap.workProjectSeriesSchema,
    KEY_TYPES.MASTER_LIST
  );

  useEffect(() => {
    if (data) dispatch(data); // TODO This imperative forcing of the master list content WITHIN A MODAL is a bad design.
    return () => {
      dispatch(EmptyArray); // THIS LINE IS CRITICAL TO UNMOUNT THE WORK PROJECT SCHEMAS LIST WHEN THE MODAL CLOSES. OTHERWISE, SELECTIVE CONTEXT THROWS A DOUBLE-LISTENER KEY ERROR FROM A CLASH WITH THE OLD STALE LIST.
    };
  }, [data, dispatch]);

  const selectApi = useSelectApi<ChildrenAsEnum>({
    rawData: childrenAsOptions,
    labelMaker: (item?: ChildrenAsEnum) => item ?? 'BUNDLE',
    value: currentState.childrenAs,
    type: 'singleFlat',
    propagateChange: (value) =>
      dispatchWithoutControl((wsn) => {
        const updatedNode = {
          ...wsn,
          childrenAs: value ?? 'BUNDLE'
        };
        updatedNode.resolutionMode = determineLocalResolution(updatedNode);
        return updatedNode;
      })
  });

  return (
    <>
      <div className={'flex w-full flex-col'}>
        {isPending ? (
          <Loader />
        ) : data === undefined ? (
          <div>Error.</div>
        ) : (
          <>
            <div className={'grid grid-cols-2 gap-1'}>
              <div>
                <FocusToEdit
                  value={currentState.name ?? ''}
                  placeholder={'Node Name'}
                  size={'sm'}
                  onChange={(e) =>
                    dispatchWithoutControl((data) => ({
                      ...data,
                      name: e.target.value
                    }))
                  }
                >
                  {currentState.name ?? ''}
                </FocusToEdit>
                <Select {...(selectApi as SingleFlat)} />

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
                  className={'shadow-small m-1 flex flex-col rounded-lg p-2'}
                >
                  Leaf Content:
                  {currentState.workProjectSeriesSchemaId && (
                    <LazyDtoUiWrapper
                      renderAs={WorkProjectionSeriesSchemaSummary}
                      entityId={currentState.workProjectSeriesSchemaId}
                      entityClass={EntityClassMap.workProjectSeriesSchema}
                      whileLoading={() => <Loader />}
                    />
                  )}
                  {currentState.carouselOptionId && (
                    <LazyDtoUiWrapper
                      renderAs={CarouselOptionSummary}
                      entityId={currentState.carouselOptionId}
                      entityClass={EntityClassMap.carouselOption}
                      whileLoading={() => <Loader />}
                    />
                  )}
                </div>
              )}
            </div>

            {allowSchema && (
              <WorkSchemaNodeModalTable
                workSchemaNode={currentState}
                dispatchWithoutControl={dispatchWithoutControl}
              />
            )}
          </>
        )}
      </div>
      <div className={'p-2'}>
        <Button color="danger" variant="light" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
            commitEdit(currentState);
            onCloseDefined();
          }}
        >
          Update graph
        </Button>
      </div>
    </>
  );
}

type ChildrenAsEnum = WorkSchemaNodeDto['childrenAs'];

const childrenAsOptions: WorkSchemaNodeDto['childrenAs'][] = [
  'BUNDLE',
  'CAROUSEL',
  'SERIAL'
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
      whileLoading={() => <Loader />}
    />
  );
}
