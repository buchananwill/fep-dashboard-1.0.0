'use client';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
import { ResponsiveNetwork } from '@nivo/network';

export interface NivoNetwork {
  nodes: { id: string; height: number; size: number; color: string }[];
  links: { source: string; target: string; distance: number }[];
}

export const MyResponsiveNetwork = ({
  data
}: {
  data: NivoNetwork /* see data tab */;
}) => (
  <ResponsiveNetwork
    data={data}
    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
    linkDistance={(e) => e.distance}
    centeringStrength={1}
    repulsivity={5}
    iterations={208}
    nodeSize={(n) => n.size}
    activeNodeSize={(n) => 1.5 * n.size}
    nodeColor={(e) => e.color}
    nodeBorderWidth={1}
    nodeBorderColor={{
      from: 'color',
      modifiers: [['darker', 0.8]]
    }}
    linkThickness={(n) => 2 + 2 * n.target.data.height}
    linkBlendMode="multiply"
    motionConfig="wobbly"
  />
);
