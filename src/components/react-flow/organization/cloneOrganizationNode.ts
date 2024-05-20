import {
  DataNode,
  HasName,
  HasNumberId,
  incrementCloneSuffix,
} from "react-d3-force-graph";

export function cloneOrganizationNode<T extends HasNumberId & HasName>(
  templateNode: DataNode<T>,
): DataNode<T> {
  const {
    data: { name },
  } = templateNode;
  let cloneName = incrementCloneSuffix(name);

  return {
    ...templateNode,
    data: { ...templateNode.data, name: cloneName },
  };
}
