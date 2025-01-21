import { DepsDefinition } from '@depjack/core/definition/definition';
import { DepsFactory } from '@depjack/core/factory';
import createDepsRuntime from '@depjack/core/runtime/create-deps-runtime.ts';

interface AuthService {} // -> !lazy, authClient
interface EmployeeService {} // lazy, EmployeeRepository
interface DepartmentService {} // lazy, DepartmentRepository, EmployeeRepository

interface EmployeeRepository {} // lazy, DbClient
interface DepartmentRepository {} // lazy, DbClient

interface AuthClient {} // lazy
interface DatabaseClient {} // lazy, AuthService

type ServiceDeps = {
  auth_service: AuthService;
  employee_service: EmployeeService;
  department_service: DepartmentService;
};

type RepositoryDeps = {
  employee_repository: EmployeeRepository;
  department_repository: DepartmentRepository;
};

type ClientDeps = {
  auth_client: AuthClient;
  db_client: DatabaseClient;
};

type Deps = ServiceDeps & RepositoryDeps & ClientDeps;

// ---------

const serviceDepsDefinition = {
  auth_service: {
    lazy: false,
    needs: ['auth_client'],
    needsLazy: [],
  },
  employee_service: {
    lazy: true,
    needs: ['employee_repository'],
    needsLazy: [],
  },
  department_service: {
    lazy: true,
    needs: ['department_repository', 'employee_repository'],
    needsLazy: [],
  },
} satisfies Pick<DepsDefinition<Deps>, keyof ServiceDeps>;

const repositoryDeps = {
  employee_repository: {
    lazy: true,
    needs: ['db_client'],
    needsLazy: [],
  },
  department_repository: {
    lazy: true,
    needs: ['db_client'],
    needsLazy: [],
  },
} satisfies Pick<DepsDefinition<Deps>, keyof RepositoryDeps>;

const clientDeps = {
  auth_client: {
    lazy: true,
    needs: [],
    needsLazy: [],
  },
  db_client: {
    lazy: true,
    needs: ['auth_service'],
    needsLazy: [],
  },
} satisfies Pick<DepsDefinition<Deps>, keyof ClientDeps>;

const depsDefinition = {
  ...serviceDepsDefinition,
  ...repositoryDeps,
  ...clientDeps,
} satisfies DepsDefinition<Deps>;

// ---------

const serviceDepsFactory = {
  auth_service: () => Promise.resolve('auth_service_instance'),
  employee_service: () => Promise.resolve('employee_service_instance'),
  department_service: () => Promise.resolve('department_service_instance'),
} satisfies Pick<DepsFactory<Deps, typeof depsDefinition>, keyof ServiceDeps>;

const repositoryDepsFactory = {
  employee_repository: () => Promise.resolve('employee_repository_instance'),
  department_repository: () => Promise.resolve('department_repository_instance'),
} satisfies Pick<DepsFactory<Deps, typeof depsDefinition>, keyof RepositoryDeps>;

const clientDepsFactory = {
  auth_client: () => Promise.resolve('auth_client_instance'),
  db_client: () => Promise.resolve('db_client_instance'),
} satisfies Pick<DepsFactory<Deps, typeof depsDefinition>, keyof ClientDeps>;

const depsFactory = {
  ...serviceDepsFactory,
  ...repositoryDepsFactory,
  ...clientDepsFactory,
} satisfies DepsFactory<Deps, typeof depsDefinition>;

// ---------

async function main() {
  const depsRuntime = createDepsRuntime<Deps>(depsDefinition, depsFactory);
  console.log('initializingDeps', depsRuntime.getInitializingDeps());
  await depsRuntime.initialize();
  const authSrv = depsRuntime.getDepSync('auth_service');
  console.log('resolvedAuthSrv', authSrv);
  console.log('initializedDeps', depsRuntime.getInitializedDeps());
}

await main();
