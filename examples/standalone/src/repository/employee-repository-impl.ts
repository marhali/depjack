import type { DepFactory } from '@depjack/core';
import type { EmployeeEntity, EmployeeRepository } from '~/standalone/repository/employee-repository';
import type { MyDeps } from '~/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/standalone/bootstrap/my-deps-definition';
import type { DatabaseClient } from '~/standalone/client/database-client';

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
