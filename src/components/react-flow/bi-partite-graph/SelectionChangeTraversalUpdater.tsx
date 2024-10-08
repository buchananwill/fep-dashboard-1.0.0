import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useMemo, useRef } from 'react';
import { useGlobalController } from 'selective-context';
import { useReadAnyDto, useWriteAnyDto } from 'dto-stores';
import { OnSelectionChangeParams, useOnSelectionChange } from '@xyflow/react';
import { ObjectPlaceholder } from '@/api/literals';
import { BandwidthValidationTraversal } from '@/api/zod-schemas/BandwidthValidationTraversalSchema';

const bandwidthValidationTraversal = 'bandwidthValidationTraversal';

const bandwidthValidationLayer = 'bandwidthValidationLayer';

export function SelectionChangeTraversalUpdater() {
  const listenerKey = useUuidListenerKey();
  const selectedSetRef = useRef(new Set<string>());
  const { dispatch } = useGlobalController({
    contextKey: 'selectedNodeIdSet',
    listenerKey,
    initialValue: selectedSetRef
  });
  const readAnyBvt = useReadAnyDto<BandwidthValidationTraversal>(
    bandwidthValidationTraversal
  );
  const writeAnyLayer = useWriteAnyDto(bandwidthValidationLayer);

  // the passed handler has to be memoized, otherwise the hook will not work correctly
  const onChange = useMemo(() => {
    const onChange = ({ nodes, edges }: OnSelectionChangeParams) => {
      const strings = nodes.map((n) => n.id);
      // remove mappings
      if (nodes.length === 0) {
        if (selectedSetRef.current.size === 1) {
          const selectedTraversal = readAnyBvt(
            [...selectedSetRef.current.values()][0]
          );
          if (selectedTraversal) {
            selectedTraversal.layers.forEach((layer) => {
              [
                ...layer.taskClassificationIdList,
                ...layer.resourceClassificationIdList
              ].forEach((memberId) =>
                writeAnyLayer(memberId, ObjectPlaceholder)
              );
            });
          }
        }
      } else if (nodes.length === 1) {
        // setup traversal mapping
        const node = nodes[0];
        const selectedTraversal = readAnyBvt(node.id);
        if (selectedTraversal !== undefined) {
          selectedTraversal.layers.forEach((layer) => {
            [
              ...layer.taskClassificationIdList,
              ...layer.resourceClassificationIdList
            ].forEach((memberId) => writeAnyLayer(memberId, layer));
          });
        }
      } else {
        // do nothing for now. Could possibly try to resolve in the future?
      }
      selectedSetRef.current = new Set(strings);
    };
    return { onChange };
  }, [selectedSetRef, writeAnyLayer, readAnyBvt]);

  useOnSelectionChange(onChange);
  return null;
}
