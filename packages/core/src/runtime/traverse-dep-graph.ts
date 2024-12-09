import { Deps, DepsDefinition, DepsKey } from '@depjack/core/definition/definition';

/**
 * Travers the entire dependency graph and returns the direct and transitive
 * predecessors for the required dependency and the dependency self as well.
 * @param dep Dependency key
 * @param depsDefinition Dependencies definition
 */
function traverseDepGraph<T extends Deps>(dep: DepsKey<T>, depsDefinition: DepsDefinition<T>): Set<DepsKey<T>> {
  const result = new Set<DepsKey<T>>();
  const marker = new Set<DepsKey<T>>();

  const visit = (key: DepsKey<T>) => {
    if (marker.has(key)) {
      throw new Error(`Detected circular dependency on "${String(key)}".`);
    }

    marker.add(key);

    for (const predecessor of depsDefinition[key].needs) {
      result.add(predecessor);
      visit(predecessor);
    }

    marker.delete(key);
  };

  visit(dep);

  return result;
}

export default traverseDepGraph;
