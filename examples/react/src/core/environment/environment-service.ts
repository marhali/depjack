export interface EnvironmentService {
  resolveVariable: (name: string) => Promise<string>;
}
