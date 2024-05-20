"use client";
import React, { PropsWithChildren } from "react";
import { ReactFlowProvider } from "reactflow";

import "reactflow/dist/style.css";

export function ReactFlowWrapper({ children }: PropsWithChildren) {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlowProvider>{children}</ReactFlowProvider>
    </div>
  );
}
