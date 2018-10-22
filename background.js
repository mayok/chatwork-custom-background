chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url.includes("https://www.chatwork.com/") || tab.url.includes("https://kcw.kddi.ne.jp/")) {
    chrome.pageAction.show(tabId);
  }
});

chrome.pageAction.onClicked.addListener(function() {
  document.getElementById("file").addEventListener("change", handleFileSelect, false);
  document.getElementById("opacity").addEventListener("change", handleChange("opacity"), false);
  document.getElementById("property").addEventListener("change", handleChange("property"), false);
});
