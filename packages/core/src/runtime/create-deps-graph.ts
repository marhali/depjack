import { Deps, DepsDefinition, DepsKey } from '@depjack/core/definition/definition';
import { DepsGraph } from '@depjack/core/definition/graph';
import traverseDepGraph from '@depjack/core/runtime/traverse-dep-graph.ts';

/**
 * Creates the dependency graph for the provided dependencies' definition.
 * @param depsDefinition Dependencies definition
 * @see traverseDepGraph
 */
function createDepsGraph<T extends Deps>(depsDefinition: DepsDefinition<T>): DepsGraph<T> {
  const result = {} as DepsGraph<T>;

  for (const key of Object.keys(depsDefinition)) {
    result[key as DepsKey<T>] = traverseDepGraph(key, depsDefinition);
  }

  return result;
}

export default createDepsGraph;
