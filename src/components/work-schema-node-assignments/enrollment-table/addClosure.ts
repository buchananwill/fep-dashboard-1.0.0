import { ClosureMap } from '@/components/work-schema-node-assignments/enrollment-table/EnrollmentTable';
import { ClosureDto } from '@/api/zod-schemas/ClosureDtoSchema';
import { TransientIdOffset } from '@/api/literals';
import { getClosureTargetMap } from '@/components/work-schema-node-assignments/enrollment-table/getClosureTargetMap';

export function addClosure(map: ClosureMap, c: ClosureDto) {
  const closureTargetMap = getClosureTargetMap(map, c.target);
  closureTargetMap[String(c.source)] = c;
  return closureTargetMap;
}

export function connectNodes(
  map: ClosureMap,
  source: number,
  target: number,
  template: ClosureDto,
  nextId: () => number
) {
  const nextClosure = { ...template, target, source, id: nextId(), value: 1 };

  const updatedMap = addClosure(map, nextClosure);
  const sourceConnectionsMap = getClosureTargetMap(map, source);
  for (let closure of Object.values(sourceConnectionsMap)) {
    if (!updatedMap.hasOwnProperty(String(closure.source))) {
      const nextIndirectConnection = {
        ...closure,
        target,
        id: nextId(),
        value: closure.value + 1
      };
      addClosure(map, nextIndirectConnection);
    }
  }
}

export const defaultClosureTemplate: ClosureDto = {
  id: TransientIdOffset,
  closureType: 'generic-closure',
  source: NaN,
  target: NaN,
  value: 1,
  weighting: 1
};
