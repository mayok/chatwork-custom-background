import { Message } from "../common/interfaces";

export default class Opacity {
    private default_value: string = "20";

    constructor() {
        chrome.storage.local.get(
            {
                opacity: this.default_value
            },
            result => {
                this.update({
                    name: "opacity",
                    action: "OPACITY",
                    payload: result["opacity"]
                });
            }
        );
    }

    update(msg: Message): void {
        const rule = `:root { --opacity: ${parseInt(msg.payload) / 100}; }`;

        const html = `<div id="${msg.name}"><style>${rule}</style></div>`;
        const el = document.createElement("template");
        el.insertAdjacentHTML("beforeend", html);

        const body = <Node>document.querySelector("body");
        const element = <Node>document.getElementById(msg.name);
        if (element) {
            body.removeChild(element);
        }
        body.appendChild(el.firstElementChild!);
    }
}
