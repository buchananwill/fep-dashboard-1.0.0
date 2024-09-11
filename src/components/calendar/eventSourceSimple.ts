export interface EventSourceSimple<T> {
  events: any[];
  id: string;
  color?: string;
  textColor?: string;
  sourceData: T;
}
