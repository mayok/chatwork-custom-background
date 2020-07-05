const FILE = "background-image";
const OPACITY = "opacity";
const PROPERTY = "background-size";

function formatRule(id, value) {
  if (id === FILE) {
    value = `url("${value}")`;
  }
  return `:root { --${id}: ${value}}`;
}

function updateStyle(id, value) {
  const style = document.createElement("style");
  style.innerHTML = formatRule(id, value);

  const parent = document.getElementById(id);
  if (!parent) {
    const div = document.createElement("div");
    div.setAttribute("id", id);
    div.appendChild(style);
    const el = document.createElement("template");
    el.insertAdjacentElement("beforeend", div);

    document.querySelector("body").appendChild(el.firstElementChild);
    return;
  }

  if (parent.hasChildNodes()) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
  parent.appendChild(style);
}

function init() {
  chrome.storage.local.get(
    {
      [FILE]: "",
      [OPACITY]: 0.2,
      [PROPERTY]: "auto"
    },
    function(result) {
      for (const [key, value] of Object.entries(result)) {
        updateStyle(key, value);
      }
    }
  );

  chrome.storage.local.onChanged.addListener(function(changes, namespace) {
    for (const key in changes) {
      updateStyle(key, changes[key].newValue);
    }
  });
}

function wait() {
  setTimeout(function() {
    if (document.getElementById("_chatText")) {
      init();
      return;
    }
    wait();
  }, 500);
}

wait();
