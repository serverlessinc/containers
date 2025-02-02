import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

/**
 * Entry point for the React application.
 * Initializes the app by rendering the root component inside a BrowserRouter.
 */
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HelmetProvider>
); 