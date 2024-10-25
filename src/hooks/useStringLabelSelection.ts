import { HasIdClass } from '@/api/types';
import { Identifier } from 'dto-stores';
import { DispatchState } from '@/types';
import { TypedPaths } from '@/api/custom-types/typePaths';
import { useLabelMaker } from '@/hooks/useLabelMaker';
import { useValueListValueMapAndIdMap } from '@/hooks/useValueListValueMapAndIdMap';
import { useSelectionIdListToValueListMemo } from '@/hooks/useSelectionIdListToValueListMemo';
import { useStringSelectionListToIdListCallback } from '@/hooks/useStringSelectionListToIdListCallback';

export function useStringLabelSelection<T extends HasIdClass>(
  masterList: T[],
  selectedIdList: Identifier[],
  dispatchIdList: DispatchState<Identifier[]>,
  labelMaker?: (string & TypedPaths<T, string | number>) | ((item: T) => string)
) {
  const getLabel = useLabelMaker(labelMaker);
  const { labelList, selectableMap, idMap } = useValueListValueMapAndIdMap<T>(
    masterList,
    getLabel
  );
  const selectionList = useSelectionIdListToValueListMemo(
    selectedIdList,
    idMap,
    getLabel
  );
  const onChange = useStringSelectionListToIdListCallback(
    selectableMap,
    dispatchIdList
  );
  return { labelList, selectionList, onChange };
}
