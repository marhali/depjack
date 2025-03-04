import type { DepartmentService } from '~/examples/standalone/service/department-service';
import type { EmployeeService } from '~/examples/standalone/service/employee-service';

export type ServiceDeps = {
  'service.department': DepartmentService;
  'service.employee': EmployeeService;
};
