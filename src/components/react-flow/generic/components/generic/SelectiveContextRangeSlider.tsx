"use client";
import React, { useCallback } from "react";
import { useGlobalDispatchAndListener } from "selective-context";
import { Slider } from "@nextui-org/slider";

export function SelectiveContextRangeSlider({
  contextKey,
  initialValue,
  listenerKey,
  maxValue = 200,
  minValue = 0,
  className = "",
}: {
  contextKey: string;
  initialValue: number;
  listenerKey: string;
  maxValue?: number;
  minValue?: number;
  className?: string;
}) {
  const { currentState, dispatchWithoutControl: dispatchUpdate } =
    useGlobalDispatchAndListener({
      contextKey,
      listenerKey,
      initialValue,
    });

  const onSliderChange = useCallback(
    (value: number | number[]) => {
      const singleValue = Array.isArray(value) ? value[0] : value;
      dispatchUpdate(singleValue);
    },
    [dispatchUpdate],
  );

  return (
    <Slider
      className={className}
      label={contextKey.substring(contextKey.indexOf(":") + 1)}
      hideValue={false}
      showTooltip={true}
      hideThumb
      size={"md"}
      name={contextKey}
      id={contextKey}
      minValue={minValue}
      maxValue={maxValue}
      value={currentState}
      aria-label={contextKey}
      onChange={onSliderChange}
    ></Slider>
  );
}
