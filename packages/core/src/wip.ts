type AuthService = {
  idAuth: string;
}

type ApiService = {
  apiId: number;
}

type DbService = {
  dbHandler: () => void;
}

type Dependency<T, Group> = {
  lazy: boolean;
  needs: DependencyGroupKeys<Group>[];
  factory: () => Promise<T>
};

type DependencyGroup<T> = {
  [K in keyof T]: T[K]
};

type DependencyGroupKeys<T> = T extends Dependency<any, any>
? never
: {
    [K in keyof T]-?: K extends string | number
      ? `${K}` | `${K}.${DependencyGroupKeys<T[K]>}`
      : never;
  }[keyof T];


type MyDeps = DependencyGroup<{
  auth: Dependency<AuthService, MyDeps>,
  infra: DependencyGroup<{
    api: Dependency<ApiService, MyDeps>,
    adapter: DependencyGroup<{
      db: Dependency<DbService, MyDeps>
    }>
  }>
}>

const myDeps: MyDeps = {
  auth: {
    lazy: true,
    needs: ['infra.adapter.db'],
    factory: () => Promise.resolve(null as never),
  },
  infra: {
    api: {
      lazy: false,
      needs: ['auth'],
      factory: () => Promise.resolve(null as never),
    },
    adapter: {
      db: {
        lazy: false,
        needs: [],
        factory: () => Promise.resolve(null as never),
      }
    }
  }
}
