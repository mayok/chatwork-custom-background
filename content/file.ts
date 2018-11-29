import { Message } from "../common/interfaces";

export default class File {
    private default_value: string = "";

    constructor() {
        chrome.storage.local.get(
            {
                file: this.default_value
            },
            result => {
                this.update({
                    name: "file",
                    action: "FILE",
                    payload: result["file"]
                });
            }
        );
    }

    update(msg: Message): void {
        const rule = `:root { --background: url("${msg.payload}"); }`;

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
