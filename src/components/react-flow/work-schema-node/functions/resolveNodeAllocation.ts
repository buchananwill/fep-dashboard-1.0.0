import { DataNode } from 'react-d3-force-wrapper';
import { WorkSchemaDto } from '@/api/generated-types/generated-types_';
import { isNotUndefined } from '@/api/main';
import { WorkSchemaNodeDto } from '@/components/react-flow/generic/utils/adaptors';
import { getIntListFromDeliveryAllocations } from '@/components/react-flow/work-schema-node/functions/getIntListFromDeliveryAllocations';

interface GraphRollupData {
  readLeafSchema: (id: string) => WorkSchemaDto | undefined;
  idToChildIdMap: Map<string, Set<string>>;
  idToNodeMap: Map<string, DataNode<WorkSchemaNodeDto>>;
}

export function resolveNodeAllocation(
  node: DataNode<WorkSchemaNodeDto>,
  allowBundle: boolean,
  commonData: GraphRollupData
): Map<string, number[]> {
  const { readLeafSchema, idToChildIdMap, idToNodeMap } = commonData;
  const responseMap = new Map<string, number[]>();
  const { data, id } = node;
  const {
    workSchemaId,
    carouselOptionId,
    resolutionMode,
    childrenAs,
    carouselId
  } = data;
  let schema: WorkSchemaDto | undefined = undefined;
  let deliveryAllocationTokenList: number[] = [];

  // BASE CASES
  if (workSchemaId || carouselOptionId) {
    schema = readLeafSchema(node.id);
    if (schema) {
      deliveryAllocationTokenList = getIntListFromDeliveryAllocations(
        schema.deliveryAllocations
      );
      responseMap.set(node.id, deliveryAllocationTokenList);
      return responseMap;
    }
  }

  function getChildrenRollupMap(
    childIdList: string[],
    propagatedBundlePermission: boolean
  ) {
    return childIdList
      .map((childId) => idToNodeMap.get(childId))
      .filter(isNotUndefined)
      .map((childNode) => {
        return resolveNodeAllocation(
          childNode,
          propagatedBundlePermission,
          commonData
        );
      })
      .reduce(
        (prevMap: Map<string, number[]>, currMap: Map<string, number[]>) => {
          currMap.forEach((value, key) => prevMap.set(key, value));
          return prevMap;
        },
        new Map<string, number[]>()
      );
  }

  const childIdSet = idToChildIdMap.get(id);
  const propagatedBundlePermission = resolutionMode === 'OPEN' && allowBundle;

  if (childIdSet) {
    const childIdList = [...childIdSet.values()];
    const childrenRollupMap = getChildrenRollupMap(
      childIdList,
      propagatedBundlePermission
    );
    childrenRollupMap.forEach((value, key) => responseMap.set(key, value));

    // CAROUSEL RECURSION
    if (childrenAs === 'CAROUSEL' || carouselId) {
      const childNumberLists = childIdList
        .map((childId) => childrenRollupMap.get(childId))
        .filter(isNotUndefined)
        .map((list) => [...list]);
      let modification = childNumberLists.length > 0;
      while (modification) {
        let largestSize = 0;
        for (let childNumberList of childNumberLists) {
          if (childNumberList.length === 0) continue;
          const topNumber = childNumberList.splice(0, 1)[0];
          largestSize = Math.max(largestSize, topNumber);
        }
        modification = largestSize > 0;
        if (modification) {
          deliveryAllocationTokenList.push(largestSize);
        }
      }
    }

    // SERIAL OR OPEN RECURSION
    else {
      deliveryAllocationTokenList = childIdList
        .map((childId) => childrenRollupMap.get(childId))
        .filter(isNotUndefined)
        .reduce((prev, curr) => [...prev, ...curr], [])
        .sort((a, b) => b - a);
    }
  }
  responseMap.set(id, deliveryAllocationTokenList);
  return responseMap;
}
