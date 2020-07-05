chrome.runtime.onInstalled.addListener(function(OnInstalledReason) {
  // enable popup
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: "https://www.chatwork.com/" }
          }),
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { urlContains: "https://kcw.kddi.ne.jp/" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
