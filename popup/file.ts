import EventHandler from "./eventhandler";

export default class File extends EventHandler {
    constructor() {
        super();
        this.handler = this.handler.bind(this);
    }

    handler(evt: Event) {
        const target = evt.target as HTMLInputElement;
        if (target === null) {
            return;
        }

        const file = target.files![0];
        if (!file.type.match("image.*")) {
            return;
        }

        let reader = new FileReader();
        reader.addEventListener("load", () => {
            this.sendMessage({
                name: "file",
                action: "FILE",
                payload: reader.result as string
            });
        });
        reader.readAsDataURL(file);
    }

    watch() {
        (document.querySelector("#file") as HTMLInputElement).addEventListener("change", this.handler, false);
    }
}
