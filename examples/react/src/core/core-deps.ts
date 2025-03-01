import type { EnvironmentService } from '~/examples/react/core/environment/environment-service';
import type { RestClientService } from '~/examples/react/core/rest-client/rest-client-service';
import type { AuthenticationService } from '~/examples/react/core/authentication/authentication-service';

export type CoreDeps = {
  'core.environment': EnvironmentService;
  'core.rest_client': RestClientService;
  'core.authentication': AuthenticationService;
};
