import type { DepartmentRepository } from '~/examples/standalone/repository/department-repository';

export interface DepartmentService {
  repository: DepartmentRepository;
  addEmployeeToDepartment(employeeId: string, departmentId: string): Promise<void>;
}
