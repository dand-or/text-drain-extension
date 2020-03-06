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

chrome.tabs.onActivated.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {
      type: "TAB_ACTIVATED"
    });
  })
});