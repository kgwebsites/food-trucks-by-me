import React from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

window.API_ROOT =
  process.env.NODE_ENV === 'production'
    ? '/.netlify/functions'
    : 'http://localhost:3001';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
