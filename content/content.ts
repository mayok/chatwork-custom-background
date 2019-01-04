import Opacity from "./opacity";
import Property from "./property";
import File from "./file";

const init = () => {
    const rule = `.roomContent:after {
           content: "";
           width: 100%;
           height: 100%;
           position: absolute;
           bottom: 0;
           left: 0;
           background: var(--background);
           background-size: var(--property);
           background-repeat: no-repeat;
           opacity: var(--opacity);
           z-index: -1;
        }`;
    const html = `<div id="cw_ext_background"><style>${rule}</style></div>`;
    const el = document.createElement("template");
    el.insertAdjacentHTML("beforeend", html);
    (document.querySelector("body") as Node).appendChild(el.firstElementChild!);
};

const reducer = () => {
    const opacity = new Opacity();
    const property = new Property();
    const file = new File();

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        switch (request.action) {
            case "OPACITY":
                opacity.update(request);
                break;
            case "PROPERTY":
                property.update(request);
                break;
            case "FILE":
                file.update(request);
                break;
            default:
                return;
        }
    });
};

const wait = () => {
    setTimeout(function() {
        if (document.getElementById("_chatText")) {
            init();
            reducer();
            return;
        }
        wait();
    }, 123);
};
wait();
