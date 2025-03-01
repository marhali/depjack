export interface AccountService {
  getUsername: () => Promise<string>;
  getDisplayName: () => Promise<string>;
  setDisplayName: (displayName: string) => Promise<void>;
}
