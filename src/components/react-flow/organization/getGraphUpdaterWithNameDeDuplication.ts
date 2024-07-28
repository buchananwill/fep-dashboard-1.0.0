import {
  GraphDto,
  GraphDtoPutRequestBody,
  HasName,
  HasNumberId,
  incrementCloneSuffix
} from 'react-d3-force-wrapper';
import _ from 'lodash';

export function getGraphUpdaterWithNameDeDuplication<
  T extends HasNumberId & HasName
>(
  putUpdatedGraph: (
    incomingRequest: GraphDtoPutRequestBody<T>
  ) => Promise<GraphDto<T>>
): (interceptedRequest: GraphDtoPutRequestBody<T>) => Promise<GraphDto<T>> {
  return (requestToBeIntercepted: GraphDtoPutRequestBody<T>) => {
    const { graphDto } = requestToBeIntercepted;
    const { nodes } = graphDto;
    const hasNameDtos = nodes.map((dn) => dn.data);
    const dtosWithNamesDeDuplicated =
      deDuplicateNameAllowUndefined(hasNameDtos);
    const nodesWithDataNamesDeDuplicated = nodes.map((dn, index) => {
      const replacementData = dtosWithNamesDeDuplicated[index];
      if (replacementData.id !== dn.id)
        throw Error('Arrays not aligned. Could not clone nodes.');
      const cloneDeep = _.cloneDeep(dn);
      cloneDeep.data = replacementData;
      return cloneDeep;
    });
    const safeGraph: GraphDto<T> = {
      ...graphDto,
      nodes: nodesWithDataNamesDeDuplicated
    };
    const safeRequest = { ...requestToBeIntercepted, graphDto: safeGraph };
    return putUpdatedGraph(safeRequest);
  };
}

export function deDuplicateNameAllowUndefined<T extends HasName>(
  listOfNamedEntities: T[]
) {
  const set = new Set<string>();
  return listOfNamedEntities.map((entity) => {
    let name = entity.name;
    while (name !== undefined && set.has(name)) {
      name = incrementCloneSuffix(name);
    }
    set.add(name);
    const clonedEntity = _.cloneDeep(entity);
    clonedEntity.name = name;
    return clonedEntity;
  });
}
