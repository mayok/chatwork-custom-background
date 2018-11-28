import EventHandler from "./eventhandler";

export default class Opacity extends EventHandler {
    private default_value: string = "20";

    constructor() {
        super();
        chrome.storage.local.get(
            {
                opacity: this.default_value
            },
            function(result) {
                (document.querySelector("#opacity") as HTMLInputElement).value = result["opacity"];
            }
        );
    }

    handler(evt: Event) {
        this.sendMessage({
            name: "opacity",
            action: "OPACITY",
            payload: (evt.target as HTMLInputElement).value
        });
    }

    watch(): void {
        (document.querySelector("#opacity") as HTMLElement).addEventListener("change", this.handler, false);
    }
}
