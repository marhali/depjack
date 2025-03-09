import type { EnvironmentService } from '~/react/core/environment/environment-service';
import type { RestClientService } from '~/react/core/rest-client/rest-client-service';
import type { AuthenticationService } from '~/react/core/authentication/authentication-service';

export type CoreDeps = {
  'core.environment': EnvironmentService;
  'core.rest_client': RestClientService;
  'core.authentication': AuthenticationService;
};
