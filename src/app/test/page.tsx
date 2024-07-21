import JsonTree from '@/components/generic/JsonTree';
import {
  reAccumulatedTeachers,
  teachers,
  teachersCrossProduct
} from '@/utils/init-object-literals/genericGeneratorNodeFunctions/teacherExample';

export default function page() {
  return (
    <>
      <JsonTree data={teachers} />
      <JsonTree data={reAccumulatedTeachers} />
      <JsonTree data={teachersCrossProduct} />
    </>
  );
}
