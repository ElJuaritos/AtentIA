import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { logoAtentia } from './assets/brandImages';
import './index.css';

/** Favicon desde assets de marca (PNG con transparencia). */
const favicon = document.querySelector("link[rel='icon']");
if (favicon) favicon.href = logoAtentia;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
