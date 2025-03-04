import type { EmployeeRepository } from '~/examples/standalone/repository/employee-repository';
import type { DepartmentRepository } from '~/examples/standalone/repository/department-repository';

export type RepositoryDeps = {
  'repository.employee': EmployeeRepository;
  'repository.department': DepartmentRepository;
};
