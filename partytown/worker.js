// * in main thread *
// let result = document.querySelectorAll('div').length;
// console.log(result);

// * our goal *
// let result;
// console.log('before', result);
// // do something
// console.log('after', result);

// (1)
// let result;
// console.log('[worker] before postMessage', result);
// onmessage = function (event) {
//   const { type, payload } = event.data;
//   if (type === 'DIV_COUNT_FOR_POSTMESSAGE') result = payload
//   console.log('[worker] onmessage', result);
// };
// postMessage({ type: 'SHOW_ME_DIV_COUNT_VIA_POSTMESSAGE' });
// console.log('[worker] after postMessage', result);

// [worker] before postMessage – undefined
// [worker] after postMessage – undefined
// [main] message received from worker: – {type: "SHOW_ME_DIV_COUNT_VIA_POSTMESSAGE"}
// [main] post message back to worker
// [worker] onmessage – {divCount: 1}

// [worker] before postMessage – undefined
// [main] message received from worker: – {type: "SHOW_ME_DIV_COUNT_VIA_POSTMESSAGE"}
// [main] post message back to worker
// [worker] after postMessage – undefined
// [worker] onmessage – {divCount: 1}

// (2)
let result;
console.log('[worker] before XHR', result);
const xhr = new XMLHttpRequest();
xhr.open('GET', '/demo/show-me-div-count', false);
xhr.onload = function() {
  result = JSON.parse(xhr.responseText);
  console.log('[worker] xhr.onload', result);
};
// it might be intercepted by old sw because sw needs seconds to be updated (if it's changed)
xhr.send(null);
console.log('[worker] after XHR', result);

// [worker] before XHR undefined
// [sw] "/demo/show-me-div-count" intercepted
// [sw] communicating with main thread...
// [main] message received from sw: {type: 'SHOW_ME_DIV_COUNT_VIA_XHR'}
// [main] post message back to sw
// [sw] completing the response
// [worker] xhr.onload {divCount: 1}
// [worker] after XHR {divCount: 1}
