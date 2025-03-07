# depjack

[![Github Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/marhali/depjack/build.yml?style=for-the-badge)](https://github.com/marhali/depjack/actions)
[![Github Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/marhali/depjack/release.yml?style=for-the-badge&label=Release)](https://github.com/marhali/depjack/actions)
[![Codecov](https://img.shields.io/codecov/c/gh/marhali/depjack?style=for-the-badge&label=Overall%20Coverage)](https://app.codecov.io/gh/marhali/depjack)
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg?style=for-the-badge)](https://paypal.me/marhalide)

Fully typed dependency injection for your next enterprise-grade [TypeScript](https://www.typescriptlang.org/) project.
Universally applicable in all environments with additional adapter modules that provide environment-specific functionalities.
Ideal for development projects in which the domain core is separated from other layers (e.g. [CQRS](https://martinfowler.com/bliki/CQRS.html)).

## Modules

| Module                           | Description                                                                                          |
|----------------------------------|------------------------------------------------------------------------------------------------------|
| [@depjack/core](packages/core)   | Main module which provides the core functionalities of a fully typed dependency injection container. |
| [@depjack/react](packages/react) | Adapter which provides [React](https://react.dev/)-specific functions to ease usage.                 |

## Features

- Full type support for dependency definition & resolution
- Definition of non-lazy dependencies, which are loaded with the initialization of the runtime environment.
- Definition of lazy dependencies, which are loaded on-demand (initialization on first request)
- Designed for scalability through module separation and minimal initial overhead.
- Ready for critical environments as no external dependencies are used.
- Prefabricated adapters that simplify use with frameworks and other technologies.

## Usage

### Getting started

In order to use [depjack](https://github.com/marhali/depjack) you need to install the required [modules](#modules) and configure them in a three-step configuration process.
The configuration consists of:

- [Dependencies Type](packages/core/README.md#dependencies-type)
- [Dependencies Definition](packages/core/README.md#dependencies-definition)
- [Dependencies Factory](packages/core/README.md#dependencies-factory)

Based on this configuration, a [runtime environment](packages/core/src/runtime/deps-runtime.ts) is created which manages and instantiates requested dependencies.

For a quick start, take a look at the corresponding instructions for the [individual modules](#modules). Each module shows a basic configuration of how it can be used in the respective environment.

### Examples

Example implementations that are based on real-world use cases.

| Example                           | Description                                                    |
|-----------------------------------|----------------------------------------------------------------|
| [standalone](examples/standalone) | Demonstrates use without a specific environment (vanilla use). |
| [react](examples/react)           | Demonstrates use in a [React](https://react.dev/) application. |

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Contact

Marcel Haßlinger - [@marhali_de](https://twitter.com/marhali_de) - [Portfolio Website](https://marhali.de)

Project Link: [https://github.com/marhali/depjack](https://github.com/marhali/depjack)

## Donation

If this project helps you to reduce development time, you can give me a [cup of coffee](https://paypal.me/marhalide) :)
