export class TextDrainer {
  constructor() {
    this._pageTextItems = [];
    this._keys = [
      "a",
      "address",
      "b",
      "blockquote",
      "button",
      "caption",
      "data",
      "datalist",
      "dd",
      "dl",
      "dt",
      "em",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "i",
      "input",
      "label",
      "li",
      "link",
      "meta",
      "option",
      "p",
      "ruby",
      "span",
      "strong",
      "td",
      "textarea",
      "thead",
      "title",
      "tr",
      "tt",
      "u"
    ];
    this.drain();
  }
  drain() {
    const correctTextContent = () => {
      const results = [];
      this._keys.map(k => {
        const textArray = [];
        const nodeList = document.querySelectorAll(k);
        if (!nodeList.length) return;
        nodeList.forEach(nl => {
          if (nl.children.length > 1) return;
          if (!nl.textContent.trim().length) return;
          textArray.push(nl.textContent.trim().replace(/\r?\n/g, ""));
        });
        if (!textArray.length) return;
        results.push({ [k]: Array.from(new Set(textArray)) }); // Array.from(new Set(textArray) -> this delete duplicate
      });

      // finally, push the page url info.
      const urlInfo = [];
      urlInfo.push(location.toLocaleString());
      urlInfo.push(location.host);
      urlInfo.push(location.origin);
      urlInfo.push(location.hostname);
      if (location.pathname) {
        urlInfo.push(location.pathname);
        const paths = location.pathname.split("/");
        paths.forEach(path => {
          if (path.length) urlInfo.push(path);
          if (path.split("=").length)
            path.split("=").forEach(x => (x.length ? urlInfo.push(x) : null));
        });
      }
      if (location.search) {
        urlInfo.push(location.search);
        const queryString = location.search.substring(1);
        const params = queryString.split("&");
        if (params.length) {
          params.forEach(param => {
            urlInfo.push(param);
            param.split("=").forEach(x => urlInfo.push(x));
          });
        }
      }
      if (location.port) urlInfo.push(location.port);
      results.push({ URL_info: Array.from(new Set(urlInfo)) });

      return results;
    };
    this._pageTextItems = correctTextContent();
  }
  getPageTextItems() {
    return this._pageTextItems;
  }
}
