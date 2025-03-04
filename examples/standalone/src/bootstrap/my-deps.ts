import type { ClientDeps } from '~/examples/standalone/client/client-deps';
import type { RepositoryDeps } from '~/examples/standalone/repository/repository-deps';
import type { ServiceDeps } from '~/examples/standalone/service/service-deps';

export type MyDeps = ClientDeps & RepositoryDeps & ServiceDeps;
