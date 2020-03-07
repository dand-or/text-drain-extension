export class NodeCreator{
  static SHADOW_ROOT_ID = "#app";
  static MAIN_TEMPLATE_ID = "#main_component_template"
  static BUTTON_TEMPLATE_ID = "#btn_component_template"
  static MAIN_TEMPLATE_STYLE = `
  .flex {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .divider{
    margin: 30px auto 25px;
    width: 50px;
    border: .5px dashed #000;
    opacity: .5;
  }
  button {
    border-radius: 10px;
    background: #ecf0f1;
    box-shadow:  15px 15px 40px #c9cccd, 
                -15px -15px 40px #ffffff;
    border: none;
    padding:20px;
    margin: 10px; 20px;
  }`;

  constructor(items){
    this._items = items;
    this._appElement = document.querySelector(NodeCreator.SHADOW_ROOT_ID);
    this._shadowRoot = this._appElement.attachShadow({mode:"open"});
    this._mainTemplate = document.querySelector(NodeCreator.MAIN_TEMPLATE_ID);
    this._btnTemplate = document.querySelector(NodeCreator.BUTTON_TEMPLATE_ID);
  }

  create() {
    if (!this._items.length) this._shadowRoot.textContent = "no items...";

    this._items.map(item => {
        const key = Object.keys(item)[0];
        const cloneMain = document.importNode(this._mainTemplate.content, true);
        const subtitle = cloneMain.querySelector("h2");
        subtitle.textContent = key;

        const buttons = cloneMain.querySelector("div.buttons");
        console.log(item);
        console.log(item[key]);
        item[key].map(txt => {
          const cloneButton = document.importNode(this._btnTemplate.content,true);
          const button = cloneButton.querySelector("button");
          button.textContent = txt;
          buttons.appendChild(button);
        });
        
        const style = document.createElement("style");
        style.textContent = NodeCreator.MAIN_TEMPLATE_STYLE;
        this._shadowRoot.appendChild(style);
        this._shadowRoot.appendChild(cloneMain);
    });
  }
};