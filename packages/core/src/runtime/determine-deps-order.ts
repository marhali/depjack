import { Deps, DepsKey } from '@depjack/core/definition/definition.ts';
import { DepsGraph } from '@depjack/core/definition/graph.ts';

/**
 * Determines the initialization order of the provided deps utilizing the dependencies graph.
 * @param deps Dependencies that are requested for initialization
 * @param depsGraph Dependencies Graph
 */
function determineDepsOrder<T extends Deps>(deps: Set<DepsKey<T>>, depsGraph: DepsGraph<T>): DepsKey<T>[] {
  const result = [] as DepsKey<T>[];
  const marker = new Set<DepsKey<T>>();
  const temporaryMarker = new Set<DepsKey<T>>();

  const visit = (key: DepsKey<T>) => {
    if (temporaryMarker.has(key)) {
      throw new Error(`Detected circular dependency on "${String(key)}".`);
    }

    if (!marker.has(key)) {
      temporaryMarker.add(key);

      for (const predecessor of depsGraph[key]) {
        visit(predecessor);
      }

      temporaryMarker.delete(key);
      marker.add(key);
      result.push(key);
    }
  };

  for (const dep of deps) {
    visit(dep);
  }

  return result;
}

export default determineDepsOrder;
