import { type PropsWithChildren, Suspense } from 'react';

export const SUSPENSE_FALLBACK_TEXT = 'suspenseFallbackText';

function SuspenseWrapper({ children }: PropsWithChildren) {
  return <Suspense fallback={SUSPENSE_FALLBACK_TEXT}>{children}</Suspense>;
}

export default SuspenseWrapper;
