// const NAME_PREFIX = "z__cw_ext_";
// const FILE = NAME_PREFIX + "file";
// const OPACITY = NAME_PREFIX + "opacity";
// const PROPERTY = NAME_PREFIX + "property";

// function injectStyle(name, rule) {
//   const html = `<div id="${name}"><style>${rule}</style></div>`;
//   const el = document.createElement("template");
//   el.insertAdjacentHTML("beforeend", html);

//   document.querySelector("body").appendChild(el.firstElementChild);
// }

// function updateStyle(name, value) {
//   let html = document.createElement("style");
//   if (name === FILE) {
//     html.innerHTML = `:root { --background: url("${value}"); }`;
//   } else if (name === OPACITY) {
//     html.innerHTML = `:root { --opacity: ${value / 100}; }`;
//   } else if (name === PROPERTY) {
//     html.innerHTML = `:root { --property: ${value}; }`;
//   } else {
//     return;
//   }

//   const parent = document.getElementById(name);
//   parent.appendChild(html);
//   parent.removeChild(parent.firstChild);
// }

// function initialize() {
//   chrome.storage.local.get(
//     {
//       [FILE]: "",
//       [OPACITY]: "20",
//       [PROPERTY]: "auto"
//     },
//     function(result) {
//       injectStyle(FILE, `:root { --background: url("${result[FILE]}"); }`);
//       injectStyle(OPACITY, `:root { --opacity: ${result[OPACITY] / 100}; }`);
//       injectStyle(PROPERTY, `:root { --property: ${result[PROPERTY]}; }`);
//       injectStyle(
//         "z__cw_ext_background",
//         `.roomContent:after {
//            content: "";
//            width: 100%;
//            height: 100%;
//            position: absolute;
//            bottom: 0;
//            left: 0;
//            background: var(--background);
//            background-size: var(--property);
//            background-repeat: no-repeat;
//            opacity: var(--opacity);
//            z-index: -1;
//         }`
//       );
//     }
//   );
// }

// function inject() {
//   initialize();

//   chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.payload) {
//       updateStyle(request.payload.name, request.payload.value);
//     }
//   });
// }

// function wait() {
//   setTimeout(function() {
//     if (document.getElementById("_chatText")) {
//       inject();
//       return;
//     }
//     wait();
//   }, 123);
// }

// wait();
