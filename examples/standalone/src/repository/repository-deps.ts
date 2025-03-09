import type { EmployeeRepository } from '~/standalone/repository/employee-repository';
import type { DepartmentRepository } from '~/standalone/repository/department-repository';

export type RepositoryDeps = {
  'repository.employee': EmployeeRepository;
  'repository.department': DepartmentRepository;
};
