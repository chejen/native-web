const messageMap = new Map();
let messageId = 0;

function log(...args) {
  console.log('[sw]', ...args);
}

self.addEventListener('install', (event) => {
  log('installing...')
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  log('activating...')
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data.type === 'DIV_COUNT_FOR_XHR') {
    log('completing the response');
    const resolve = messageMap.get(event.data.messageId);
    if (typeof resolve === 'function') {
      messageMap.delete(event.data.messageId);
      resolve(new Response(JSON.stringify(event.data.payload), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }));
    }
  }
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.pathname.includes('demo/')) {
    log(`${url.pathname} intercepted`);

    // event.respondWith(
    //   new Response(
    //     JSON.stringify({ foo: 'bar' }), {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Cache-Control': 'no-store',
    //       },
    //     }
    //   )
    // );
    let msgId = ++messageId;
    event.respondWith(new Promise((resolve) => {
      messageMap.set(msgId, resolve);
    }));

    self.clients.matchAll({
      type: 'window',
    }).then((clients) => {
      log('communicating with main thread...');
      clients.forEach(client => {
        client.postMessage({
          messageId: msgId,
          type: 'SHOW_ME_DIV_COUNT_VIA_XHR',
        });
      });
    });
  } else {
    return fetch(event.request);
  }
});

self.onerror = function(message) {
  log('something wrong', message);
};
