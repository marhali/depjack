import type { EmployeeRepository } from '~/examples/standalone/repository/employee-repository';

export interface EmployeeService {
  repository: EmployeeRepository;
  getDepartment: (employeeId: string) => Promise<string>;
}
