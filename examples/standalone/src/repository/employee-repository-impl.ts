import type { EmployeeEntity, EmployeeRepository } from '~/examples/standalone/repository/employee-repository';
import type { DepFactory } from '@depjack/core/factory';
import type { MyDeps } from '~/examples/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/examples/standalone/bootstrap/my-deps-definition';
import type { DatabaseClient } from '~/examples/standalone/client/database-client';

export class EmployeeRepositoryImpl implements EmployeeRepository {
  constructor(private readonly client: DatabaseClient) {}

  insert(): Promise<EmployeeEntity> {
    throw new Error('Not implemented.');
  }

  queryById(): Promise<EmployeeEntity> {
    throw new Error('Not implemented.');
  }

  queryByName(): Promise<EmployeeEntity> {
    throw new Error('Not implemented.');
  }

  update(): Promise<EmployeeEntity> {
    throw new Error('Not implemented.');
  }
}

export const factory: DepFactory<MyDeps, typeof myDepsDefinition, 'repository.employee'> = (needs) => {
  return Promise.resolve(new EmployeeRepositoryImpl(needs['client.database']));
};
