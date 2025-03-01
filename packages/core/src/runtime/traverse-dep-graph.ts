import type { Deps, DepsDefinition, DepsKey } from '@depjack/core/definition';

/**
 * Travers the entire dependency graph and returns the direct and transitive
 * predecessors for the required dependency and the dependency self as well.
 * @param dep Dependency key
 * @param depsDefinition Dependencies definition
 */
function traverseDepGraph<TDeps extends Deps>(
  dep: DepsKey<TDeps>,
  depsDefinition: DepsDefinition<TDeps>,
): Set<DepsKey<TDeps>> {
  const result = new Set<DepsKey<TDeps>>();
  const marker = new Set<DepsKey<TDeps>>();

  const visit = (key: DepsKey<TDeps>) => {
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
