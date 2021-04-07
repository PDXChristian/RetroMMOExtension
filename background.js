chrome.runtime.onInstalled.addListener(() => {
    const t = (new Date(0)).toJSON();
    chrome.storage.local.set({prevDate: (new Date(0)).toJSON()});
    chrome.storage.local.set({onlineUsers: 0});
});
