export type ErrorSummary = {
  message?: string;
  type?: string;
  path: string;
};

function appendErrorsIfPresent(
  flattenedErrors: ErrorSummary[] | undefined,
  responseList: ErrorSummary[]
) {
  if (flattenedErrors) {
    flattenedErrors.forEach((errorSummary) => responseList.push(errorSummary));
  }
}

export function flattenErrors(
  errorObject?: any,
  path?: string,
  list?: ErrorSummary[]
) {
  console.log(errorObject);

  const responseList = list ?? [];
  if (errorObject === undefined) return responseList;
  if (typeof errorObject !== 'object') return responseList;
  let errorThisLevel = undefined as ErrorSummary | undefined;

  for (let key in errorObject) {
    if (!errorObject.hasOwnProperty(key)) {
      console.log({ key, message: 'did not own' });
      continue;
    }
    const nextPath = path ? `${path}.${key}` : key;
    const value = errorObject[key];
    if (key === 'message' || key === 'type') {
      if (!errorThisLevel) errorThisLevel = { path: nextPath };
      errorThisLevel[key] = value;
    }
    if (typeof value === 'object') {
      flattenErrors(value, nextPath, responseList);
    }
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const nextNestedPath = `${path}[${i}]`;
        const valueElement = value[i];
        flattenErrors(valueElement, nextNestedPath, responseList);
      }
    }
  }

  if (errorThisLevel?.path) responseList.push(errorThisLevel);

  return responseList;
}
