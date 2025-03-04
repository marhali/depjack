import type { DepartmentEntity, DepartmentRepository } from '~/examples/standalone/repository/department-repository';
import type { DepFactory } from '@depjack/core/factory';
import type { MyDeps } from '~/examples/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/examples/standalone/bootstrap/my-deps-definition';
import type { DatabaseClient } from '~/examples/standalone/client/database-client';

export class DepartmentRepositoryImpl implements DepartmentRepository {
  constructor(private readonly client: DatabaseClient) {}

  insert(): Promise<DepartmentEntity> {
    throw new Error('Not implemented.');
  }

  queryById(): Promise<DepartmentEntity> {
    throw new Error('Not implemented.');
  }

  queryByName(): Promise<DepartmentEntity> {
    throw new Error('Not implemented.');
  }

  update(): Promise<DepartmentEntity> {
    throw new Error('Not implemented.');
  }
}

export const factory: DepFactory<MyDeps, typeof myDepsDefinition, 'repository.department'> = (needs) => {
  return Promise.resolve(new DepartmentRepositoryImpl(needs['client.database']));
};
