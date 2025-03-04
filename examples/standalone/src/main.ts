import myDepsRuntime from '~/examples/standalone/bootstrap/my-deps-runtime';

await myDepsRuntime.bootstrap();

const departmentService = await myDepsRuntime.resolve('service.department');

console.log('initialized', myDepsRuntime.getInitialized());
console.log('departmentService', departmentService);
console.log('initialized', myDepsRuntime.getInitialized());
