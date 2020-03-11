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
    if (items === void 0) return NodeCreator.noItems();
    new NodeCreator(items).create();
  };

  const load = () => {
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
  }

  load();
})();
