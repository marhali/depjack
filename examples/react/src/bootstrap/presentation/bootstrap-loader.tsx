import { type PropsWithChildren } from 'react';
import { useBootstrapDepsRuntime } from '@depjack/react';
import rootDepsRuntime from '~/react/bootstrap/root-deps-runtime';

function BootstrapLoader({ children }: PropsWithChildren) {
  useBootstrapDepsRuntime(rootDepsRuntime);
  return children;
}

export default BootstrapLoader;
