import { ClosureDto } from '@/api/zod-schemas/ClosureDtoSchema';
import { ClosureMap } from '@/components/work-schema-node-assignments/enrollment-table/EnrollmentTable';

export function getClosureTargetMap(map: ClosureMap, target: number) {
  let innerMap = map[String(target)];
  if (innerMap === undefined) {
    innerMap = {} as Record<string, ClosureDto>;
    map[String(target)] = innerMap;
  }
  return innerMap;
}
