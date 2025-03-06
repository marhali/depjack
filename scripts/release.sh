#!/bin/bash

# Build
pnpm --filter @depjack/core build
pnpm --filter @depjack/react build

# Publish
pnx @changesets/cli publish
