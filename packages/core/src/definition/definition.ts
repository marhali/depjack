/**
 * Record of all dependencies by their identifier as key and type as value.
 */
export type Deps = Record<string, unknown>;

/**
 * Maps the provided dependencies as lazily loaded using an async function.
 * @see Deps
 */
export type DepsLazyFunction<T extends Deps> = {
  [K in keyof T]: () => Promise<T[K]>;
};

/**
 * Record of dependencies instances. Allows empty keys.
 */
export type DepsInstance<T extends Deps> = {
  [K in keyof T]?: T[K];
};

/**
 * Record of lazily loaded instances. Allows empty keys.
 */
export type DepsLazyInstance<T extends Deps> = {
  [K in keyof T]?: Promise<T[K]>;
};

/**
 * Represents any dependency key identifier.
 */
export type DepsKey<T extends Deps> = keyof T;

export type DepsDefinition<T extends Deps> = {
  [K in keyof T]: {
    /**
     * Defines whether this dependency should be initialized on-demand (true) or
     * with the initialization of the runtime environment (false).
     */
    lazy: boolean;

    /**
     * Defines the required dependencies of this dependency.
     * The runtime ensures that these dependencies are available in the factory function.
     */
    needs: DepsKey<T>[];

    /**
     * Defines the lazy required dependencies of this dependency.
     * The runtime will provide these dependencies to the factory function but won't initialize them.
     */
    needsLazy: DepsKey<T>[];
  };
};
