const OPACITY = "opacity";
const PROPERTY = "background-size";
const FILE = "background-image";

function handleFileSelect(evt) {
  const file = evt.target.files[0];
  if (!file.type.match("image.*")) {
    return;
  }

  let reader = new FileReader();
  reader.addEventListener("load", function() {
    chrome.storage.local.set({ [FILE]: reader.result });
  });
  reader.readAsDataURL(file);
}

function handleChange(name) {
  return function(evt) {
    chrome.storage.local.set({ [name]: evt.target.value });
  };
}

function init() {
  chrome.storage.local.get({ [OPACITY]: 0.2 }, function(result) {
    document.getElementById(OPACITY).value = result[OPACITY];
  });
  chrome.storage.local.get({ [PROPERTY]: "auto" }, function(result) {
    document.getElementById(PROPERTY).value = result[PROPERTY];
  });

  document
    .getElementById(OPACITY)
    .addEventListener("input", handleChange(OPACITY), false);
  document
    .getElementById(PROPERTY)
    .addEventListener("change", handleChange(PROPERTY));
  document
    .getElementById(FILE)
    .addEventListener("change", handleFileSelect, false);
}

init();
