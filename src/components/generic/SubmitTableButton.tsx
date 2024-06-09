import { useGlobalListener, useGlobalReadAny } from 'selective-context';
import { Button } from '@nextui-org/button';
import {
  IntersectionGeneratorMatrix,
  IntersectionGeneratorRowWithHeader
} from '@/api/types';
import { EmptyArray } from '@/api/literals';

export function SubmitTableButton<T, U>({
  rows,
  columns,
  targetEndpoint
}: {
  rows: T[];
  columns: U[];
  targetEndpoint?: (matrix: IntersectionGeneratorMatrix<T, U>) => Promise<any>;
}) {
  let { currentState } = useGlobalListener<number[]>({
    contextKey: 'generatorRow:idList',
    listenerKey: 'submitHandler',
    initialValue: EmptyArray
  });
  let selectiveContextReadAll =
    useGlobalReadAny<IntersectionGeneratorRowWithHeader<any>>();
  const handleSubmit = () => {
    const listList = currentState
      .map((id) => selectiveContextReadAll(`generatorRow:${id}`))
      .filter((item) => item !== undefined)
      .map((i) => i as IntersectionGeneratorRowWithHeader<any>)
      .map(convertRowWithHeaderToNumberList);

    const matrix: IntersectionGeneratorMatrix<any, any> = {
      rowReferenceList: rows,
      columnReferenceList: columns,
      generatorMatrix: listList
    };
    if (targetEndpoint !== undefined) {
      targetEndpoint(matrix);
    }
  };

  return (
    <Button onPress={handleSubmit} className={'step_submit_lesson_types'}>
      Submit
    </Button>
  );
}

function convertRowWithHeaderToNumberList(
  row: IntersectionGeneratorRowWithHeader<any>
) {
  const responseList: number[] = [];
  for (let i = 0; i < Object.values(row).length - 1; i++) {
    responseList.push(row[i]);
  }
  return responseList;
}
