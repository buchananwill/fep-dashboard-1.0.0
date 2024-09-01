'use client';
import { NodeProps } from '@xyflow/react';
import { WorkTaskTypeDto } from '@/api/zod-schemas/WorkTaskTypeDtoSchema';
import { BaseReadOnlyNode } from '@/react-flow/components/nodes/BaseReadOnlyNode';
import React, { memo, useMemo } from 'react';
import {
  BaseLazyDtoUiProps,
  LazyDtoUiWrapper,
  useLazyDtoListListener
} from 'dto-stores';
import { WorkTaskTypeProjection } from '@/components/react-flow/bi-partite-graph/BandwidthLayoutFlowWithForces';
import { EntityClassMap } from '@/api/entity-class-map';
import { Spinner } from '@nextui-org/spinner';
import { useMaxProjectionListener } from '@/components/react-flow/bi-partite-graph/useMaxProjectionController';
import { interpolateHsl, rgb } from 'd3';
import { useGlobalController } from 'selective-context';
import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { ObjectPlaceholder } from '@/api/literals';
import { BandwidthValidationLayer } from '@/app/service-categories/[id]/roles/bandwidth-graph/types';
import clsx from 'clsx';
import { NodeBase } from '@/react-flow/types';
import { NodeDataType } from '@/react-flow/utils/adaptors';

type BaseClassification = NodeDataType & {
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

export default function ClassificationNode(
  props: NodeProps<NodeBase<Classification>>
) {
  const { dragging, data, selected } = props;
  const listenerKey = useUuidListenerKey();

  const { currentState: bandwidthValidationLayer } = useGlobalController({
    contextKey: `BandwidthValidationLayer:${data.id}`,
    listenerKey,
    initialValue: ObjectPlaceholder as BandwidthValidationLayer
  });
  const validationElement = useMemo(() => {
    if (bandwidthValidationLayer !== ObjectPlaceholder) {
      return (
        <div className={'inline-block rounded-lg'}>
          {bandwidthValidationLayer.residualBandwidth}
        </div>
      );
    } else {
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

const WorkTaskTypeProjectionClassName = 'WorkTaskTypeProjection';

function WorkTaskTypeList({ data }: { data: WorkTaskTypeClassification }) {
  const projectionWttIds = data.memberIdList;

  const { currentState } = useLazyDtoListListener<WorkTaskTypeProjection>(
    projectionWttIds,
    WorkTaskTypeProjectionClassName
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
              entityClass={WorkTaskTypeProjectionClassName}
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
