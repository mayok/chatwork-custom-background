import EventHandler from "./eventhandler";

export default class Property extends EventHandler {
    private default_value: string = "auto";

    constructor() {
        super();
        chrome.storage.local.get(
            {
                opacity: this.default_value
            },
            function(result) {
                (document.querySelector("#property") as HTMLInputElement).value = result["property"];
            }
        );
    }

    handler(evt: Event): void {
        this.sendMessage({
            name: "property",
            action: "PROPERTY",
            payload: (evt.target as HTMLSelectElement).value
        });
    }

    watch(): void {
        (document.querySelector("#property") as HTMLElement).addEventListener("change", this.handler, false);
    }
}
