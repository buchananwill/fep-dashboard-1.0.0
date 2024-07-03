'use client';
import { NodeProps } from 'reactflow';
import { ProviderRoleDto } from '@/api/dtos/ProviderRoleDtoSchema';
import { WorkTaskTypeDto } from '@/api/dtos/WorkTaskTypeDtoSchema';
import { BaseReadOnlyNode } from '@/react-flow/components/nodes/BaseReadOnlyNode';
import { HasNumberId } from '@/api/types';
import { ProviderRoleTypeDto } from '@/api/dtos/ProviderRoleTypeDtoSchema';
import React, { memo, useMemo } from 'react';
import {
  BaseLazyDtoUiProps,
  LazyDtoUiWrapper,
  useLazyDtoListListener
} from 'dto-stores';
import { WorkTaskTypeProjection } from '@/components/react-flow/bi-partite-graph/BandwidthLayoutFlowWithForces';
import { EntityClassMap } from '@/api/entity-class-map';
import { Chip } from '@nextui-org/chip';
import { Spinner } from '@nextui-org/spinner';
import { useMaxProjectionListener } from '@/components/react-flow/bi-partite-graph/useMaxProjectionController';
import { interpolateHsl, rgb } from 'd3';
import { useGlobalController, useGlobalListener } from 'selective-context';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { ObjectPlaceholder } from '@/api/literals';
import { BandwidthValidationLayer } from '@/app/service-categories/[id]/roles/providers/[roleTypeId]/bandwidth-graph/types';
import clsx from 'clsx';

type BaseClassification = HasNumberId & {
  hashcode: number;
  type: string;
  classificationReferenceType: string;
  classificationReferenceId: number;
  memberIdList: number[];
  bandwidth: number;
};

type ProviderRoleClassification = {
  type: 'providerRole';
} & BaseClassification;

type WorkTaskTypeClassification = {
  type: 'workTaskType';
} & BaseClassification;

export type Classification =
  | ProviderRoleClassification
  | WorkTaskTypeClassification;

export default function ClassificationNode(props: NodeProps<Classification>) {
  const { dragging, data, selected } = props;
  const listenerKey = useUuidListenerKey();

  const { currentState: bandwidthValidationLayer } = useGlobalController({
    contextKey: `${EntityClassMap.bandwidthValidationLayer}:${data.id}`,
    listenerKey,
    initialValue: ObjectPlaceholder as BandwidthValidationLayer
  });
  const validationElement = useMemo(() => {
    if (bandwidthValidationLayer !== ObjectPlaceholder) {
      console.log(bandwidthValidationLayer);
      return (
        <div className={'inline-block rounded-lg'}>
          {bandwidthValidationLayer.residualBandwidth}
        </div>
      );
    } else {
      console.log(bandwidthValidationLayer);
      return null;
    }
  }, [bandwidthValidationLayer]);

  return (
    <BaseReadOnlyNode
      {...props}
      className={clsx(
        'relative flex flex-col gap-1 rounded-md border-black bg-white p-2 transition-colors-opacity',
        selected ? 'border-2' : 'border',
        dragging ? 'opacity-50' : ''
      )}
    >
      {validationElement}
      {data.type === 'providerRole' && <ProviderRoleList data={data} />}
      {data.type === 'workTaskType' && <WorkTaskTypeList data={data} />}
    </BaseReadOnlyNode>
  );
}

function ProviderRoleList({ data }: { data: ProviderRoleClassification }) {
  return (
    <ul>
      {data.memberIdList.map((pRole) => (
        <li key={pRole}>{pRole}</li>
      ))}
    </ul>
  );
}

function WorkTaskTypeList({ data }: { data: WorkTaskTypeClassification }) {
  const projectionWttIds = data.memberIdList;

  const { currentState } = useLazyDtoListListener<WorkTaskTypeProjection>(
    projectionWttIds,
    EntityClassMap.workTaskTypeProjection
  );

  const projectionTotal = useMemo(() => {
    return [...currentState.values()]
      .map((entity) => entity.totalTaskVolume)
      .reduce((prev, curr) => (prev += curr), 0);
  }, [currentState]);

  return (
    <div className={'flex flex-col'}>
      <h3>Total projection: {projectionTotal}</h3>
      <ul className={'flex flex-col gap-1'}>
        {data.memberIdList.map((wtt) => (
          <li key={wtt} className={'flex items-center gap-1'}>
            <LazyDtoUiWrapper
              renderAs={memoAmount}
              entityId={wtt}
              entityClass={EntityClassMap.workTaskTypeProjection}
              whileLoading={() => <Spinner size={'sm'} />}
            />
            <LazyDtoUiWrapper
              renderAs={WorkTaskTypeDisplayLabel}
              entityId={wtt}
              entityClass={EntityClassMap.workTaskType}
              whileLoading={() => wtt}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

function WorkTaskTypeDisplayLabel(props: BaseLazyDtoUiProps<WorkTaskTypeDto>) {
  return <div className={'inline-block'}>{props.entity.name}</div>;
}

const memoAmount = memo(WorkTaskTypeProjectionAmount);

function WorkTaskTypeProjectionAmount({
  entity: { totalTaskVolume }
}: BaseLazyDtoUiProps<WorkTaskTypeProjection>) {
  const maxProjection = useMaxProjectionListener();
  const colorString = useMemo(() => {
    const rgbString = projectionRatioInterpolator(
      totalTaskVolume / maxProjection
    );
    const rgbColor = rgb(rgbString);
    rgbColor.opacity = 0.5;
    return rgbColor.toString();
  }, [totalTaskVolume, maxProjection]);
  return (
    <div
      className={'w-12 min-w-12 rounded-lg px-2 text-right'}
      style={{ backgroundColor: colorString }}
    >
      {totalTaskVolume}
    </div>
  );
}

const projectionRatioInterpolator = interpolateHsl('chartreuse', 'red');
