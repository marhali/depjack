import { Deps, DepsDefinition, DepsKey } from '@depjack/core/definition/definition.ts';

/**
 * Determines all dependencies that must be initialized when the runtime environment is initialized.
 * In short, this means all dependencies with <code>lazy=false</code>.
 * @param depsDefinition Dependencies definition
 */
function determineInitDeps<T extends Deps>(depsDefinition: DepsDefinition<T>) {
  const result = new Set<DepsKey<T>>();

  for (const key of Object.keys(depsDefinition)) {
    if (!depsDefinition[key].lazy) {
      result.add(key);
    }
  }

  return result;
}

export default determineInitDeps;
