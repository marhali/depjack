import { describe, it, expect, beforeAll } from 'vitest';
import myDepsRuntime from '~/examples/standalone/bootstrap/my-deps-runtime';
import { AuthClientImpl } from '~/examples/standalone/client/auth-client-impl';
import { DepartmentServiceImpl } from '~/examples/standalone/service/department-service-impl';

describe('main', () => {
  beforeAll(async () => {
    await myDepsRuntime.bootstrap();
  });
  it('should declare "client.auth" as initialized after bootstrap', () => {
    expect(myDepsRuntime.getInitialized()).toStrictEqual(['client.auth']);
  });
  it('should return instanceof AuthClientImpl for synchronous access on "client.auth"', () => {
    expect(myDepsRuntime.resolveSync('client.auth')).toBeInstanceOf(AuthClientImpl);
  });
  describe('initialize "service.department"', () => {
    beforeAll(async () => {
      await myDepsRuntime.resolve('service.department');
    });
    it('should declare "service.department" (and transitive deps) as initialized', () => {
      expect(myDepsRuntime.getInitialized()).toStrictEqual([
        'client.auth',
        'client.database',
        'repository.employee',
        'repository.department',
        'service.department',
      ]);
    });
    it('should return instanceof DepartmentServiceImpl for synchronous access on "service.department"', () => {
      expect(myDepsRuntime.resolveSync('service.department')).toBeInstanceOf(DepartmentServiceImpl);
    });
  });
});
