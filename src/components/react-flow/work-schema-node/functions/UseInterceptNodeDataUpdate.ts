import { DispatchState } from '@/types';
import { MemoizedFunction } from 'react-d3-force-wrapper';
import { WorkSchemaNodeDto } from '@/components/react-flow/generic/utils/adaptors';
import { useEffect } from 'react';
import { determineLocalResolution } from '@/components/react-flow/work-schema-node/functions/workSchemaNodeCallbacks';

export function useInterceptNodeDataUpdate(
  dispatchWithoutListen: DispatchState<
    MemoizedFunction<WorkSchemaNodeDto, void>
  >,
  checkToggleFirstAndAfter: () => void
) {
  useEffect(() => {
    dispatchWithoutListen(
      (prevFunction: MemoizedFunction<WorkSchemaNodeDto, void>) => {
        checkToggleFirstAndAfter();
        const { memoizedFunction } = prevFunction;
        const interceptValidateResolutionMode = (
          updatedNode: WorkSchemaNodeDto
        ) => {
          const localResolution = determineLocalResolution(updatedNode);
          let interceptedNode = updatedNode;
          if (localResolution !== updatedNode.resolutionMode) {
            interceptedNode = {
              ...updatedNode,
              resolutionMode: localResolution
            };
          }
          return memoizedFunction(interceptedNode);
        };

        return { memoizedFunction: interceptValidateResolutionMode };
      }
    );
  }, [dispatchWithoutListen, checkToggleFirstAndAfter]);
}