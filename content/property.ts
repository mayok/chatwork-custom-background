import { Message } from "../common/interfaces";

export default class Property {
    private default_value: string = "auto";

    constructor() {
        chrome.storage.local.get(
            {
                property: this.default_value
            },
            result => {
                this.update({
                    name: "property",
                    action: "PROPERTY",
                    payload: result["property"]
                });
            }
        );
    }

    update(msg: Message): void {
        const rule = `:root { --property: ${msg.payload}; }`;

        const html = `<div id="${msg.name}"><style>${rule}</style></div>`;
        const el = document.createElement("template");
        el.insertAdjacentHTML("beforeend", html);

        const body = <Node>document.querySelector("body");
        const element = <Node>document.querySelector(msg.name);
        if (element) {
            body.removeChild(element);
        }
        body.appendChild(el.firstElementChild!);
    }
}
