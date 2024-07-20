import { isNotUndefined } from '@/api/main';
import fastCartesian from 'fast-cartesian';

export type ValueList<ReferenceType> = {
  [Property in keyof ReferenceType]: ReferenceType[Property][];
};

export type PartialValueList<T> = Partial<ValueList<T>>;

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

export function mixCrossProduct<T>(
  valueList: PartialValueList<T>
): Partial<T>[] {
  const keysThaHaveListItems: (keyof typeof valueList)[] = Object.keys(
    valueList
  )
    .filter((valueListKey) => {
      const valueListElement =
        valueList[valueListKey as keyof PartialValueList<T>];
      return valueListElement !== undefined && valueListElement.length > 0;
    })
    .map((keyItem) => keyItem as keyof typeof valueList);

  const valueListArray = keysThaHaveListItems
    .map((keyItem) => valueList[keyItem])
    .filter(isNotUndefined);

  const listProduct = fastCartesian(valueListArray as ValueList<T>[keyof T][]);
  return listProduct.map((list) => {
    return Object.fromEntries(
      keysThaHaveListItems.map((key, index) => [key, list[index]])
    ) as Partial<T>;
  });
}
