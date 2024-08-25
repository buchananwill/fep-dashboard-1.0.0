import { ClosureDto } from '@/api/zod-schemas/ClosureDtoSchema';
import { ClosureMap } from '@/components/work-schema-node-assignments/enrollment-table/EnrollmentTable';
import { getClosureTargetMap } from '@/components/work-schema-node-assignments/enrollment-table/getClosureTargetMap';
import { produce } from 'immer';

function conditionallyUpdateClosureValue(
  intermediaryClosure: ClosureDto,
  indirectClosure: ClosureDto
) {
  if (indirectClosure.value < intermediaryClosure.value + 1) {
    return produce(indirectClosure, (draft) => {
      draft.value = intermediaryClosure.value + 1;
    });
  } else {
    return indirectClosure;
  }
}

export function removeClosure(map: ClosureMap, closure: ClosureDto) {
  console.log(map);
  // Delete this closure
  const closureTargetMap = getClosureTargetMap(map, closure.target);
  delete closureTargetMap[String(closure.source)];

  console.log('direct closure removed:', closure);

  // Split into direct and indirect closures
  const indirectClosuresToCheck = [] as ClosureDto[];
  const survivingClosuresToTry = [] as ClosureDto[];
  // Clean up indirect connections
  for (let closure of Object.values(closureTargetMap)) {
    console.log('partitioning closure:', closure);
    if (closure.value > 1) {
      indirectClosuresToCheck.push(closure);
    } else if (closure.value === 1) {
      survivingClosuresToTry.push(closure);
    }
  }
  // Sort on proximity
  indirectClosuresToCheck.sort((a, b) => a.value - b.value);
  indirectClosuresToCheck.push(closure);
  console.log(
    'indirect:',
    indirectClosuresToCheck,
    'direct:',
    survivingClosuresToTry
  );

  // Look for a connection and either delete or add the closure to the possible paths.
  for (let indirectClosure of indirectClosuresToCheck) {
    let connected = false;
    for (let survivingClosure of survivingClosuresToTry) {
      const upperTargetMap = getClosureTargetMap(map, survivingClosure.source);
      const optionalClosure = upperTargetMap[String(indirectClosure.source)];
      // If necessary update the depth
      if (optionalClosure) {
        connected = true;
        closureTargetMap[String(indirectClosure.source)] =
          conditionallyUpdateClosureValue(optionalClosure, indirectClosure);
        break;
      }
    }
    if (connected) {
      survivingClosuresToTry.push(indirectClosure);
    } else {
      delete closureTargetMap[String(indirectClosure.source)];
    }
  }
  return map;
}
