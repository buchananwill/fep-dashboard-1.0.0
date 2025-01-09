'use client';
import { useEditableFlow } from '@/components/react-flow/generic/hooks/useEditableFlow';
import { FlowEdge, FlowNode } from '@/components/react-flow/generic/types';
import { InitJsonTemplateNodeData } from '@/components/react-flow/init-json-template/types';
import { idDecrementer } from '@/components/work-schema-node-assignments/enrollment-table/GetNextIdDecrement';
import { templateWorkSchemaNodeLink } from '@/components/react-flow/work-schema-node/components/WorkSchemaNodeLayoutFlowWithForces';
import { Api } from '@/api/clientApi';
import { convertInitJsonTemplateDataNodeToFlowNode } from '@/components/react-flow/generic/utils/adaptors';
import { EntityClassMap } from '@/api/entity-class-map';
import {
  GraphSelectiveContextKeys,
  reMapNodeIdWithoutValidating,
  useGraphController
} from 'react-d3-force-wrapper';
import { HierarchicalDataOptions } from '@/components/react-flow/generic/hooks/getHierarchicalDataLayout';
import { UseForcesParams } from '@/components/react-flow/generic/hooks/useForces';
import { collide } from '@/components/react-flow/generic/utils/collide';
import { dagreForce } from '@/components/react-flow/generic/hooks/getDagreForce';
import { Background, BackgroundVariant, ReactFlow } from '@xyflow/react';
import { FlowOverlay } from '@/components/react-flow/generic/components/generic/FlowOverlay';
import React from 'react';
import { PendingOverlay } from '@/components/overlays/pending-overlay';
import { TopToBottomEdge } from '@/components/react-flow/generic/components/edges/TopToBottomEdge';
import { InitJsonTemplateNode } from '@/components/react-flow/init-json-template/components/InitJsonTemplateNode';

export function InitJsonTemplateFlow() {
  const { flowOverlayProps, reactFlowProps, contextData, isPending } =
    useEditableFlow<InitJsonTemplateNodeData>(
      cloneInitJsonTemplate,
      TemplateInitJsonTemplateNode,
      TemplateLink,
      Api.InitJsonTemplate.putGraph,
      convertInitJsonTemplateDataNodeToFlowNode,
      EntityClassMap.initJsonTemplate,
      reMapNodeIdWithoutValidating,
      forcesParams
    );

  useGraphController(
    GraphSelectiveContextKeys.nodeLabelAccessor,
    ijtLabelAccessor
  );

  return (
    <ReactFlow {...reactFlowProps} nodeTypes={nodeTypes} edgeTypes={edgeTypes}>
      <PendingOverlay pending={isPending} />
      <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      <FlowOverlay {...flowOverlayProps} />
    </ReactFlow>
  );
}

const cloneInitJsonTemplate = {
  memoizedFunction: (node: FlowNode<InitJsonTemplateNodeData>) => {
    const clone = structuredClone(node);
    const cloneId = idDecrementer();
    clone.id = String(cloneId);
    clone.data.id = cloneId;
    return clone;
  }
};

const TemplateInitJsonTemplateNode: FlowNode<InitJsonTemplateNodeData> = {
  id: '-1',
  data: {
    id: -1,
    content: '',
    dataType: {
      id: -1,
      name: 'NOT_DEFINED'
    },
    name: 'placeholder'
  },
  position: { x: 0, y: 0 }
} as const;

const TemplateLink = {
  ...templateWorkSchemaNodeLink,
  closureType: 'init-json-template-closure'
} as FlowEdge<InitJsonTemplateNodeData>;

const initialValue: HierarchicalDataOptions = {
  orientation: 'vertical',
  nodeSize: [300, 300],
  algorithm: 'dagre'
};

const forcesParams: UseForcesParams = {
  applyFitView: false,
  forceFunctions: {
    collide: collide.strength(0.01),
    custom: dagreForce
  },
  hierarchyOptions: initialValue
};

const edgeTypes = {
  default: TopToBottomEdge
};

const nodeTypes = {
  default: InitJsonTemplateNode,
  KNOWLEDGE_DOMAIN: InitJsonTemplateNode,
  ASSET_TYPE: InitJsonTemplateNode,
  ORGANIZATION_TYPE_LIST: InitJsonTemplateNode,
  USER_ROLE_TYPE_LIST: InitJsonTemplateNode,
  ASSET_ROLE_TYPE_LIST: InitJsonTemplateNode,
  PROVIDER_ROLE_TYPE_LIST: InitJsonTemplateNode,
  CYCLE_DEFINITION: InitJsonTemplateNode,
  WORK_TASK_TYPE_NAME_STRINGS: InitJsonTemplateNode,
  KNOWLEDGE_LEVEL_SERIES_LIST: InitJsonTemplateNode,
  RESOURCE_REQUIREMENT_SUMMARY_LIST: InitJsonTemplateNode,
  WORK_SCHEMA_NODE: InitJsonTemplateNode,
  ORGANIZATION_WORK_HIERARCHY: InitJsonTemplateNode,
  AUTO_CAROUSEL_OPTIONS: InitJsonTemplateNode,
  CAROUSEL_ORDERS: InitJsonTemplateNode,
  PROVIDER_ROLES: InitJsonTemplateNode,
  ASSET_ROLES: InitJsonTemplateNode
};

const ijtLabelAccessor = {
  memoizedFunction: (params: [InitJsonTemplateNodeData, string]) =>
    params[0].name
};
