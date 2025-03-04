import useInitializingDeps from '@depjack/react/use-initializing-deps';
import rootDepsRuntime from '~/examples/react/bootstrap/root-deps-runtime';

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
