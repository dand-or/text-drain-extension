import "./popup.css";
import { NodeCreator } from "./models/NodeCreator";

(() => {
  const CHROME_STORAGE_KEY = "items";

  const storeItems = (value, cb) => {
    chrome.storage.local.set({ [CHROME_STORAGE_KEY]: value }, () => {
      cb(value);
    });
    console.log("stored");
  };

  const restoreItems = cb => {
    console.log("restored");
    chrome.storage.local.get([CHROME_STORAGE_KEY], value => {
      cb(value[CHROME_STORAGE_KEY]);
    });
  };

  const createNodes = items => {
    //testDom.textContent = JSON.stringify(items);
    new NodeCreator(items).create();
  };

  chrome.runtime.sendMessage(
    {
      type: "FROM_POPUP",
      payload: {
        message: "I am from text-drain-extension Popup."
      }
    },
    response => {
      const items = response.items;
      items.length
        ? storeItems(response.items, createNodes)
        : restoreItems(createNodes);
    }
  );
})();
