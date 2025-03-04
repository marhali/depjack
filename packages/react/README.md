# @depjack/react

Adapter which provides [React](https://react.dev/) specific functions to interact with the [@depjack/core](https://github.com/marhali/depjack/tree/main/packages/core) module. The goal is to standardize
the use of [depjack](https://github.com/marhali/depjack) in React applications and to speed up development with pre-built utilities.

## Features

### [useBootstrapDepsRuntime()](src/use-bootstrap-deps-runtime.ts)

[React hook](https://react.dev/reference/react/hooks) to bootstrap (initialize) a [DepsRuntime](../core/src/runtime/deps-runtime.ts).

### [useInitializingDeps()](src/use-initializing-deps.ts)

[React hook](https://react.dev/reference/react/hooks) to retrieve all dependencies that are **_currently_** in the process of initialization for the specific [DepsRuntime](../core/src/runtime/deps-runtime.ts).

### [useResolveDep()](src/use-resolve-dep.ts)

[React hook](https://react.dev/reference/react/hooks) to resolve a dependency from the [DepsRuntime](../core/src/runtime/deps-runtime.ts).

## Usage

### Getting started
