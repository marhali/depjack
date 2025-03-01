import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Bootstrap from '~/examples/react/bootstrap/presentation/bootstrap';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <Bootstrap />
  </StrictMode>,
);
