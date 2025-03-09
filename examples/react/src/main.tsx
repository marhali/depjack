/* eslint-disable unicorn/no-abusive-eslint-disable */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Bootstrap from '~/react/bootstrap/presentation/bootstrap';

// eslint-disable-next-line
createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <Bootstrap />
  </StrictMode>,
);
