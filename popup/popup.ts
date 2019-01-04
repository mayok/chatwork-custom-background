import Opacity from "./opacity";
import Property from "./property";
import File from "./file";

// To activate content.js 
chrome.runtime.sendMessage("activate");

new Opacity().watch();
new Property().watch();
new File().watch();
