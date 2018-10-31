const NAME_PREFIX = "z__cw_ext_";
const FILE = NAME_PREFIX + "file";
const OPACITY = NAME_PREFIX + "opacity";
const PROPERTY = NAME_PREFIX + "property";

function sync(name, value) {
  chrome.storage.local.set({ [name]: value });
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { payload: { name, value } });
  });
}

function handleFileSelect(evt) {
  let file = evt.target.files[0];

  if (!file.type.match("image.*")) {
    return;
  }

  let reader = new FileReader();
  reader.addEventListener("load", function() {
    // TODO: show preview
    // let span = document.createElement("span");
    // span.innerHTML = `<img class="thumb" src="${reader.result}" />`;
    // document.getElementById("preview").insertBefore(span, null);

    sync(FILE, reader.result);
  });
  reader.readAsDataURL(file);
}

function handleChange(name) {
  return function(evt) {
    sync(name, evt.target.value);
  };
}

function init() {
  chrome.runtime.sendMessage("activate");

  chrome.storage.local.get(
    {
      // [FILE]: "",
      [OPACITY]: "20",
      [PROPERTY]: "auto"
    },
    function(result) {
      // TODO: preview
      document.getElementById("opacity").value = result[OPACITY];
      document.getElementById("property").value = result[PROPERTY];
    }
  );

  document.getElementById("file").addEventListener("change", handleFileSelect, false);
  document.getElementById("opacity").addEventListener("input", handleChange(OPACITY), false);
  document.getElementById("property").addEventListener("change", handleChange(PROPERTY), false);
}

init();
