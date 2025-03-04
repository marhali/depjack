import { type PropsWithChildren } from 'react';
import useBootstrapDepsRuntime from '@depjack/react/use-bootstrap-deps-runtime';
import rootDepsRuntime from '~/examples/react/bootstrap/root-deps-runtime';

function BootstrapLoader({ children }: PropsWithChildren) {
  useBootstrapDepsRuntime(rootDepsRuntime);
  return children;
}

export default BootstrapLoader;
