import type { DepartmentService } from '~/standalone/service/department-service';
import type { EmployeeService } from '~/standalone/service/employee-service';

export type ServiceDeps = {
  'service.department': DepartmentService;
  'service.employee': EmployeeService;
};
