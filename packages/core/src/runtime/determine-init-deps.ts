import type { Deps, DepsDefinition, DepsKey } from '@depjack/core/definition';

/**
 * Determines all dependencies that must be initialized when the runtime environment is initialized.
 * In short, this means all dependencies with <code>lazy=false</code>.
 * @param depsDefinition Dependencies definition
 */
function determineInitDeps<TDeps extends Deps>(depsDefinition: DepsDefinition<TDeps>) {
  const result = new Set<DepsKey<TDeps>>();

  for (const key of Object.keys(depsDefinition) as Array<keyof TDeps>) {
    if (!depsDefinition[key].lazy) {
      result.add(key);
    }
  }

  return result;
}

export default determineInitDeps;
