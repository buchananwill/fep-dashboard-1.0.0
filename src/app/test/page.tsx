import JsonTree from '@/components/generic/JsonTree';
import {
  reAccumulatedTeachers,
  teachers,
  teachersCrossProduct
} from '@/utils/init-object-literals/genericGeneratorNodeFunctions/teacherExample';
import { instrumentalSubjects } from '@/utils/init-json-data/arts-college/knowledgeDomains';

export default function page() {
  return (
    <>
      <div className={'border-2 '}>{JSON.stringify(instrumentalSubjects)}</div>
      {/*<JsonTree data={instrumentalSubjects} />*/}
      {/*<JsonTree data={teachers} />*/}
      {/*<JsonTree data={reAccumulatedTeachers} />*/}
      {/*<JsonTree data={teachersCrossProduct} />*/}
    </>
  );
}
