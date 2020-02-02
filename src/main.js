import { h, render } from 'preact';
import App from './App.js';
import { AppContextProvider } from './context/appContext';

function initServiceWorker() {
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
initServiceWorker();

const rootNode = document.getElementById('app');
render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
  rootNode
);
