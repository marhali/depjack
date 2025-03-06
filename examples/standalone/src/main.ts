import myDepsRuntime from '~/examples/standalone/bootstrap/my-deps-runtime';

await myDepsRuntime.bootstrap();

console.log('> initialized', myDepsRuntime.getInitialized());
const departmentService = await myDepsRuntime.resolve('service.department');
console.log('> departmentService', departmentService);
console.log('> initialized', myDepsRuntime.getInitialized());
