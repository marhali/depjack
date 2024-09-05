import DependencyGroup from "@depjack/core/definition/dependency-group";
import DependencyKeys from "@depjack/core/definition/dependency-keys";

/**
 * Represents a single dependency in a dependency group.
 * @see DependencyGroup
 */
interface Dependency<T, Group extends DependencyGroup<any>> {
  /**
   * Defines whether this dependency should be initialized on-demand (true) or
   * with the initialization of the runtime environment (false).
   */
  lazy: boolean;

  /**
   * Sets the required dependencies of this dependency.
   * The runtime ensures that these dependencies are available in the factory function.
   */
  needs: DependencyKeys<Group>[];

  /**
   * Initialization function that is called to initialize this dependency.
   * This function is only called once per runtime environment.
   */
  factory: () => Promise<T>;
}

export default Dependency;
