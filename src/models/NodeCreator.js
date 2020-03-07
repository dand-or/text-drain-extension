export class NodeCreator {
  static SHADOW_ROOT_ID = "#app";
  static MAIN_TEMPLATE_ID = "#main_component_template";
  static BUTTON_TEMPLATE_ID = "#btn_component_template";
  static NAV_TEMPLATE_ID = "#nav_component_template";
  static COPIED_DIV_ID = "#copied";
  static MAIN_TEMPLATE_STYLE = `
  *:focus {
    outline: none;
  }
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
    max-width: 440px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  button:hover {
    border-radius: 10px;
    background: linear-gradient(145deg, #fdffff, #d4d8d9);
    box-shadow:  15px 15px 40px #c9cccd, 
                -15px -15px 40px #ffffff;
  }
  button:active {
    border-radius: 10px;
    background: linear-gradient(145deg, #d4d8d9, #fdffff);
    box-shadow:  15px 15px 40px #c9cccd, 
                -15px -15px 40px #ffffff;
  }`;

  constructor(items) {
    this._items = items;
    this._appElement = document.querySelector(NodeCreator.SHADOW_ROOT_ID);
    this._shadowRoot = this._appElement.attachShadow({ mode: "open" });
    this._mainTemplate = document.querySelector(NodeCreator.MAIN_TEMPLATE_ID);
    this._btnTemplate = document.querySelector(NodeCreator.BUTTON_TEMPLATE_ID);
    this._navTemplate = document.querySelector(NodeCreator.NAV_TEMPLATE_ID);
    this._copiedElement = document.querySelector(NodeCreator.COPIED_DIV_ID);
  }

  create() {
    if (!this._items.length) this._shadowRoot.textContent = "no items...";

    this._items.map(item => {
      const key = Object.keys(item)[0];

      const cloneNavItem = document.importNode(this._navTemplate.content, true);
      const anchor = cloneNavItem.querySelector("li a");
      anchor.setAttribute("href", "#" + key);
      anchor.textContent = key;
      anchor.addEventListener("click", () => {
        this._shadowRoot
          .querySelector("#" + key)
          .scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
      });
      document.querySelector("nav ul").appendChild(cloneNavItem);

      const cloneMain = document.importNode(this._mainTemplate.content, true);
      const subtitle = cloneMain.querySelector("h2");
      subtitle.textContent = key;
      subtitle.setAttribute("id", key);

      const buttons = cloneMain.querySelector("div.buttons");
      item[key].map(txt => {
        const cloneButton = document.importNode(
          this._btnTemplate.content,
          true
        );
        const button = cloneButton.querySelector("button");
        button.textContent = txt;

        const copyAction = () => {
          navigator.clipboard.writeText(txt).then(
            () => {
              // this._copiedElement.classList.remove("show-copied");
              this._copiedElement.animate(
                [
                  {
                    opacity: 0,
                    width: "100%",
                    zIndex: -1
                  },
                  {
                    opacity: 1,
                    width: "110%",
                    zIndex: 1000
                  },
                  {
                    opacity: 0,
                    width: "300%",
                    zIndex: -1
                  }
                ],
                600,
                "ease-in"
              );
            },
            () => {
              alert("copy failed. please retry.");
            }
          );
        };
        button.addEventListener("click", copyAction);

        buttons.appendChild(button);
      });

      const style = document.createElement("style");
      style.textContent = NodeCreator.MAIN_TEMPLATE_STYLE;
      this._shadowRoot.appendChild(style);
      this._shadowRoot.appendChild(cloneMain);
    });
  }
}
