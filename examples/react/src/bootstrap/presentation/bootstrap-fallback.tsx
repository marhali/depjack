import { useInitializingDeps } from '@depjack/react';
import rootDepsRuntime from '~/react/bootstrap/root-deps-runtime';

function BootstrapFallback() {
  const initializing = useInitializingDeps(rootDepsRuntime);

  return (
    <div>
      <p>Initializing...</p>
      {initializing.map((dep) => (
        <span key={dep}>{dep}</span>
      ))}
    </div>
  );
}

export default BootstrapFallback;
