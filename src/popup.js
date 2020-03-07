import "./popup.css";

(() => {
  const CHROME_STORAGE_KEY = "items";
  const testDom = document.querySelector("#test");

  const storeItems = (value, cb) => {
    chrome.storage.local.set({ [CHROME_STORAGE_KEY]: value }, () => {
      cb(value);
    });
    console.log("stored");
  };

  const restoreItems = (cb) => {
    console.log("restored");
    chrome.storage.local.get([CHROME_STORAGE_KEY], (value) => { 
      cb(value[CHROME_STORAGE_KEY]); 
    });
  }

  const drawDom = (items) => {
    testDom.textContent = JSON.stringify(items);
  }

  chrome.runtime.sendMessage(
    {
      type: "FROM_POPUP",
      payload: {
        message: "I am from text-drain-extension Popup."
      }
    },
    response => {
      const items = response.items;
      items.length ? storeItems(response.items, drawDom) : restoreItems(drawDom);
    }
  );
})();
