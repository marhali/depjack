/**
 * Record of all dependencies by their identifier as key and type as value.
 * @example ```ts
 * type MyDeps = {
 *   myModuleA: MyModuleA,
 *   myModuleB: MyModuleB,
 * };
 * ```
 */
export type Deps = Record<string, unknown>;

/**
 * Maps the provided dependencies as lazily loaded using an async function.
 * @see Deps
 */
export type DepsLazyFunction<TDeps extends Deps> = {
  [TDepsKey in keyof TDeps]: () => Promise<TDeps[TDepsKey]>;
};

/**
 * Record of dependencies instances. Allows empty keys.
 */
export type DepsInstance<TDeps extends Deps> = {
  [TDepsKey in keyof TDeps]?: TDeps[TDepsKey];
};

/**
 * Record of lazily loaded instances. Allows empty keys.
 */
export type DepsLazyInstance<TDeps extends Deps> = {
  [TDepsKey in keyof TDeps]?: Promise<TDeps[TDepsKey]>;
};

/**
 * Represents any dependency key identifier.
 * @example ```ts
 * type MyDeps = {
 *   myModuleA: MyModuleA,
 * };
 *
 * const anyKey: DepsKey<MyDeps> = 'myModuleA';
 * ```
 */
export type DepsKey<TDeps extends Deps> = keyof TDeps;

/**
 * Record of dependencies and a set of their required direct and transitive dependencies.
 */
export type DepsGraph<TDeps extends Deps> = Record<keyof TDeps, Set<keyof TDeps>>;

/**
 * Record of dependency definitions. Used to configure the injection behaviour of each dependency.
 * @see Deps
 * @example ```ts
 * type MyDeps = {
 *   myModuleA: MyModuleA,
 * };
 *
 * const myDepsDefinition = {
 *   myModuleA: {
 *     lazy: true,
 *     needs: [],
 *     needsLazy: [],
 *   },
 * } satisfies DepsDefinition<MyDeps>;
 * ```
 */
export type DepsDefinition<TDeps extends Deps> = {
  [TDepsKey in keyof TDeps]: {
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

/**
 * Type helper to define only a partial part of the deps' definition.
 * @see DepsDefinition
 * @example ```ts
 * const myPartialDepsDefinition = {
 *   // ...
 * } satisfies PartialDepsDefinition<MyDeps, MyPartialDeps>;
 * ```
 */
export type PartialDepsDefinition<TDeps extends Deps, TPartialDeps extends Partial<TDeps>> = Pick<
  DepsDefinition<TDeps>,
  Extract<keyof TPartialDeps, keyof TDeps>
>;
