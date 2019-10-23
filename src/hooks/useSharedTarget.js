import { useState, useEffect } from 'preact/hooks';

function getSharedImage() {
  return new Promise(resolve => {
    const onmessage = event => {
      if (event.data.action !== 'load-comic') return;
      resolve(event.data.file);
      navigator.serviceWorker.removeEventListener('message', onmessage);
    };

    navigator.serviceWorker.addEventListener('message', onmessage);

    // This message is picked up by the service worker - it's how it knows we're ready to receive
    // the file.
    navigator.serviceWorker.controller.postMessage('share-ready');
  });
}

const initialState = {
  hasSharedTarget: false,
  file: null,
};

export function useSharedTarget() {
  const [state, setState] = useState(initialState);

  async function handleSharedTarget() {
    const hasSharedTarget = new URL(location.href).searchParams.has(
      'share-target'
    );
    if (!hasSharedTarget) return;

    const file = await getSharedImage();
    console.log('file', file);

    // Remove the ?share-target from the URL
    history.replaceState('', '', '/');
    setState({ hasSharedTarget: true, file });
  }

  useEffect(() => {
    handleSharedTarget();
  });

  function reset() {
    setState(initialState);
  }

  return [state, { reset }];
}
