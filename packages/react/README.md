# @depjack/react

[![GitHub Release](https://img.shields.io/github/v/release/marhali/depjack?filter=%40depjack%2Freact%40*&style=for-the-badge)](https://github.com/marhali/depjack/releases)
[![Codecov](https://img.shields.io/codecov/c/gh/marhali/depjack?flag=packages.react&style=for-the-badge)](https://app.codecov.io/gh/marhali/depjack)
[![NPM Version](https://img.shields.io/npm/v/%40depjack%2Freact?style=for-the-badge)](https://www.npmjs.com/package/@depjack/react)
![NPM Downloads](https://img.shields.io/npm/dm/%40depjack%2Freact?style=for-the-badge)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg?style=for-the-badge)](https://paypal.me/marhalide)

Adapter which provides [React](https://react.dev/) specific functions to interact with the [@depjack/core](https://github.com/marhali/depjack/tree/main/packages/core) module. The goal is to standardize
the use of [depjack](https://github.com/marhali/depjack) in [React](https://react.dev/) applications and to speed up development with pre-built utilities.

## Features

| Function                                                        | Description                                                                                                                                                                                                       |
|-----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [useBootstrapDepsRuntime()](src/use-bootstrap-deps-runtime.ts)  | [React hook](https://react.dev/reference/react/hooks) to bootstrap (initialize) a [DepsRuntime](../core/src/runtime/deps-runtime.ts).                                                                             |
| [useInitializingDeps()](src/use-initializing-deps.ts)           | [React hook](https://react.dev/reference/react/hooks) to retrieve all dependencies that are **_currently_** in the process of initialization for the specific [DepsRuntime](../core/src/runtime/deps-runtime.ts). |
| [useResolveDep()](src/use-resolve-dep.ts)                       | [React hook](https://react.dev/reference/react/hooks) to resolve a dependency from the [DepsRuntime](../core/src/runtime/deps-runtime.ts).                                                                        |

## Usage

### Installation

In order to get started you need to install the required modules.

```shell
pnpm add @depjack/core @depjack/react
```

### Configuration

Please refer to the [configuration](../core/README.md#configuration) as described in the [@depjack/core](../core) module.

### Runtime environment initialization

For graphical user interfaces, the runtime environment can be initialized from the UI and provide detailed information about the initialization process.

```tsx
// bootstrap.tsx

import { PropsWithChildren, Suspense } from 'react';
import { useBootstrapDepsRuntime, useInitializingDeps } from '@depjack/react';
import myDepsRuntime from './my-deps-runtime';

export function BootstrapFallback() {
  const initializingDeps = useInitializingDeps(myDepsRuntime);

  return (
    <div>
      <p>Initializing...</p>
      <span>{initializingDeps.join(', ')}</span>
    </div>
  )
}

export function BootstrapLoader({children}: PropsWithChildren) {
  useBootstrapDepsRuntime(myDepsRuntime);
  return children;
}

export function Bootstrap({children}: PropsWithChildren) {
  return (
    <Suspense fallback={<BootstrapFallback/>}>
      <Bootstrap>{children}</Bootstrap>
    </Suspense>
  );
}
```

### Resolve dependencies inside React

Dependencies can be directly resolved within a component using the [useResolveDep()](./src/use-resolve-dep.ts) hook.
If the dependency has not been initialized yet, the closest [Suspense](https://react.dev/reference/react/Suspense) is triggered.

```tsx
import useResolveDep from '@depjack/react';
import myDepsRuntime from './my-deps-runtime';

function MyComponent() {
  const myServiceC = useResolveDep(myDepsRuntime, 'myServiceC');

  // ...
}
```

### Example

Check out the [predefined example](../../examples/react) which shows a real-world use case.


## License

Distributed under the MIT License. See [LICENSE](../../LICENSE) for more information.

## Contact

Marcel Haßlinger - [@marhali_de](https://twitter.com/marhali_de) - [Portfolio Website](https://marhali.de)

Project Link: [https://github.com/marhali/depjack](https://github.com/marhali/depjack)

## Donation

If this project helps you to reduce development time, you can give me a [cup of coffee](https://paypal.me/marhalide) :)
