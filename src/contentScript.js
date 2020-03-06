import { TextDrainer } from "./models/TextDrainer";

const textDrainer = new TextDrainer();

chrome.runtime.sendMessage(
  {
    type: 'DRAINED',
    payload: {
      message: textDrainer.getPageTextItems(),
    },
  },
  response => {}
);