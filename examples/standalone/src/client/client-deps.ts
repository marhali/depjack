import type { AuthClient } from '~/standalone/client/auth-client';
import type { DatabaseClient } from '~/standalone/client/database-client';

export type ClientDeps = {
  'client.auth': AuthClient;
  'client.database': DatabaseClient;
};
