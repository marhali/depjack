/**
 * Represents a group of dependencies or nested dependency groups.
 * @see Dependency
 */
type DependencyGroup<T> = {
  [K in keyof T]: T[K];
};


export default DependencyGroup;
