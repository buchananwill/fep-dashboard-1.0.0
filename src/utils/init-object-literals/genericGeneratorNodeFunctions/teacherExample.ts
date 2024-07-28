import { ReconciliationMap } from '@/utils/init-object-literals/genericGeneratorNodeFunctions/mergeObjects';
import { ValueList } from '@/types';
import {
  AccumulatorMap,
  deDuplicatePreserveOrder,
  getObjectsAccumulatorFunction
} from '@/utils/init-object-literals/genericGeneratorNodeFunctions/objectAccumulator';
import {
  DeAccumulatorMap,
  getAlternatingDirectionsFunctionWithHeadTailCompensator,
  getCycleItemsFunction,
  getObjectsDeAccumulatorFunction,
  getPadAtNthItemFunction
} from '@/utils/init-object-literals/genericGeneratorNodeFunctions/valueListDeAccumulator';
import { getMaxMinListLengths } from '@/utils/init-object-literals/genericGeneratorNodeFunctions/getMaxMinListLengths';
import { crossProductFromValueList } from '@/utils/init-object-literals/genericGeneratorNodeFunctions/crossProductFromValueList';

interface Teacher {
  name: string;
  subject: string;
  yearsExperience: number;
}

type TeacherValueList = ValueList<Teacher>;

const teacherValueList: TeacherValueList = {
  name: ['Dave', 'Mike', 'Will'],
  subject: ['Maths', 'AdvancedMaths'],
  yearsExperience: [2]
};

const templateTeacher: Teacher = {
  name: 'Coralie',
  subject: 'Musical Loveliness',
  yearsExperience: 38
};

const teacherReconciliationMap: ReconciliationMap<ValueList<Teacher>> = {
  name: (t, u) => [...t, ...u],
  subject: (t, u) => (t === undefined || t.length === 0 ? u : t),
  yearsExperience: (t, u) => (u === undefined || u.length === 0 ? t : u)
};

const teacherAccumulatorMap: AccumulatorMap<Teacher> = {
  name: (template, list, maxLength, minLength) =>
    deDuplicatePreserveOrder(list),
  subject: (template, list, maxLength, minLength) =>
    deDuplicatePreserveOrder(list),
  yearsExperience: (template, list, maxLength, minLength) =>
    deDuplicatePreserveOrder(list)
};

const teacherAccumulator = getObjectsAccumulatorFunction(
  templateTeacher,
  teacherAccumulatorMap
);

const teacherDeAccumulatorMap: DeAccumulatorMap<Teacher> = {
  name: (valueList, key, index) =>
    getCycleItemsFunction(valueList[key] as string[], 'forward')(index),
  subject: (valueList, key, index) =>
    getAlternatingDirectionsFunctionWithHeadTailCompensator(
      valueList[key] as string[]
    )(index),
  yearsExperience: (valueList, key, index) =>
    getPadAtNthItemFunction(
      valueList[key] as number[],
      0,
      getMaxMinListLengths(Object.entries(valueList)).maxLength
    )(index)
};

const deAccumulateTeachers = getObjectsDeAccumulatorFunction(
  teacherDeAccumulatorMap,
  'maximumListLength'
);

export const teachers = deAccumulateTeachers(teacherValueList);

export const reAccumulatedTeachers = teacherAccumulator([
  templateTeacher,
  ...teachers
]);

export const teachersCrossProduct = crossProductFromValueList(
  reAccumulatedTeachers
);
