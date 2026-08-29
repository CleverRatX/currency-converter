import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.scss';
import { App } from './App';

const container = document.getElementById('root');

if (!container) {
  console.error('Не найден контейнер #root');
} else {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
