import { type PropsWithChildren, use } from 'react';
import rootDepsRuntime from '~/examples/react/bootstrap/root-deps-runtime';

function BootstrapLoader({ children }: PropsWithChildren) {
  use(rootDepsRuntime.bootstrap());
  return children;
}

export default BootstrapLoader;
