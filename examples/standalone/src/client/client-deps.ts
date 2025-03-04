import type { AuthClient } from '~/examples/standalone/client/auth-client';
import type { DatabaseClient } from '~/examples/standalone/client/database-client';

export type ClientDeps = {
  'client.auth': AuthClient;
  'client.database': DatabaseClient;
};
