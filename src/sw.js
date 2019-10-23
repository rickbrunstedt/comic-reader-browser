/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

// importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// importScripts(
//   "precache-manifest.57df311b53bb1486b67d9f2b1bd28c64.js"
// );

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
// self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

/**
 * Everything below is custom made
 */

function serveShareTarget(event) {
  const dataPromise = event.request.formData();

  // Redirect so the user can refresh the page without resending data.
  // @ts-ignore It doesn't like me giving a response to respondWith, although it's allowed.
  event.respondWith(Response.redirect('/?share-target'));

  event.waitUntil(
    (async function() {
      // The page sends this message to tell the service worker it's ready to receive the file.
      await nextMessage('share-ready');
      const client = await self.clients.get(event.resultingClientId);
      const data = await dataPromise;
      const file = data.get('file');
      client.postMessage({ file, action: 'load-comic' });
    })()
  );
}

self.addEventListener('fetch', event => {
  // if (event.request.method !== 'POST') {
  //   event.respondWith(fetch(event.request));
  //   return;
  // }

  if (
    url.pathname === '/' &&
    url.searchParams.has('share-target') &&
    event.request.method === 'POST'
  ) {
    serveShareTarget(event);
    return;
  }

  // event.respondWith(
  //   (async () => {
  //     const formData = await event.request.formData();
  //     const file = formData.get('file') || '';
  //     const responseUrl = await saveBookmark(file);
  //     return Response.redirect(responseUrl, 303);
  //   })()
  // );
});
