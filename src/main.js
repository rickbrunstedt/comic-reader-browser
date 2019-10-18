import { h, render } from 'preact';
import App from './App.js';

function initSericeWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}
initSericeWorker();

const rootNode = document.getElementById('app');
render(<App />, rootNode);
