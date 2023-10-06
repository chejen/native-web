function activateWebWorker() {
  if (window.Worker) {
    const worker = new Worker('/partytown/worker.js');
    worker.onmessage = function (event) {
      console.log('[main] message received from worker:', event.data);
      if (event.data.type === 'SHOW_ME_DIV_COUNT_VIA_POSTMESSAGE') {
        console.log('[main] post message back to worker');
        worker.postMessage({
          type: 'DIV_COUNT_FOR_POSTMESSAGE',
          payload: { divCount: document.querySelectorAll('div').length }
        });
      }
    };
  } else {
    document.getElementById('error-message').textContent = 'Not Support!';
  }
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    if (registration.active) {
      if (navigator.serviceWorker.controller) {
        activateWebWorker();
      } else { // probably due to hard refresh
        // https://stackoverflow.com/questions/51597231/register-service-worker-after-hard-refresh
        window.location.reload();
      }
    }
  });

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('[main] active SW changed');
  });

  navigator.serviceWorker.addEventListener('message', (event) => {
    console.log('[main] message received from sw:', event.data);
    if (event.data.type === 'SHOW_ME_DIV_COUNT_VIA_XHR') {
      console.log('[main] post message back to sw');
      navigator.serviceWorker.controller.postMessage({
        messageId: event.data.messageId,
        type: 'DIV_COUNT_FOR_XHR',
        payload: { divCount: document.querySelectorAll('div').length }
      });
    }
  });

  // promise
  navigator.serviceWorker.register('/partytown/sw.js', {
    scope: '/partytown/',
    // navigate to
    // https://website/partytown/ or
    // https://website/partytown/index.html
    // instead of
    // https://website/partytown
  });
} else {
  console.error('Service workers are not supported.');
}