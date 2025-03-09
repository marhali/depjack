import type { DepFactory } from '@depjack/core';
import type { DepartmentService } from '~/standalone/service/department-service';
import type { DepartmentRepository } from '~/standalone/repository/department-repository';
import type { EmployeeRepository } from '~/standalone/repository/employee-repository';
import type { MyDeps } from '~/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/standalone/bootstrap/my-deps-definition';

export class DepartmentServiceImpl implements DepartmentService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly departmentRepository: DepartmentRepository,
  ) {
    this.repository = departmentRepository;
  }

  repository: DepartmentRepository;

  addEmployeeToDepartment(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export const factory: DepFactory<MyDeps, typeof myDepsDefinition, 'service.department'> = (needs) => {
  return Promise.resolve(new DepartmentServiceImpl(needs['repository.employee'], needs['repository.department']));
};
