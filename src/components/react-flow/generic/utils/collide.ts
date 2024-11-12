import { quadtree, QuadtreeLeaf } from 'd3';
import { FlowNode } from '@/components/react-flow/generic/types';
import { Merge, RequiredDeep, SetRequired } from 'type-fest';
import { isNonZeroFalsy } from '@/api/main';

type FlowNodeWithSize = RequiredDeep<Pick<FlowNode<any>, 'measured'>>;

type FlowNodePosition = SetRequired<FlowNode<any>, 'x' | 'y'>;

type CollisionNode = Merge<FlowNodePosition, FlowNodeWithSize>;

function modifySpacing(
  spacing: number,
  spacingMin: number,
  alpha: number,
  node: CollisionNode,
  quadLeaf: QuadtreeLeaf<CollisionNode>,
  strength: number,
  dimension: 'x' | 'y',
  ratio: number
) {
  let spacingDelta =
    (spacingMin - Math.abs(spacing)) *
    alpha *
    strength *
    ratio *
    (spacing / Math.abs(spacing));

  spacingDelta = spacingDelta || 0;
  if (isNonZeroFalsy(node.fx) && isNonZeroFalsy(node.fy)) {
    let current = node[dimension] || 0;
    current -= spacingDelta;
    node[dimension] = current;
  }
  if (!quadLeaf.data.fx && !quadLeaf.data.fy) {
    let current = quadLeaf.data[dimension] || 0;
    current += spacingDelta;
    quadLeaf.data[dimension] = current;
  }
}

export const collide = getCollide();

function isSafeCollisionNode(quadLeafUnsafe: QuadtreeLeaf<FlowNode<any>>) {
  return (
    !!quadLeafUnsafe &&
    !!quadLeafUnsafe?.data?.measured?.width &&
    !!quadLeafUnsafe.data.measured.height
  );
}

function getOverlapRatio(spacingMin: number, spacing: number) {
  return (spacingMin - Math.abs(spacing)) / spacingMin;
}

function getCollide() {
  let nodes = [] as FlowNode<any>[];
  let strength = 0.5;
  let gap = 0;

  function force(alpha: number) {
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
              quadLeafUnsafe.data.id !== node.id &&
              isSafeCollisionNode(quadLeafUnsafe)
            ) {
              const quadLeaf = quadLeafUnsafe as QuadtreeLeaf<CollisionNode>;
              const xSpacingMin =
                node.measured.width / 2 +
                quadLeaf.data.measured.width / 2 +
                gap;
              const ySpacingMin =
                node.measured.height / 2 +
                quadLeaf.data.measured.height / 2 +
                gap;
              let xSpacing = quadLeaf.data.x - node.x;
              let ySpacing = quadLeaf.data.y - node.y;
              const collision =
                Math.abs(xSpacing) < xSpacingMin &&
                Math.abs(ySpacing) < ySpacingMin;
              if (collision) {
                const xRatio = getOverlapRatio(xSpacingMin, xSpacing);
                const yRatio = getOverlapRatio(ySpacingMin, ySpacing);
                const modifyX = (finalRatio: number) =>
                  modifySpacing(
                    ySpacing,
                    ySpacingMin,
                    alpha,
                    node,
                    quadLeaf,
                    strength,
                    'y',
                    xRatio * finalRatio
                  );
                const modifyY = (finalRatio: number) =>
                  modifySpacing(
                    xSpacing,
                    xSpacingMin,
                    alpha,
                    node,
                    quadLeaf,
                    strength,
                    'x',
                    yRatio * finalRatio
                  );
                if (xRatio > yRatio) {
                  modifyX(1);
                  modifyY(0.1);
                } else if (yRatio > xRatio) {
                  modifyX(0.1);
                  modifyY(1);
                } else {
                  modifyX(1);
                  modifyY(1);
                }
              }
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
    strength = newStrength;
    return force;
  };

  return force;
}
