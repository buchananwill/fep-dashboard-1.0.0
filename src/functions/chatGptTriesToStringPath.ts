import { OrganizationDto } from '@/api/zod-schemas/OrganizationDtoSchema_';

type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${'' extends P ? '' : '.'}${P}`
    : never
  : never;

type Leaves<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? Join<K, Leaves<T[K]>> | K
    : K
  : never;

type Get<T, P extends string> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Get<T[K], Rest>
    : never
  : P extends keyof T
    ? T[P]
    : never;

export type StringPathsNoDeepOptionals<T> =
  Leaves<T> extends infer P
    ? P extends string
      ? Get<T, P> extends string
        ? P
        : never
      : never
    : never;

// Example usage with a type:
export type Example = {
  a: {
    b: string;
    c: number;
    d?: {
      e: string;
    };
  };
  f: boolean;
  g: {
    h: string;
    i?: {
      j: string;
    };
  };
};

type Result = StringPathsNoDeepOptionals<Example>; // Expected to be "a.b" | "a.d.e" | "g.h" | "g.i.j"

type LeavesOfOrganization = Leaves<OrganizationDto>;
type AnotherTest = StringPathsNoDeepOptionals<OrganizationDto>;
