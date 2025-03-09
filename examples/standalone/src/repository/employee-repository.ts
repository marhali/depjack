import type { CrudRepository } from '~/standalone/repository/crud-repository';

export type EmployeeEntity = {
  id: string;
  name: string;
};

export interface EmployeeRepository extends CrudRepository<EmployeeEntity> {
  queryByName: (name: string) => Promise<EmployeeEntity>;
}
