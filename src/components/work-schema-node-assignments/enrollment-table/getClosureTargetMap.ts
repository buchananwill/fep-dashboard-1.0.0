import { ClosureMap } from '@/components/work-schema-node-assignments/enrollment-table/EnrollmentTable';
import { ClosureDto } from 'react-d3-force-wrapper';

export function getClosureTargetMap(map: ClosureMap, target: number) {
  let innerMap = map[String(target)];
  if (innerMap === undefined) {
    innerMap = {} as Record<string, ClosureDto>;
    map[String(target)] = innerMap;
  }
  return innerMap;
}
