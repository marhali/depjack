# @depjack/core

[![GitHub Release](https://img.shields.io/github/v/release/marhali/depjack?filter=%40depjack%2Fcore%40*&style=for-the-badge)](https://github.com/marhali/depjack/releases)
[![Codecov](https://img.shields.io/codecov/c/gh/marhali/depjack?flag=packages.core&style=for-the-badge)](https://app.codecov.io/gh/marhali/depjack)
[![NPM Version](https://img.shields.io/npm/v/%40depjack%2Fcore?style=for-the-badge)](https://www.npmjs.com/package/@depjack/core)
![NPM Downloads](https://img.shields.io/npm/dm/%40depjack%2Fcore?style=for-the-badge)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg?style=for-the-badge)](https://paypal.me/marhalide)

Main module of [depjack](https://github.com/marhali/depjack), which provides the core functionalities of a fully typed dependency injection container.
This module can be used in any environment, as the only hard dependency is on [TypeScript](https://www.typescriptlang.org/).
Ideal for development projects in which the domain core is separated from other layers (e.g. [CQRS]()).

## Features

- Full type support for dependency definition & resolution.
- Definition of non-lazy dependencies, which are loaded with the initialization of the runtime environment.
- Definition of lazy dependencies, which are loaded on-demand (initialization on first request).
- Designed for scalability through module separation and minimal initial overhead.
- Ready for critical environments as no external dependencies are used.

## Usage

### Installation

In order to get started you need to install the `@depjack/core` module. Don't forget to check out the [other modules](../../README.md#modules) for framework-specific adapter packages.

```shell
pnpm add @depjack/core
```

### Configuration

Your dependencies can now be defined in a three-step configuration process.

#### Dependencies Type

Record that defines a key for each dependency type.
Each key serves as the primary identifier for the subsequent definition and resolution of dependencies.

```ts
// my-deps.ts

export type MyDeps = {
  myServiceA: MyServiceAType;
  myServiceB: MyServiceBType;
  myServiceC: MyServiceCType;
};
```

#### Dependencies Definition

Configuration of the behavior of the individual dependencies in relation to the [runtime environment](./src/runtime/deps-runtime.ts).

```ts
// my-deps-definition.ts

import { DepsDefinition } from '@depjack/core';
import { MyDeps } from './my-deps';

const myDepsDefinition = {
  myServiceA: {
    lazy: true,
    needs: [],
    needsLazy: [],
  },
  myServiceB: {
    lazy: true,
    needs: ['myServiceA'],
    needsLazy: [],
  },
  myServiceC: {
    lazy: false,
    needs: ['myServiceA', 'myServiceB'],
  },
} satisfies DepsDefinition<MyDeps>;

export default myDepsDefinition;
```

#### Dependencies Factory

Provision of the factory function for each dependency. Each function receives the in [the definition](#dependencies-definition) defined dependencies as a object in the first parameter.
In most cases, it makes sense to specify [dedicated dependency modules](src/factory/from-module-factory.ts) to split the code and reduce the initial size of the application.

```ts
// my-deps-factory.ts

import { DepsFactory, fromModuleFactory } from '@depjack/core';
import { MyDeps } from './my-deps';
import myDepsDefinition from './my-deps-definition';

const myDepsFactory = {
  myServiceA: fromModuleFactory(() => import('./my-service-a')),
  myServiceB: fromModuleFactory(() => import('./my-service-b')),
  myServiceC: fromModuleFactory(() => import('./my-service-c')),
} satisfies DepsFactory<MyDeps, typeof myDepsDefinition>;

export default myDepsFactory;
```

```ts
// my-service-a.ts

import { DepFactory } from '@depjack/core';
import { MyDeps } from './my-deps';
import myDepsDefinition from './my-deps-definition';

export class MyServiceAImpl implements MyServiceAType {
  // ...
}

export const factory: DepFactory<MyDeps, typeof myDepsDefinition, 'myServiceA'> = (needs) => {
  return Promise.resolve(new MyServiceAImpl(needs['...']));
};
```

### Runtime

A [runtime environment](./src/runtime/deps-runtime.ts) can now be created with the previously defined configuration.

```ts
// my-deps-runtime.ts

import { createDepsRuntime } from '@depjack/core';
import { MyDeps } from './my-deps';
import myDepsDefinition from './my-deps-definition';
import myDepsRuntime from './my-deps-runtime';

const myDepsRuntime = createDepsRuntime<MyDeps>(myDepsDefinition, myDepsRuntime);

export default myDepsRuntime;
```

### Use the runtime

The [runtime environment](./src/runtime/deps-runtime.ts) can now be initialized and  used to resolve dependencies.

```ts
// main.ts

import myDepsRuntime from './my-deps-runtime';

await myDepsRuntime.bootstrap();
const myServicec = await myDepsRuntime.resolve('myServiceC');

// ...
```


### Example

Check out the [predefined example](../../examples/standalone) which shows a real-world use case.

## License

Distributed under the MIT License. See [LICENSE](../../LICENSE) for more information.

## Contact

Marcel Haßlinger - [@marhali_de](https://twitter.com/marhali_de) - [Portfolio Website](https://marhali.de)

Project Link: [https://github.com/marhali/depjack](https://github.com/marhali/depjack)

## Donation

If this project helps you to reduce development time, you can give me a [cup of coffee](https://paypal.me/marhalide) :)
