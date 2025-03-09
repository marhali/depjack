import type { Deps, DepsKey, DepsGraph } from '@/core/definition';

/**
 * Determines the initialization order of the provided deps utilizing the dependencies graph.
 * @param deps Dependencies that are requested for initialization
 * @param depsGraph Dependencies Graph
 */
function determineDepsOrder<TDeps extends Deps>(
  deps: Set<DepsKey<TDeps>>,
  depsGraph: DepsGraph<TDeps>,
): DepsKey<TDeps>[] {
  const result = [] as DepsKey<TDeps>[];
  const marker = new Set<DepsKey<TDeps>>();
  const temporaryMarker = new Set<DepsKey<TDeps>>();

  const visit = (key: DepsKey<TDeps>) => {
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
