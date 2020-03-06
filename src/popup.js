import './popup.css';

(() => {
  const testDom = document.querySelector("#test");

  chrome.runtime.sendMessage(
    {
      type: 'FROM_POPUP',
      payload: {
        message: 'Hello, my name is Pop. I am from Popup.',
      },
    },
    response => {
      console.log(response.items);
      testDom.textContent = JSON.stringify(response.items);
    }
  );
})();
