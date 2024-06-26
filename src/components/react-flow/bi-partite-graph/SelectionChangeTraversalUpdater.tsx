import { useUuidListenerKey } from '@/hooks/useUuidListenerKey';
import { useMemo, useRef } from 'react';
import { useGlobalController } from 'selective-context';
import { useReadAnyDto, useWriteAnyDto } from 'dto-stores';
import { BandwidthValidationTraversal } from '@/app/service-categories/[id]/roles/providers/[roleTypeId]/bandwidth-graph/types';
import { EntityClassMap } from '@/api/entity-class-map';
import { OnSelectionChangeParams, useOnSelectionChange } from 'reactflow';
import { ObjectPlaceholder } from '@/api/literals';

export function SelectionChangeTraversalUpdater() {
  const listenerKey = useUuidListenerKey();
  const selectedSetRef = useRef(new Set<string>());
  const { dispatch } = useGlobalController({
    contextKey: 'selectedNodeIdSet',
    listenerKey,
    initialValue: selectedSetRef
  });
  const readAnyBvt = useReadAnyDto<BandwidthValidationTraversal>(
    EntityClassMap.bandwidthValidationTraversal
  );
  const writeAnyLayer = useWriteAnyDto(EntityClassMap.bandwidthValidationLayer);

  // the passed handler has to be memoized, otherwise the hook will not work correctly
  const onChange = useMemo(() => {
    const onChange = ({ nodes, edges }: OnSelectionChangeParams) => {
      const strings = nodes.map((n) => n.id);
      if (nodes.length === 0) {
        for (let id of selectedSetRef.current.values()) {
          writeAnyLayer(id, ObjectPlaceholder);
        }
        console.log('removing traversal mappings');
        // remove mappings
      } else if (nodes.length === 1) {
        const node = nodes[0];
        console.log(node);
        const selectedTraversal = readAnyBvt(node.id);
        if (selectedTraversal !== undefined) {
          console.log(selectedTraversal);
          selectedTraversal.layers.forEach((layer) => {
            [
              ...layer.taskClassificationIdList,
              ...layer.resourceClassificationIdList
            ].forEach((memberId) => writeAnyLayer(memberId, layer));
          });
        }
        console.log('adding traversal mappings');
        // setup traversal mapping
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
