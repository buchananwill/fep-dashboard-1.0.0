import {
  Force,
  quadtree,
  QuadtreeLeaf,
  SimulationLinkDatum,
  SimulationNodeDatum
} from 'd3';
import { FlowNode } from '@/react-flow/types';
import { Merge, RequiredDeep, SetRequired } from 'type-fest';

type FlowNodeWithSize = RequiredDeep<Pick<FlowNode<any>, 'measured'>>;

type FlowNodePosition = SetRequired<FlowNode<any>, 'x' | 'y'>;

type CollisionNode = Merge<FlowNodePosition, FlowNodeWithSize>;

function conditionallyModifySpacing(
  spacing: number,
  spacingMin: number,
  alpha: number,
  node: CollisionNode,
  quadLeaf: QuadtreeLeaf<CollisionNode>,
  strength: number
) {
  if (Math.abs(spacing) < spacingMin) {
    let spacingDelta = ((Math.abs(spacing) - spacingMin) / spacing) * alpha;
    node.x -= spacingDelta * strength;
    quadLeaf.data.x += spacingDelta;
  }
}

type CollideForce = Force<
  SimulationNodeDatum,
  SimulationLinkDatum<SimulationNodeDatum>
> & {
  strength: (newStrength: number) => CollideForce;
};

export const collide = getCollide();

function isSafeCollisionNode(quadLeafUnsafe: QuadtreeLeaf<FlowNode<any>>) {
  return (
    !!quadLeafUnsafe &&
    !!quadLeafUnsafe?.data?.measured?.width &&
    !!quadLeafUnsafe.data.measured.height
  );
}

function getCollide() {
  let nodes = [] as FlowNode<any>[];
  let strength = 1;
  function force(alpha: number) {
    console.log('strength:', strength);
    const tree = quadtree(
      nodes,
      (d) => d.x || 0,
      (d) => d.y || 0
    );

    for (const unsafeNode of nodes) {
      if (
        !unsafeNode.measured ||
        !unsafeNode.measured.height ||
        !unsafeNode.measured.width ||
        !unsafeNode.x ||
        !unsafeNode.y
      )
        continue;
      const node = unsafeNode as CollisionNode;
      const w = node.measured.width / 2;
      const h = node.measured.height / 2;
      const nx1 = node.x - w;
      const nx2 = node.x + w;
      const ny1 = node.y - h;
      const ny2 = node.y + h;

      tree.visit((quad, x1, y1, x2, y2) => {
        if (!quad.length) {
          let quadLeafUnsafe = quad as QuadtreeLeaf<FlowNode<any>> | undefined;
          while (!!quadLeafUnsafe) {
            if (
              quadLeafUnsafe.data !== node &&
              isSafeCollisionNode(quadLeafUnsafe)
            ) {
              const quadLeaf = quadLeafUnsafe as QuadtreeLeaf<CollisionNode>;
              const xSpacingMin =
                node.measured.width / 2 + quadLeaf.data.measured.width / 2;
              const ySpacingMin =
                node.measured.height / 2 + quadLeaf.data.measured.height / 2;
              let xSpacing = node.x - quadLeaf.data.x;
              let ySpacing = node.y - quadLeaf.data.y;
              // let l = Math.hypot(x, y);

              conditionallyModifySpacing(
                xSpacing,
                xSpacingMin,
                alpha,
                node,
                quadLeaf,
                strength
              );
              conditionallyModifySpacing(
                ySpacing,
                ySpacingMin,
                alpha,
                node,
                quadLeaf,
                strength
              );
            }
            quadLeafUnsafe = quadLeafUnsafe.next;
          }
        }

        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      });
    }
  }

  force.initialize = (newNodes: CollisionNode[]) => (nodes = newNodes);
  force.strength = (newStrength: number) => {
    // strength = newStrength;
    return force;
  };

  return force;
}
