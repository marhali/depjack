import { useSyncExternalStore } from 'react';
import rootDepsRuntime from '~/examples/react/bootstrap/root-deps-runtime';

function BootstrapFallback() {
  const initializing = useSyncExternalStore(
    (onStoreChange) => rootDepsRuntime.subscribe('initializing', onStoreChange),
    () => rootDepsRuntime.getInitializing(),
  );

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
