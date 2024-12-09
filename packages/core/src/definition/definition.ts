export type Deps = Record<string, unknown>;

export type DepsLazy<T> = {
  [K in keyof T]: Promise<T[K]>;
};

export type DepsInstance<T extends Deps> = {
  [K in keyof T]?: T[K];
};

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
