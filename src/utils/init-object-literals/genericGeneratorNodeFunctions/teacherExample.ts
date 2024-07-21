import {
  getMergeObjectsFunction,
  ReconciliationMap
} from '@/utils/init-object-literals/genericGeneratorNodeFunctions/mergeObjects';
import { ValueList } from '@/types';

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
