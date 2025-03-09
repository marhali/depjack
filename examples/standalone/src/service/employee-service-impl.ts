import type { DepFactory } from '@depjack/core';
import type { EmployeeService } from '~/standalone/service/employee-service';
import type { EmployeeRepository } from '~/standalone/repository/employee-repository';
import type { MyDeps } from '~/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/standalone/bootstrap/my-deps-definition';

export class EmployeeServiceImpl implements EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {
    this.repository = employeeRepository;
  }

  getDepartment(): Promise<string> {
    throw new Error('Method not implemented.');
  }

  repository: EmployeeRepository;
}

export const factory: DepFactory<MyDeps, typeof myDepsDefinition, 'service.employee'> = (needs) => {
  return Promise.resolve(new EmployeeServiceImpl(needs['repository.employee']));
};
