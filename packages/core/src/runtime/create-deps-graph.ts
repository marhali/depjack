import type { Deps, DepsDefinition, DepsKey, DepsGraph } from '@/core/definition';
import traverseDepGraph from '@/core/runtime/traverse-dep-graph';

/**
 * Creates the dependency graph for the provided dependencies' definition.
 * @param depsDefinition Dependencies definition
 * @see traverseDepGraph
 */
function createDepsGraph<TDeps extends Deps>(depsDefinition: DepsDefinition<TDeps>): DepsGraph<TDeps> {
  const result = {} as DepsGraph<TDeps>;

  for (const key of Object.keys(depsDefinition)) {
    result[key as DepsKey<TDeps>] = traverseDepGraph(key, depsDefinition);
  }

  return result;
}

export default createDepsGraph;
