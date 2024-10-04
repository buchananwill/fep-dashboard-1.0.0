import { HasNumberId } from '@/api/types';
import { DataNode } from 'react-d3-force-wrapper';
import { isNotUndefined } from '@/api/main';

export function recalculateDepths<T extends HasNumberId>(
  prevNodes: DataNode<T>[],
  nodeTarget: DataNode<T>,
  idToChildIdMap: Map<string, Set<string>>,
  idToNodeMap: Map<string, DataNode<T>>,
  startingDepth: number
) {
  const breadthFirstSets: Set<string>[] = [];
  breadthFirstSets.push(new Set([nodeTarget.id]));
  const childIdSet = idToChildIdMap.get(nodeTarget.id);
  let modification = false;
  if (childIdSet) {
    breadthFirstSets.push(childIdSet);
    modification = true;
  }
  // get all the child lists for the current layer
  // add the children to the overall next layer list
  // if we added any children, go back round that layer and repeat

  while (modification) {
    const breadthFirstList = breadthFirstSets[breadthFirstSets.length - 1];
    const newChildren = [...breadthFirstList.values()]
      .map((id) => idToChildIdMap.get(id))
      .filter(isNotUndefined)
      .reduce((prev, curr) => {
        if (curr !== undefined && prev !== undefined) {
          curr.forEach((value) => prev.add(value));
        }
        return prev;
      }, new Set<string>());
    if (newChildren.size > 0) {
      modification = true;
      breadthFirstSets.push(newChildren);
    } else {
      modification = false;
    }
  }
  if (breadthFirstSets.length > 0) {
    const modifiedDepthNodes = new Map<string, DataNode<T>>();
    modifiedDepthNodes.set(nodeTarget.id, nodeTarget);
    breadthFirstSets.forEach((nextSet, index) => {
      [...nextSet.values()]
        .map((idValue) => idToNodeMap.get(idValue))
        .filter(isNotUndefined)
        .map((oldNode) => ({
          ...oldNode,
          distanceFromRoot: startingDepth + 1 + index
        }))
        .forEach((updateNode) =>
          modifiedDepthNodes.set(updateNode.id, updateNode)
        );
    });
    return prevNodes.map((oldNode) => {
      const updatedDepthNode = modifiedDepthNodes.get(oldNode.id);
      if (updatedDepthNode) return updatedDepthNode;
      else return oldNode;
    });
  } else return prevNodes;
}
