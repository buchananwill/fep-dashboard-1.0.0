"use client";

import React, { useMemo } from "react";

import { useGlobalReadAny } from "selective-context";
import {
  ForceAttributesDto,
  ForceAttributesInitial,
  GraphSelectiveContextKeys,
  useGraphListener,
  useGraphName,
} from "react-d3-force-graph";
import { SelectiveContextRangeSlider } from "@/react-flow/components/generic/SelectiveContextRangeSlider";

const listenerKey = "graph-force-adjustment";
export function GraphForceSliders() {
  const uniqueGraphName = useGraphName();
  const selectiveContextReadAll = useGlobalReadAny<boolean>();

  const { currentState: show } = useGraphListener(
    GraphSelectiveContextKeys.showForceEditing,
    listenerKey,
    false,
  );

  const sliders = useMemo(
    () =>
      Object.entries(ForceAttributesInitial).map((entry) => {
        if (entry[0] === "id") {
          return null;
        }
        const showThisSlider = selectiveContextReadAll(`${entry[0]}:show`);

        if (showThisSlider === false) return null;

        const contextKey = `${uniqueGraphName}:${entry[0]}`;
        const entryKey = entry[0] as keyof ForceAttributesDto;
        const initial = ForceAttributesInitial[entryKey];
        return (
          <SelectiveContextRangeSlider
            key={`slider:${contextKey}`}
            contextKey={contextKey}
            initialValue={initial}
            listenerKey={"slider"}
          />
        );
      }),
    [uniqueGraphName, selectiveContextReadAll],
  );

  return <>{show ? [...sliders] : []}</>;
}
