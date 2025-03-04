import type { DepartmentService } from '~/examples/standalone/service/department-service';
import type { DepartmentRepository } from '~/examples/standalone/repository/department-repository';
import type { EmployeeRepository } from '~/examples/standalone/repository/employee-repository';
import type { DepFactory } from '@depjack/core/factory';
import type { MyDeps } from '~/examples/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/examples/standalone/bootstrap/my-deps-definition';

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
