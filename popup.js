const NAME_PREFIX = "z__cw_ext_";
const FILE = NAME_PREFIX + "file";
const OPACITY = NAME_PREFIX + "opacity";
const PROPERTY = NAME_PREFIX + "property";

function sync(name, value) {
  const key = NAME_PREFIX + name;
  chrome.storage.local.set({ [key]: value });
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

const handleChange = name => {
  return function(evt) {
    sync(name, evt.target.value);
  };
};

document.getElementById("file").addEventListener("change", handleFileSelect, false);
document.getElementById("opacity").addEventListener("change", handleChange(OPACITY), false);
document.getElementById("property").addEventListener("change", handleChange(PROPERTY), false);

// TODO: insert default value into popup.html
