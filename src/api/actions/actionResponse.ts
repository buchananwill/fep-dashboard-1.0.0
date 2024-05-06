export type ActionResponsePromise<T> = Promise<ActionResponse<T>>;

// Define the interface
export interface ActionResponse<T> {
  status: number;
  data?: T;
  message?: string;
}

// Factory function for success responses
export function successResponse<T>(
  data: T,
  message?: string
): ActionResponse<T> {
  return {
    status: 200,
    data,
    message
  };
}

// Factory function for error responses
export function errorResponse<T>(message: string, data?: T): ActionResponse<T> {
  return {
    status: 500,
    data,
    message
  };
}
