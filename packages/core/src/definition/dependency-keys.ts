import Dependency from "@depjack/core/definition/dependency";

/**
 * Provides all keys of the dependency tree. Nested structures are represented via dot notation.
 */
type DependencyKeys<T> = T extends Dependency<any, any>
  ? never
  : {
    [K in keyof T]-?: K extends string | number
      ? `${K}` | `${K}.${DependencyKeys<T[K]>}`
      : never;
  }[keyof T];

export default DependencyKeys;
