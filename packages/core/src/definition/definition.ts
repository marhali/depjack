/**
 * Record of all dependencies by their identifier as key and type as value.
 */
export type Deps = Record<string, unknown>;

/**
 * Maps the provided dependencies as lazily loaded using an async function.
 * @see Deps
 */
export type DepsLazyFunction<TDeps extends Deps> = {
  [K in keyof TDeps]: () => Promise<TDeps[K]>;
};

/**
 * Record of dependencies instances. Allows empty keys.
 */
export type DepsInstance<TDeps extends Deps> = {
  [K in keyof TDeps]?: TDeps[K];
};

/**
 * Record of lazily loaded instances. Allows empty keys.
 */
export type DepsLazyInstance<TDeps extends Deps> = {
  [K in keyof TDeps]?: Promise<TDeps[K]>;
};

/**
 * Represents any dependency key identifier.
 */
export type DepsKey<TDeps extends Deps> = keyof TDeps;

export type DepsDefinition<TDeps extends Deps> = {
  [K in keyof TDeps]: {
    /**
     * Defines whether this dependency should be initialized on-demand (true) or
     * with the initialization of the runtime environment (false).
     */
    lazy: boolean;

    /**
     * Defines the required dependencies of this dependency.
     * The runtime ensures that these dependencies are available in the factory function.
     */
    needs: DepsKey<TDeps>[];

    /**
     * Defines the lazy required dependencies of this dependency.
     * The runtime will provide these dependencies to the factory function but won't initialize them.
     */
    needsLazy: DepsKey<TDeps>[];
  };
};

export type PartialDepsDefinition<DEPS extends Deps, PARTIAL extends Partial<DEPS>> = Pick<
  DepsDefinition<DEPS>,
  Extract<keyof PARTIAL, keyof DEPS>
>;
