export class TextDrainer {
  constructor(){
    this._pageTextItems = [];
    this._keys = ["a","address","b","blockquote","button","caption","data","datalist","dd","dl","dt","em","h1","h2","h3","h4","h5","h6","i","input","label","li","link","meta","option","p","ruby","span","strong","td","textarea","thead","title","tr","tt","u"];
    this.drain();
  }
  drain(){
    const correctTextContent = () => {
      const results = [];
      this._keys.map(k => {
        const textArray = [];
        const nodeList = document.querySelectorAll(k);
        if (!nodeList.length) return;
        nodeList.forEach((nl) => {
          if (!nl.textContent.trim().length) return;
          textArray.push(nl.textContent.trim().replace(/\r?\n\s+/g, ''));
        });
        if (!textArray.length) return;
        results.push({[k]: textArray});
      });
      return results;
    }
    this._pageTextItems = correctTextContent();
  }
  getPageTextItems() { 
    return this._pageTextItems;
  }
};