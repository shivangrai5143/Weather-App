import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/globals.css';
import './styles/components/weather-card.css';
import './styles/components/search-bar.css';
import './styles/components/forecast-card.css';
import './styles/utils/animations.css';
import './styles/themes/backgrounds.css';
import './styles/utils/responsive.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
