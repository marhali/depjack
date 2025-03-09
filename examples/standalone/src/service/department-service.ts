import type { DepartmentRepository } from '~/standalone/repository/department-repository';

export interface DepartmentService {
  repository: DepartmentRepository;
  addEmployeeToDepartment(employeeId: string, departmentId: string): Promise<void>;
}
