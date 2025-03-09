import type { ClientDeps } from '~/standalone/client/client-deps';
import type { RepositoryDeps } from '~/standalone/repository/repository-deps';
import type { ServiceDeps } from '~/standalone/service/service-deps';

export type MyDeps = ClientDeps & RepositoryDeps & ServiceDeps;
