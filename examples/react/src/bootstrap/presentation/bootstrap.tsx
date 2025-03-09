import { Suspense } from 'react';
import BootstrapFallback from '~/react/bootstrap/presentation/bootstrap-fallback';
import BootstrapLoader from '~/react/bootstrap/presentation/bootstrap-loader';

function Bootstrap() {
  return (
    <Suspense fallback={<BootstrapFallback />}>
      <BootstrapLoader>myApp</BootstrapLoader>
    </Suspense>
  );
}

export default Bootstrap;
