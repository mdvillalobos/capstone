import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from '../context/userContext.jsx'
import { RankContextProvider } from '../context/rankContext.jsx';
import { AnalyticsContextProvider } from '../context/analyticsContext.jsx';
import App from './App.jsx';
import './assets/css/index.css';

createRoot(document.getElementById('root')).render(
  <UserContextProvider>
    <RankContextProvider>
      <AnalyticsContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AnalyticsContextProvider>
    </RankContextProvider>
  </UserContextProvider>
)
