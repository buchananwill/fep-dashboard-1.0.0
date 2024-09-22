import { FieldValues } from 'react-hook-form/dist/types';
import React, { ReactNode } from 'react';
import { FieldErrors } from 'react-hook-form';
import { Get, Paths } from 'type-fest';
import { isNotUndefined } from '@/api/main';
import { typedEntries } from '@/components/roles/create-role/typedEntries';
import { get } from 'lodash';
import { GetFieldType } from '@/functions/allowingNestedFiltering';

export type OnlyStringPaths<T> = Extract<Paths<T>, string>;
export type ErrorsProps<
  T extends FieldValues,
  TPath extends OnlyStringPaths<T>
> = {
  errors: GetFieldType<FieldErrors<T>, TPath>;
};
type PathErrorsComponentMap<T extends FieldValues> = {
  [Path in OnlyStringPaths<T>]: (props: ErrorsProps<T, Path>) => ReactNode;
};
export type RenderErrorsMap<T extends FieldValues> = Partial<{
  root: (props: { errors: FieldErrors<T> }) => ReactNode;
  each: Partial<PathErrorsComponentMap<T>>;
}>;
export type PathRenderedErrorMap<T extends FieldValues> = Partial<{
  root: ReactNode[];
  each: Partial<{ [Path in OnlyStringPaths<T>]: ReactNode[] }>;
}>;

export function renderFieldErrorsItem<T extends FieldValues>(
  renderErrorsAs: RenderErrorsMap<T>,
  response: PathRenderedErrorMap<T>,
  nextItemErrors: T
) {
  if (renderErrorsAs.root) {
    const RootRender = renderErrorsAs.root;
    let list = response['root'];
    if (list === undefined) {
      list = [];
      response['root'] = list;
    }
    list.push(<RootRender errors={nextItemErrors} />);
  }
  if (renderErrorsAs.each) {
    let each = response['each'];
    if (each === undefined) {
      each = {};
      response['each'] = each;
    }
    typedEntries(renderErrorsAs.each)
      .filter(isNotUndefined)
      .forEach(([key, value], index) => {
        let list = each[key];
        if (list === undefined) {
          list = [];
          each[key] = list;
        }
        const Value = value as (props: {
          errors: FieldErrors<Get<T, typeof key>>;
        }) => ReactNode;
        const errorsAtPath = get(nextItemErrors, key) as FieldErrors<
          Get<T, typeof key>
        >;
        console.log(key, value, errorsAtPath);
        if (errorsAtPath)
          list.push(<Value key={`${key}.${index}`} errors={errorsAtPath} />);
      });
  }
}

export function flattenArrayErrorsAndRender<T extends FieldValues>(
  arrayOfFieldErrors: FieldErrors<T>[],
  renderErrorsAs: RenderErrorsMap<T>
): PathRenderedErrorMap<T> {
  const response: PathRenderedErrorMap<T> = {};
  if (!arrayOfFieldErrors || !Array.isArray(arrayOfFieldErrors))
    return response;
  arrayOfFieldErrors.filter(isNotUndefined).map((nextItemErrors) => {
    renderFieldErrorsItem(renderErrorsAs, response, nextItemErrors as T);
  });
  return response;
}
