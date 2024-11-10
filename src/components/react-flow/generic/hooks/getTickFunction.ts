import { MutableRefObject } from 'react';
import { Simulation } from 'd3';
import { DataLink, DataNode } from 'react-d3-force-wrapper';
import { HasNumberId } from '@/api/types';
import { FlowNode } from '@/components/react-flow/generic/types';
import { useReactFlow } from '@xyflow/react';

export function getTickFunction(
  running: () => boolean,
  simRef: MutableRefObject<
    Simulation<DataNode<HasNumberId>, DataLink<HasNumberId>>
  >,
  nodeListRef: MutableRefObject<DataNode<HasNumberId>[]>,
  draggingNode: MutableRefObject<FlowNode<any>> | undefined,
  setNodes: ReturnType<typeof useReactFlow>['setNodes'],
  selectionRef: MutableRefObject<Set<string>>,
  applyFitView: boolean | undefined,
  fitView: ReturnType<typeof useReactFlow>['fitView']
) {
  // The tick function is called every animation frame while the simulation is
  // running and progresses the simulation one step forward each time.
  const tick = async () => {
    let nodeIndex = NaN;
    const simulation = simRef.current;
    const scopedNodes = nodeListRef.current;

    let foundDrag = false;
    for (let i = 0; i < scopedNodes.length; i++) {
      const node = scopedNodes[i];

      const dragging = draggingNode?.current?.id === node?.id;
      // Setting the fx/fy properties of a node tells the simulation to "fix"
      // the node at that position and ignore any forces that would normally
      // cause it to move.
      if (dragging) {
        foundDrag = true;
        nodeIndex = i;
        // Copy the current position from the ref
        node.fx = draggingNode?.current?.position?.x;
        node.fy = draggingNode?.current?.position?.y;
        // node.selected = !!node.selectable; // todo: try this if the selection set doesn't work
      } else if (node) {
        // node.selected = false; // todo: see line 41 ^^^
        delete node.fx;
        delete node.fy;
      }
    }

    simulation.tick();

    setNodes((nodes) => {
      return nodes.map((node, index) => {
        const updatedNode = { ...node };
        const scopedNode = scopedNodes[index];
        if (scopedNode.id !== updatedNode.id)
          throw new Error('Node arrays not in sync: unable to update');
        const xPos = scopedNode.fx ?? scopedNode.x ?? 0;
        const yPos = scopedNode.fy ?? scopedNode.y ?? 0;
        updatedNode.position = {
          x: isNaN(xPos) ? 0 : xPos,
          y: isNaN(yPos) ? 0 : yPos
        };
        return updatedNode;
      });
    });

    window.requestAnimationFrame(async () => {
      // Give React and React Flow a chance to update and render the new node
      // positions before we fit the viewport to the new layout.
      if (applyFitView) fitView();

      // If the simulation hasn't been stopped, schedule another tick.
      if (running()) await tick();
    });
  };

  return tick;
}
