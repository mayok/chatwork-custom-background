import { Message } from "../common/interfaces";

export default abstract class EventHandler {
  abstract handler(evt: Event): void;
  abstract watch(): void;

  sendMessage({ name, action, payload }: Message): void {
    chrome.storage.local.set({ [name]: payload });
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs: chrome.tabs.Tab[]) {
      chrome.tabs.sendMessage((tabs[0].id as number), { action, payload });
    });
  }
}