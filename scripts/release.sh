#!/bin/bash

# Build
pnpm --filter @depjack/core build
pnpm --filter @depjack/react build

# Publish
pnpm changeset publish
