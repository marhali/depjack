import DependencyGroup from "@depjack/core/definition/dependency-group";
import Dependency from "@depjack/core/definition/dependency";
import defineDependencyTree from "@depjack/core/definition/define-dependency-tree";

type AuthService = {
  state: string;
  login: () => Promise<void>
}

type ApiService = {
  fetch: () => Promise<boolean>;
}

type DbService = {
  query: () => Promise<string>;
}

type MyDeps = DependencyGroup<{
  auth: Dependency<AuthService, MyDeps>;
  infra: DependencyGroup<{
    api: Dependency<ApiService, MyDeps>;
    ports: DependencyGroup<{
      db: Dependency<DbService, MyDeps>;
    }>
  }>
}>

const tree = defineDependencyTree<MyDeps>({
  auth: {
    lazy: false,
    needs: [],
    factory: () => Promise.resolve({} as never)
  },
  infra: {
    api: {
      lazy: false,
      needs: ['auth'],
      factory: () => Promise.resolve({} as never)
    },
    ports: {
      db: {
        lazy: false,
        needs: ['auth', 'infra.api'],
        factory: () => Promise.resolve({} as never)
      }
    }
  }
})


