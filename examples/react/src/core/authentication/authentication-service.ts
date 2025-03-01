export interface AuthenticationService {
  login: () => Promise<void>;
  logout: () => Promise<void>;
}
