import { TextDrainer } from "./models/TextDrainer";

const textDrainer = new TextDrainer();

const textPassAction = () => {
  chrome.runtime.sendMessage(
    {
      type: "DRAINED",
      payload: {
        message: textDrainer.getPageTextItems()
      }
    },
    response => {}
  );
};

textPassAction(); // initial exec(per page open)

// when tab activated, catch a message from background and
chrome.runtime.onMessage.addListener(message => {
  if (message.type === "TAB_ACTIVATED") textPassAction();
});
