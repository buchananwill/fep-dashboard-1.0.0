import { LeafComponent, LeafComponentProps } from '@/app/core/navTree';

export default function PathVariableSplit({
  pathVariables,
  depth,
  homeComponent: Home,
  subRouteComponent: Sub
}: LeafComponentProps & {
  homeComponent: LeafComponent;
  subRouteComponent: LeafComponent;
}) {
  if (pathVariables.length > depth) {
    return <Sub pathVariables={pathVariables} depth={depth + 1} />;
  } else return <Home pathVariables={pathVariables} depth={depth} />;
}
