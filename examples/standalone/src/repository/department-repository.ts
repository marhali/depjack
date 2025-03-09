import type { CrudRepository } from '~/standalone/repository/crud-repository';
import type { EmployeeEntity } from '~/standalone/repository/employee-repository';

export type DepartmentEntity = {
  id: string;
  name: string;
  employees: EmployeeEntity[];
};

export interface DepartmentRepository extends CrudRepository<DepartmentEntity> {
  queryByName: (name: string) => Promise<DepartmentEntity>;
}
