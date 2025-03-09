import type { EmployeeRepository } from '~/standalone/repository/employee-repository';

export interface EmployeeService {
  repository: EmployeeRepository;
  getDepartment: (employeeId: string) => Promise<string>;
}
