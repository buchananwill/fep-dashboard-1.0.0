import { BaseDtoUiProps, DtoUiWrapper, Identifier } from 'dto-stores';
import React, { useCallback, useMemo, useRef } from 'react';
import { StepperContext } from '@/components/generic/stepper/stepperContextCreator';
import LandscapeStepper from '@/components/generic/stepper/LandscapeStepper';
import { EditTextDeleteEntityPopover } from '@/components/generic/EditTextDeleteEntityPopover';
import { DeletedOverlay } from '@/components/overlays/deleted-overlay';
import {
  CarouselGroupDto,
  CarouselGroupOptionDto,
  CarouselLeanDto
} from '@/api/generated-types/generated-types';
import { idDecrementer } from '@/components/work-schema-node-assignments/enrollment-table/GetNextIdDecrement';
import { EntityClassMap } from '@/api/entity-class-map';
import WorkProjectSeriesSchemaSelectorTable from '@/components/tables/selectorTables/WorkProjectSeriesSchemaSelectorTable';
import { useSyncStateToPropOnFirstRenderTheEntityToStateOnFutureRenders } from '@/components/work-project-series-schema/_components/useSyncStateToPropOnFirstRenderTheEntityToStateOnFutureRenders';
import { isEqual } from 'lodash';

export default function CarouselGroupEditor({
  collectionId
}: {
  collectionId: Identifier;
}) {
  return (
    <DtoUiWrapper
      renderAs={InnerChooserComponent}
      entityClass={EntityClassMap.carouselGroup}
      entityId={collectionId}
      collectionId={collectionId}
    />
  );
}

function InnerChooserComponent(
  props: BaseDtoUiProps<CarouselGroupDto> & {
    collectionId: Identifier;
    entityClass: string;
  }
) {
  const {
    entity,
    dispatchWithoutControl,
    deleted,
    dispatchDeletion,
    collectionId,
    ...otherProps
  } = props;
  let carouselGroupOptions: CarouselGroupOptionDto[], carouselGroupId: number;
  if (entity) {
    ({ carouselGroupOptions, id: carouselGroupId } = entity);
  } else {
    carouselGroupOptions = [];
    carouselGroupId = NaN;
  }
  const selectedIdListRef = useRef([] as number[]);

  const selectedIdList = useMemo(() => {
    const idList = carouselGroupOptions.map(
      (option) => option.workProjectSeriesSchemaId
    );
    if (isEqual(idList, selectedIdListRef.current)) {
      return selectedIdListRef.current;
    } else {
      selectedIdListRef.current = idList;
      return idList;
    }
  }, [carouselGroupOptions]);

  const updateCarouselOptionList = useCallback(
    (selectionList: number[]) => {
      if (!dispatchWithoutControl) return;
      dispatchWithoutControl((prev) => {
        const { carouselGroupOptions } = prev;
        const idSet = new Set(selectionList);
        const updatedList = [] as CarouselGroupOptionDto[];
        for (let carouselGroupOption of carouselGroupOptions) {
          if (idSet.has(carouselGroupOption.workProjectSeriesSchemaId)) {
            idSet.delete(carouselGroupOption.workProjectSeriesSchemaId);
            updatedList.push(carouselGroupOption);
          }
        }
        for (let wpssId of idSet.values()) {
          updatedList.push({
            workProjectSeriesSchemaId: wpssId,
            carouselGroupId,
            id: idDecrementer()
          });
        }
        return { ...prev, carouselGroupOptions: updatedList };
      });
    },
    [carouselGroupId, dispatchWithoutControl]
  );

  useSyncStateToPropOnFirstRenderTheEntityToStateOnFutureRenders(
    selectedIdList,
    updateCarouselOptionList,
    EntityClassMap.workProjectSeriesSchema
  );

  const editCarouselCount = useCallback(
    (direction: 'inc' | 'dec') => {
      if (!dispatchWithoutControl) return;
      if (direction === 'inc') {
        dispatchWithoutControl((group) => {
          const currentCarouselCount = group.carousels.length + 1;
          const carouselsUpdate: CarouselLeanDto[] = [
            ...group.carousels,
            {
              id: idDecrementer(),
              carouselOrdinal: currentCarouselCount
            }
          ];
          return { ...group, carousels: carouselsUpdate };
        });
      } else {
        dispatchWithoutControl((group) => {
          if (group.carousels.length === 0) return group;
          else
            return {
              ...group,
              carousels: group.carousels.slice(0, group.carousels.length - 1)
            };
        });
      }
    },
    [dispatchWithoutControl]
  );

  if (!entity) return null;

  return (
    <div className={'relative flex flex-col'}>
      <DeletedOverlay
        show={deleted}
        classNames={{ overlay: 'rounded-xl' }}
        handleUnDelete={() => {
          if (!dispatchDeletion) return;
          dispatchDeletion((list) => list.filter((id) => id !== entity.id));
        }}
      />
      <div className={'mb-2 grid grid-cols-2 items-baseline gap-1'}>
        <EditTextDeleteEntityPopover<CarouselGroupDto>
          entityClass={props.entityClass}
          deleted={deleted}
          dispatchDeletion={dispatchDeletion}
          entity={entity}
          dispatchWithoutControl={dispatchWithoutControl}
          stringPath={'name'}
        />
        <div className={'flex justify-center'}>
          <StepperContext.Provider
            value={{
              increment: () => editCarouselCount('inc'),
              decrement: () => editCarouselCount('dec'),
              current: entity?.carousels?.length ?? 0
            }}
          >
            <span className={'pr-2'}>Carousels:</span>{' '}
            <LandscapeStepper></LandscapeStepper>
          </StepperContext.Provider>
        </div>
      </div>
      <WorkProjectSeriesSchemaSelectorTable />
    </div>
  );
}
