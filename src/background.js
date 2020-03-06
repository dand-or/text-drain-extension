var items = [];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'DRAINED') {
    items = request.payload.message;
  } else if (request.type === 'FROM_POPUP') {
    sendResponse({
      items
    })
  }
});
